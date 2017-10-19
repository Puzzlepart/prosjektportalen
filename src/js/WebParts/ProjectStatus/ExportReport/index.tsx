import * as React from "react";
import RESOURCE_MANAGER from "../../../@localization";
import * as pnp from "sp-pnp-js";
import * as moment from "moment";
import * as html2canvas from "html2canvas";
import { Icon } from "../../@Components";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import IExportReportProps from "./IExportReportProps";
import IExportReportState from "./IExportReportState";
import ExportReportStatus from "./ExportReportStatus";
import PDFExport from "./PDFExport";
import IFileTypeButton from "./IFileTypeButton";

export default class ExportReport extends React.Component<IExportReportProps, IExportReportState> {
    /**
     * Constructor
     *
     * @param {IExportReportProps} props Props
     */
    constructor(props: IExportReportProps) {
        super(props);
        this.state = {
            exportStatus: ExportReportStatus.default,
            isLoading: true,
        };
        this._onExportClick = this._onExportClick.bind(this);
    }

    /**
     * Component did mount
     */
    public async componentDidMount(): Promise<void> {
        const reports = await this.fetchReports();
        this.setState({
            isLoading: false,
            reports,
        });
    }

    /**
     * Calls private method _render with props and state
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {IExportReportProps} param0 Props
     * @param {IExportReportState} param1 State
     */
    private _render({ exportType }: IExportReportProps, { reports, showDialog, selectedReport, exportStatus, isLoading }: IExportReportState): JSX.Element {
        if (isLoading) {
            return <Spinner size={SpinnerSize.medium} />;
        }
        return (
            <div className="export-section ms-Grid">
                <div className="ms-Grid-row">
                    <div className=" ms-Grid-col ms-md5">
                        {this.renderExportBtn(exportStatus, exportType)}
                    </div>
                    <div className="ms-Grid-col ms-md7">
                        <Icon name="History" />
                        <Dropdown
                            id="pp-reportDropdown"
                            label=""
                            selectedKey="01"
                            options={this.getReportOptions()}
                            onChanged={(item) => {
                                this.setState({
                                    selectedReport: {
                                        key: item.key.toString(),
                                        text: item.text,
                                    },
                                    showDialog: true,
                                });
                            }} />
                        {this.state.selectedReport && (
                            <Dialog
                                isOpen={showDialog}
                                type={DialogType.close}
                                onDismiss={e => this.setState({ showDialog: false })}
                                isBlocking={false}
                                title={selectedReport.text}
                                containerClassName="pp-snapshot-dialog">
                                <div id="snapshot-container">
                                    {exportType === "pdf"
                                        ? <embed width="850" height="750" src={selectedReport.key} type="application/pdf"></embed>
                                        : <img src={selectedReport.key}></img>
                                    }
                                </div>
                            </Dialog>
                        )
                        }
                    </div>
                </div>
            </div>
        );
    }
    /**
     * Render export button
     *
     * @param {ExportReportStatus} exportStatus Export status
     * @param {string} exportType
     */
    private renderExportBtn(exportStatus, exportType) {
        let button: IFileTypeButton = this.getButtonLabel(exportType);
        if (exportStatus === ExportReportStatus.isExporting) {
            return (
                <Spinner size={SpinnerSize.medium} />
            );
        }
        return (
            <PrimaryButton
                className="save-snapshot-btn"
                iconProps={{ iconName: button.icon }}
                onClick={this._onExportClick}>
                {exportStatus === ExportReportStatus.hasExported ? button.isSaved : button.save}
            </PrimaryButton>
        );
    }

    private getButtonLabel(exportType: string): IFileTypeButton {
        switch (exportType) {
            case "pdf": {
                return {
                    save: RESOURCE_MANAGER.getResource("ProjectStatus_SaveAsPdf"),
                    saving: RESOURCE_MANAGER.getResource("ProjectStatus_SavingAsPdf"),
                    isSaved: RESOURCE_MANAGER.getResource("ProjectStatus_PDFSaved"),
                    icon: "Save",
                };
            }
            case "png": {
                return {
                    save: RESOURCE_MANAGER.getResource("ProjectStatus_SaveSnapshot"),
                    saving: RESOURCE_MANAGER.getResource("ProjectStatus_SavingSnapshot"),
                    isSaved: RESOURCE_MANAGER.getResource("ProjectStatus_SnapshotIsSaved"),
                    icon: "Camera",
                };
            }
        }
    }

    /**
     * Save file to library
     *
     * @param {string} libraryRelativeUrl Library relative URL
     * @param {string} fileName Filename
     * @param {string} title Title
     * @param {Blob} fileBlob File blob
     */
    private async saveFileToLibrary(libraryRelativeUrl: string, fileName: string, title: string, fileBlob: Blob): Promise<any> {
        const fileAddResult = await pnp.sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl).files.add(fileName, fileBlob, true);
        const fileAllFields = await fileAddResult.file.listItemAllFields.get();
        await pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title")).items.getById(fileAllFields.Id).update({
            "Title": title,
        });
    }

    private async fetchReports(): Promise<any[]> {
        try {
            const reports = await pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title"))
                .items
                .select("FileLeafRef", "Title", "EncodedAbsUrl")
                .filter(`substringof('.${this.props.exportType}', FileLeafRef)`)
                .orderBy("Modified", false)
                .top(10)
                .get();
            return reports;
        } catch (err) {
            throw err;
        }
    }


    private getReportOptions(): Array<IDropdownOption> {
        let options = this.state.reports
            .filter(r => r.FileLeafRef)
            .map(({ Title: text, EncodedAbsUrl: key }) => ({
                key,
                text,
            }));
        let firstOption = this.state.reports.length > 0
            ? {
                key: "01",
                text: String.format(RESOURCE_MANAGER.getResource("ProjectStatus_SnapshotHistory"), this.state.reports.length),
            }
            : {
                key: "01",
                text: RESOURCE_MANAGER.getResource("ProjectStatus_SnapshotNoHistory"),
            };
        return [
            firstOption,
            ...options,
        ];
    }

    private async _onExportClick(e): Promise<void> {
        e.preventDefault();
        this.setState({ exportStatus: ExportReportStatus.isExporting });
        switch (this.props.exportType) {
            case "pdf":
                const pdfExport = new PDFExport(this.props.sections);
                const pdfBlob = await pdfExport.generateBlob();
                this.saveReport(pdfBlob, "pdf");
                break;
            case "png":
                this.saveAsPng();
                break;
        }
    }

    private async saveReport(reportBlob: Blob, fileExtension: string): Promise<void> {
        const dateDisplay = moment(new Date()).format("YYYY-MM-D-HHmm");
        const fileName = `${dateDisplay}-${_spPageContextInfo.webTitle}.${fileExtension}`;
        const fileTitle = `${dateDisplay} ${_spPageContextInfo.webTitle}`;
        await this.saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/${RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title")}`, fileName, fileTitle, reportBlob);
        this.setState({
            exportStatus: ExportReportStatus.hasExported,
            isLoading: true,
        });
        const reports = await this.fetchReports();
        this.setState({
            isLoading: false,
            reports,
        });
    }

    private saveAsPng() {
        const projectStatusElement = document.getElementById("pp-projectstatus");
        html2canvas(projectStatusElement, {
            onrendered: canvas => {
                if (canvas.toBlob) {
                    canvas.toBlob(reportBlob => {
                        this.saveReport(reportBlob, "png");
                    });
                } else if (canvas.msToBlob) {
                    let reportBlob = canvas.msToBlob();
                    this.saveReport(reportBlob, "png");
                }
            },
        });
    }
}
