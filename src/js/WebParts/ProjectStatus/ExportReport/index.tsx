import React from "react";
import * as pnp from "sp-pnp-js";
import * as moment from "moment";
import { Icon } from "../../@Components";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
// requires jspdf and jspdf-autotable, due to issues with extentions it cannont be imported atm
 declare var jsPDF: any;

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
                className="save-pdf-btn"
                iconProps={{ iconName: "PDF" }}
                onClick={e => {
                    e.preventDefault();
                    this.DoExport(this.state.project);
                }}>
                Prosjektrapporten er lagret
                </PrimaryButton>;
        } else {
            return <PrimaryButton
                className="save-pdf-btn"
                iconProps={{ iconName: "PDF" }}
                onClick={e => {
                    e.preventDefault();
                    this.DoExport(this.state.project);
                }}>
                Lagre prosjektrapport
                </PrimaryButton>;
        }
    }
    public render(): JSX.Element {
        let { reports, showDialog, selectedReport, exportStatus } = this.state;
        let options = this.getReportOptions(reports);

        return (
            <div className="export-section ms-Grid-row">
                <div className=" ms-Grid-col ms-u-md5">
                    {this.renderExportBtn(exportStatus)}
                </div>
                <div className="ms-Grid-col ms-u-md7">
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
                    <Dialog isOpen={showDialog} type={DialogType.close} onDismiss={this.closeDialog.bind(this)} isBlocking={false} title={selectedReport.text} containerClassName="ms-dialogMainReport">
                        <div id="pdf-container">
                            <embed width="750" height="750" src={selectedReport.key} type="application/pdf"></embed>
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }

    private saveFileToLibrary(libraryRelativeUrl: string, fileName: string, title: string, fileBlob: Blob): Promise<any> {
        return pnp.sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl).files.add(fileName, fileBlob, true).then((fileAddResult) => {
            return fileAddResult.file.listItemAllFields.get().then((fileAllFields) => {
                return pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title")).items.getById(fileAllFields.Id).update({
                    "Title": title,
                });
            });
        });
    }

    private fetchReports(): void {
        pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title")).items.select("FileLeafRef", "EncodedAbsUrl").filter("substringof('.pdf', FileLeafRef)").orderBy("Modified", false).top(5).get().then(reports => {
            this.setState({ reports: reports });
        });
    }

    private getReportOptions = (reports): Array<IDropdownOption> => {
        let options = new Array<IDropdownOption>();

        if (reports && reports.length > 0) {
            options.push({ key: "001", text: `Historikk (${reports.length} tidligere) ` });
            for (let i = 0; i < reports.length; i++) {
                if (reports[i].FileLeafRef) {
                    options.push({ text: reports[i].FileLeafRef, key: reports[i].EncodedAbsUrl });
                }
            }
        }
        return options;
    }

    private createReportDoc = (project) => {
        let doc = new jsPDF();
        doc.setFontSize(22);
        doc.text(20, 20, "This is a title");

        doc.setFontSize(16);
        doc.text(20, 30, "This is some normal sized text underneath.");

        return doc.output("blob");
    }

    private DoExport = (project) => {
        this.setState({ exportStatus: IExportReportStatus.isExporting });

        let reportBlob = this.createReportDoc(project);

        let fileName = `${_spPageContextInfo.webTitle}-${moment(new Date()).format("YYYY-MM-D-HHmm")}.pdf`;
        let fileTitle = `${_spPageContextInfo.webTitle} prosjektrapport ${moment(new Date()).format("YYYY-MM-D-HHmm")}`;
        this.saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/${__("Lists_ProjectStatus_Title")}`, fileName, fileTitle, reportBlob).then((data) => {
            this.setState({ exportStatus: IExportReportStatus.hasExported });
            this.fetchReports();
        });
    }

    private closeDialog = () => {
        this.setState({ showDialog: false });
    }
}
