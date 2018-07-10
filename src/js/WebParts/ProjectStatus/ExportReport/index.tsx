import * as React from "react";
import RESOURCE_MANAGER from "../../../Resources";
import pnp, { List, Logger, LogLevel } from "sp-pnp-js";
import * as moment from "moment";
import * as html2canvas from "html2canvas";
import * as sanitize from "sanitize-filename";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import SnapshotDialog from "./SnapshotDialog";
import IExportReportProps from "./IExportReportProps";
import IExportReportState from "./IExportReportState";
import ExportReportStatus from "./ExportReportStatus";
import IReport from "./IReport";
import PDFExport from "./PDFExport";
import IExportTypeContext from "./IExportTypeContext";

export default class ExportReport extends React.Component<IExportReportProps, IExportReportState> {
    public static defaultProps: Partial<IExportReportProps> = {
        reportsLibTitle: RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title"),
        maxReportHistory: 25,
    };
    private _reportsLib: List;

    /**
     * Constructor
     *
     * @param {IExportReportProps} props Props
     */
    constructor(props: IExportReportProps) {
        super(props);
        this.state = {
            exportStatus: ExportReportStatus.IDLE,
            isLoading: true,
        };
        this._reportsLib = pnp.sp.web.lists.getByTitle(props.reportsLibTitle);
        this._onExportClick = this._onExportClick.bind(this);
        this._onSelectedReportChanged = this._onSelectedReportChanged.bind(this);
        this._onSnapshotDialogDismiss = this._onSnapshotDialogDismiss.bind(this);
        this._onRenderReportOption = this._onRenderReportOption.bind(this);
    }

    /**
     * Component did mount
     */
    public async componentDidMount(): Promise<void> {
        const reports = await this.fetchReportHistory();
        this.setState({ isLoading: false, reports });
    }

