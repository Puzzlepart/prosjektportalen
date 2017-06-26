import * as React from "react";
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

export default class ExportReport extends React.Component<IExportReportProps, IExportReportState> {
    constructor() {
        super();
        this.state = {
            project: null,
            reports: null,
            selectedReport: {
                key: "",
                text: "",
            },
            exportStatus: ExportReportStatus.default,
            showDialog: false,
            isLoading: true,
        };
    }

    public componentDidMount(): void {
        this.fetchReports();
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const {
            reports,
            showDialog,
            selectedReport,
            exportStatus,
            isLoading,
         } = this.state;

        if (isLoading) {
            return <Spinner size={SpinnerSize.medium} />;
        }

        return (
            <div className="export-section ms-Grid">
                <div className="ms-Grid-row">
                    <div className=" ms-Grid-col ms-md5">
                        {this.renderExportBtn(exportStatus)}
                    </div>
                    <div className="ms-Grid-col ms-md7">
                        <Icon name="History" />
                        <Dropdown
                            id="pp-reportDropdown"
                            label=""
                            selectedKey="01"
                            options={this.getReportOptions(reports)}
                            onChanged={(item) => {
                                this.setState({
                                    selectedReport: {
                                        key: item.key.toString(),
                                        text: item.text,
                                    },
                                    showDialog: true,
                                });
                            }} />
                        <Dialog
                            isOpen={showDialog}
                            type={DialogType.close}
                            onDismiss={this.closeDialog}
                            isBlocking={false}
                            title={selectedReport.text}
                            containerClassName="pp-snapshot-dialog">
                            <div id="snapshot-container">
                                <img src={selectedReport.key}></img>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Render export button
     */
    private renderExportBtn = exportStatus => {
        if (exportStatus === ExportReportStatus.isExporting) {
            return <Spinner size={SpinnerSize.medium} />;
        }
        return (
            <PrimaryButton
                className="save-snapshot-btn"
                iconProps={{ iconName: "Camera" }}
                onClick={e => {
                    e.preventDefault();
                    this.doExport(this.state.project);
                }}>
                {exportStatus === ExportReportStatus.hasExported ? "Prosjektbildet er lagret" : " Lagre øyeblikksbilde"}
            </PrimaryButton>
        );
    }

    /**
     * Save file to library
     */
    private saveFileToLibrary = (libraryRelativeUrl: string, fileName: string, title: string, fileBlob: Blob): Promise<any> => {
        return pnp.sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl).files.add(fileName, fileBlob, true).then((fileAddResult) => {
            return fileAddResult.file.listItemAllFields.get().then((fileAllFields) => {
                return pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title")).items.getById(fileAllFields.Id).update({
                    "Title": title,
                });
            });
        });
    }


    /**
     * Fetch reports
     */
    private fetchReports(): void {
        pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title"))
            .items
            .select("FileLeafRef", "Title", "EncodedAbsUrl")
            .filter("substringof('.png', FileLeafRef)")
            .orderBy("Modified", false)
            .top(10)
            .get()
            .then(reports => {
                this.setState({
                    reports: reports,
                    isLoading: false,
                });
            });
    }

    /**
     * Get report options
     */
    private getReportOptions = (reports): Array<IDropdownOption> => {
        let options = reports.filter(r => r.FileLeafRef).map(({ Title: text, EncodedAbsUrl: key }) => ({
            key,
            text,
        }));
        let firstOption = reports.length > 0
            ? {
                key: "01",
                text: `Historikk (${reports.length} tidligere)`,
            }
            : {
                key: "01",
                text: "Ingen historikk tilgjengelig",
            };
        return [
            firstOption,
            ...options,
        ];
    }

    /**
     * Sae report
     */
    private saveReport = reportBlob => {
        let dateDisplay = moment(new Date()).format("YYYY-MM-D-HHmm");
        let fileName = `${_spPageContextInfo.webTitle}-${dateDisplay}.png`;
        let fileTitle = `${_spPageContextInfo.webTitle} ${dateDisplay}`;
        this.saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/${__("Lists_ProjectStatus_Title")}`, fileName, fileTitle, reportBlob).then((data) => {
            this.setState({ exportStatus: ExportReportStatus.hasExported });
            this.fetchReports();
        });
    }

    /**
     * Do export
     */
    private doExport = project => {
        this.setState({ exportStatus: ExportReportStatus.isExporting });
        html2canvas(document.getElementById("pp-projectstatus"), {
            onrendered: canvas => {
                if (canvas.toBlob) {
                    canvas.toBlob(reportBlob => {
                        this.saveReport(reportBlob);
                    });
                } else if (canvas.msToBlob) {
                    let reportBlob = canvas.msToBlob();
                    this.saveReport(reportBlob);
                }
            },
        });
    }

    /**
     * Close dialog
     */
    private closeDialog = () => {
        this.setState({ showDialog: false });
    }
}
