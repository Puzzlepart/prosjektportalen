import * as React from "react";
import * as pnp from "sp-pnp-js";
import * as moment from "moment";
import * as html2canvas from "html2canvas";
import { Icon } from "../../@Components";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

export interface IExportReportState {
    project: any;
    reports: any;
    selectedReport: {
        key: string,
        text: string,
    };
    exportStatus: IExportReportStatus;
    showDialog: boolean;
}

export interface IExportReportProps {
    project: any;
}

export enum IExportReportStatus {
    default,
    isExporting,
    hasExported,
}

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
            exportStatus: IExportReportStatus.default,
            showDialog: false,
        };
    }

    public componentDidMount(): void {
        this.fetchReports();
    }

    public renderExportBtn = (exportStatus) => {
        if (exportStatus === IExportReportStatus.isExporting) {
            return <Spinner size={SpinnerSize.medium} />;
        } else if (exportStatus === IExportReportStatus.hasExported) {
            return <PrimaryButton
                className="save-snapshot-btn"
                iconProps={{ iconName: "Camera" }}
                onClick={e => {
                    e.preventDefault();
                    this.DoExport(this.state.project);
                }}>
                Prosjektbildet er lagret
                </PrimaryButton>;
        } else {
            return <PrimaryButton
                className="save-snapshot-btn"
                iconProps={{ iconName: "Camera" }}
                onClick={e => {
                    e.preventDefault();
                    this.DoExport(this.state.project);
                }}>
                Lagre øyeblikksbilde
                </PrimaryButton>;
        }
    }
    public render(): JSX.Element {
        let { reports, showDialog, selectedReport, exportStatus } = this.state;
        let options = this.getReportOptions(reports);

        return (
            <div className="export-section ms-Grid-row">
                <div className=" ms-Grid-col ms-md5">
                    {this.renderExportBtn(exportStatus)}
                </div>
                <div className="ms-Grid-col ms-md7">
                    <Icon name="History" />
                    <Dropdown label="" selectedKey="001" options={options} onChanged={(item) => {
                        this.setState({
                            selectedReport: {
                                key: item.key.toString(),
                                text: item.text,
                            },
                            showDialog: true,
                        });
                    }} />
                    <Dialog isOpen={showDialog} type={DialogType.close} onDismiss={this.closeDialog.bind(this)} isBlocking={false} title={selectedReport.text} containerClassName="pp-snapshot-dialog">
                        <div id="snapshot-container">
                            <img src={selectedReport.key}></img>
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }

    private saveFileToLibrary = (libraryRelativeUrl: string, fileName: string, title: string, fileBlob: Blob): Promise<any> => {
        return pnp.sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl).files.add(fileName, fileBlob, true).then((fileAddResult) => {
            return fileAddResult.file.listItemAllFields.get().then((fileAllFields) => {
                return pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title")).items.getById(fileAllFields.Id).update({
                    "Title": title,
                });
            });
        });
    }

    private fetchReports(): void {
        pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title")).items.select("FileLeafRef", "Title", "EncodedAbsUrl").filter("substringof('.png', FileLeafRef)").orderBy("Modified", false).top(10).get().then(reports => {
            this.setState({ reports: reports });
        });
    }

    private getReportOptions = (reports): Array<IDropdownOption> => {
        let options = new Array<IDropdownOption>();

        if (reports && reports.length > 0) {
            options.push({ key: "001", text: `Historikk (${reports.length} tidligere) ` });
            for (let i = 0; i < reports.length; i++) {
                if (reports[i].FileLeafRef) {
                    options.push({ text: reports[i].Title, key: reports[i].EncodedAbsUrl });
                }
            }
        } else {
            options.push({ key: "001", text: `Ingen historikk tilgjengelig` });
        }
        return options;
    }

    private SaveReport = (reportBlob: any) => {
        let fileName = `${_spPageContextInfo.webTitle}-${moment(new Date()).format("YYYY-MM-D-HHmm")}.png`;
        let fileTitle = `${_spPageContextInfo.webTitle} prosjektbilde ${moment(new Date()).format("YYYY-MM-D-HHmm")}`;
        this.saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/${__("Lists_ProjectStatus_Title")}`, fileName, fileTitle, reportBlob).then((data) => {
            this.setState({ exportStatus: IExportReportStatus.hasExported });
            this.fetchReports();
        });
    }

    private DoExport = project => {
        this.setState({ exportStatus: IExportReportStatus.isExporting });
        html2canvas(document.getElementById("pp-projectstatus"), {
            onrendered: canvas => {
                if (canvas.toBlob) {
                    canvas.toBlob(reportBlob => {
                        this.SaveReport(reportBlob);
                    });
                } else if (canvas.msToBlob) {
                    let reportBlob = canvas.msToBlob();
                    this.SaveReport(reportBlob);
                }
            },
        });
    }

    private closeDialog = () => {
        this.setState({ showDialog: false });
    }
}