    public render(): React.ReactElement<IExportReportProps> {
        const { exportType } = this.props;
        const { selectedReport, exportStatus, isLoading } = this.state;
        if (isLoading) {
            return <Spinner size={SpinnerSize.medium} />;
        }
        return (
            <div className="export-section ms-Grid">
                <div className="ms-Grid-row">
                    <div className=" ms-Grid-col ms-md5">
                        {this.renderExportAction(exportStatus, exportType)}
                    </div>
                    <div className="ms-Grid-col ms-md7">
                        <Icon iconName="History" />
                        <Dropdown
                            id="pp-reportDropdown"
                            label=""
                            selectedKey="ReportOption_0"
                            options={this.getReportOptions()}
                            onChanged={this._onSelectedReportChanged}
                            onRenderOption={this._onRenderReportOption} />
                        {selectedReport && (
                            <SnapshotDialog
                                report={selectedReport.data}
                                onDismiss={this._onSnapshotDialogDismiss} />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Render export action
     *
     * @param {ExportReportStatus} exportStatus Export status
     * @param {string} exportType
     */
    private renderExportAction(exportStatus: ExportReportStatus, exportType: string): React.ReactElement<any> {
        const exportTypeContext: IExportTypeContext = this.getExportTypeContext(exportType);
        switch (exportStatus) {
            case ExportReportStatus.IS_EXPORTING: {
                return (
                    <div style={{ paddingTop: 5 }}>
                        <Spinner size={SpinnerSize.small} />
                    </div>
                );
            }
            case ExportReportStatus.HAS_EXPORTED: {
                return (
                    <div style={{ paddingTop: 5 }}>
                        <Icon style={{ marginRight: 8 }} iconName={exportTypeContext.IS_SAVED_ICON_NAME} />
                        <span>{exportTypeContext.IS_SAVED}</span>
                    </div>
                );
            }
            case ExportReportStatus.IDLE: {
                return (
                    <PrimaryButton
                        id="pp-saveSnapshotBtn"
                        text={exportTypeContext.SAVE}
                        className="save-snapshot-btn"
                        iconProps={{ iconName: exportTypeContext.SAVE_ICON_NAME }}
                        onClick={(e) => { this._onExportClick(e); }} />
                );
            }
        }
    }

    /**
     * On render report option
     *
     * @param {IDropdownOption} opt Option
     */
    private _onRenderReportOption(opt: IDropdownOption): JSX.Element {
        if (opt.data) {
            const exportType = (opt.data as IReport).FileLeafRef.split(".").pop().toLowerCase();
            const exportTypeContext: IExportTypeContext = this.getExportTypeContext(exportType);
            return (
                <div>
                    <Icon style={{ marginRight: 8 }} iconName={exportTypeContext.SAVE_ICON_NAME} />
                    <span>{opt.text}</span>
                </div>
            );
        } else {
            return (
                <div>
                    <span>{opt.text}</span>
                </div>
            );
        }
    }

    /**
     * Get export action resources
     *
     * @param {string} exportType Export type (PDF/PNG)
     */
    private getExportTypeContext(exportType: string): IExportTypeContext {
        switch (exportType) {
            case "pdf": {
                return {
                    SAVE: RESOURCE_MANAGER.getResource("ProjectStatus_SaveAsPdf"),
                    IS_SAVING: RESOURCE_MANAGER.getResource("ProjectStatus_SavingAsPdf"),
                    IS_SAVED: RESOURCE_MANAGER.getResource("ProjectStatus_PDFSaved"),
                    SAVE_ICON_NAME: "PDF",
                    IS_SAVED_ICON_NAME: "Save",
                };
            }
            case "png": {
                return {
                    SAVE: RESOURCE_MANAGER.getResource("ProjectStatus_SaveSnapshot"),
                    IS_SAVING: RESOURCE_MANAGER.getResource("ProjectStatus_SavingSnapshot"),
                    IS_SAVED: RESOURCE_MANAGER.getResource("ProjectStatus_SnapshotIsSaved"),
                    SAVE_ICON_NAME: "Camera",
                    IS_SAVED_ICON_NAME: "Save",
                };
            }
        }
    }

    /**
     *  Get report options
     */
    private getReportOptions(): Array<IDropdownOption> {
        const { reports } = this.state;
        const hasHistory = reports.length > 0;
        const validReports = reports.filter(r => r.FileLeafRef);
        const options: IDropdownOption[] = validReports.map((r, index) => ({
            key: `ReportOption_${index + 1}`,
            text: r.Title,
            data: r,
        }));
        let firstOption: IDropdownOption = {
            key: "ReportOption_0",
            text: RESOURCE_MANAGER.getResource("ProjectStatus_SnapshotNoHistory"),
        };
        if (hasHistory) {
            firstOption.text = String.format(RESOURCE_MANAGER.getResource("ProjectStatus_SnapshotHistory"), reports.length);
        }
        return [firstOption, ...options];
    }

    /**
     * On export click
     */
    private async _onExportClick(e): Promise<void> {
        e.preventDefault();
        this.startExport();
    }

    /**
     * On selected report changed
     *
     * @param {IDropdownOption} opt Option
     */
    private _onSelectedReportChanged(opt: IDropdownOption): void {
        this.setState({ selectedReport: opt });
    }

    /**
     * On <SnapshotDialog /> dismiss
     */
    private _onSnapshotDialogDismiss(): void {
        this.setState({ selectedReport: null });
    }


    private async startExport() {
        Logger.log({ message: "(startExport) Starting export", data: { exportType: this.props.exportType }, level: LogLevel.Info });
        this.setState({ exportStatus: ExportReportStatus.IS_EXPORTING });
        let blob: Blob;
        switch (this.props.exportType) {
            case "pdf": blob = await this.saveAsPdf();
                break;
            case "png": blob = await this.saveAsPng();
                break;
        }
        const report = await this.saveReportToLibrary(blob, this.props.exportType);
        Logger.log({ message: "(startExport) Export done", data: { exportType: this.props.exportType }, level: LogLevel.Info });
        this.setState({
            reports: [report, ...this.state.reports],
            exportStatus: ExportReportStatus.HAS_EXPORTED,
        });
    }

    /**
     * Save report as PNG
     */
    private async saveAsPng() {
        return new Promise<Blob>(async (resolve, reject) => {
            const canvas = await html2canvas(document.getElementById("pp-projectstatus"));
            if (canvas.toBlob) {
                canvas.toBlob(resolve);
            } else if (canvas.msToBlob) {
                const blob = canvas.msToBlob();
                resolve(blob);
            }
        });
    }

    /**
     * Save report as PDF
     */
    private async saveAsPdf(): Promise<Blob> {
        const { sections } = this.props;
        const pdfExport = new PDFExport(sections);
        const blob = await pdfExport.generateBlob();
        return blob;
    }

    /**
     * Save report
     *
     * @param {Blob} reportBlob Report blob
     * @param {string} fileExtension File extension
     */
    private async saveReportToLibrary(reportBlob: Blob, fileExtension: string): Promise<IReport> {
        const dtFormatted = moment(new Date()).format("YYYY-MM-D-HHmm");
        const fileName = `${dtFormatted}-${sanitize(_spPageContextInfo.webTitle)}.${fileExtension}`;
        const fileTitle = `${dtFormatted} ${_spPageContextInfo.webTitle}`;
        const libServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${this.props.reportsLibTitle}`;
        Logger.log({ message: `(saveReportToLibrary) Saving report as ${fileExtension}`, data: { fileName, fileTitle, libServerRelativeUrl }, level: LogLevel.Info });
        const report = await this.saveFileToLibrary(libServerRelativeUrl, fileName, fileTitle, reportBlob);
        Logger.log({ message: "(saveReportToLibrary) Successfully saved report", data: {}, level: LogLevel.Info });
        return report;
    }

    /**
     * Save file to library
     *
     * @param {string} libServerRelativeUrl Library server relative URL
     * @param {string} fileName Filename
     * @param {string} title Title
     * @param {Blob} blob Blob
     * @param {boolean} shouldOverWrite Should overwrite
     */
    private async saveFileToLibrary(libServerRelativeUrl: string, fileName: string, title: string, blob: Blob, shouldOverWrite = true): Promise<IReport> {
        const libRootFolder = pnp.sp.web.getFolderByServerRelativeUrl(libServerRelativeUrl);
        const fileAddResult = await libRootFolder.files.add(fileName, blob, shouldOverWrite);
        const { ID, FileLeafRef, EncodedAbsUrl } = await fileAddResult
            .file
            .listItemAllFields
            .select("ID", "FileLeafRef", "EncodedAbsUrl")
            .get();
        await this._reportsLib.items.getById(ID).update({ "Title": title });
        return {
            Title: title,
            FileLeafRef,
            EncodedAbsUrl,
        };
    }

    /**
     * Fetch reports
     */
    private async fetchReportHistory(): Promise<IReport[]> {
        try {
            const reports: IReport[] = await this._reportsLib
                .items
                .select("FileLeafRef", "Title", "EncodedAbsUrl")
                .filter("substringof('.png',FileLeafRef) or substringof('.pdf',FileLeafRef)")
                .orderBy("Modified", false)
                .top(this.props.maxReportHistory)
                .get();
            return reports;
        } catch (err) {
            throw err;
        }
    }
}
