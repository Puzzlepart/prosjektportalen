import * as React from "react";
import * as pnp from "sp-pnp-js";
import * as moment from "moment";
import { Icon } from "../../@Components";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
// requires jspdf and jspdf-autotable, due to issues with extentions it cannont be imported atm
declare var jsPDF: any;

export interface IExportReportState {
    project: any;
    reports: any;
    selectedReport: {
        key: string,
        text: string,
    };
}

export default class ExportReport extends React.Component<any, IExportReportState> {
    constructor() {
        super();
        this.state = {
            project: null,
            reports: null,
            selectedReport: {
                key: "",
                text: "",
            },
        };
    }

    public componentDidMount(): void {
        this.fetchReports();
    }

    public render(): JSX.Element {
        let options = this.getReportOptions(this.state.reports);
        return (
            <div className="export-section ms-Grid-row">
                <div className=" ms-Grid-col ms-u-md4">
                    <PrimaryButton
                        className="save-pdf-btn"
                        onClick={e => {
                            e.preventDefault();
                            this.DoExport(this.state.project);
                        }}
                        iconProps={{ iconName: "PDF" }}>Eksporter til PDF</PrimaryButton>
                </div>
                <div className=" ms-Grid-col ms-u-md4">
                    <Icon name="History" />
                </div>
                <div className="ms-Grid-col ms-u-md4">
                    <Dropdown label="" selectedKey="001" options={options} onChanged={(item) => {
                        this.setState({
                            selectedReport: {
                                key: item.key.toString(),
                                text: item.text,
                            },
                        });
                    }} />
                </div>
        </div>);
    }

    private saveFileToLibrary (libraryRelativeUrl: string, fileName: string, fileBlob: Blob): Promise<any> {
        return pnp.sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl).files.add(fileName, fileBlob, true);
    }

    private fetchReports(): void {
        pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title")).items.select("FileLeafRef", "EncodedAbsUrl").filter("substringof('.pdf', FileLeafRef)").orderBy("Modified", false).top(5).get().then(reports => {
            this.setState({ reports: reports });
        });
    }

    private getReportOptions = (reports: Array<any>): Array<IDropdownOption> => {
        if (reports.length < 1) {
            return [];
        }

        let options = new Array<IDropdownOption>();
        options.push({ key: "001", text: `Historikk (${reports.length} tidligere) ` });
        for (let i = 0; i < reports.length; i++) {
            if (reports[i].FileLeafRef) {
                options.push({ text: reports[i].FileLeafRef.split(".")[0], key: reports[i].EncodedAbsUrl });
            }
        }
        return options;
    }

    private DoExport = (project) => {
        SP.SOD.registerSod("jspdf", `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/pp/js/jspdf.min.js`);
        SP.SOD.registerSod("jspdf.plugin.autotable", `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/pp/js/jspdf.plugin.autotable.js`);
        SP.SOD.registerSodDep("jspdf.plugin.autotable", "jspdf");
        SP.SOD.executeFunc("jspdf", "jsPDF", () => {
            let doc = jsPDF("l");
            doc.setFontSize(22);
            doc.text(_spPageContextInfo.webTitle, 14, 20);
            doc.setFontSize(8);
            doc.text(_spPageContextInfo.webAbsoluteUrl, 14, 30);
            let reportBlob = doc.output("blob");

            this.saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/${__("Lists_ProjectStatus_Title")}`, `${_spPageContextInfo.webTitle}-${moment(new Date()).format("YYYY-MM-D-HHmm")}.pdf`, reportBlob).then((data) => {
                console.log(data);
                let notification = SP.UI.Status.addStatus(
                    `Prosjektstatusrapport lagret.`,
                    `<div id='pdf-save-notification'>
                        Statusrapport er opprettet og er tilgjengelig under historikk.
                    <div>`,
                    false,
                );
                window.setTimeout(() => {
                    SP.UI.Status.removeStatus(notification);
                }, 8000);
                this.fetchReports();
            });
        });
    }
}
