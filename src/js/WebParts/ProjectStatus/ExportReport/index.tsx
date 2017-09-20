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
import { PDFBuilder } from "./PDFBuilder";

const AS_PDF: boolean = true;

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
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchReports().then(reports => this.setState({
            isLoading: false,
            reports,
        }));
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
    private _render({ }: IExportReportProps, { reports, showDialog, selectedReport, exportStatus, isLoading }: IExportReportState): JSX.Element {
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
                        {this.state.selectedReport && (
                            <Dialog
                                isOpen={showDialog}
                                type={DialogType.close}
                                onDismiss={e => this.setState({ showDialog: false })}
                                isBlocking={false}
                                title={selectedReport.text}
                                containerClassName="pp-snapshot-dialog">
                                <div id="snapshot-container">
                                    {(AS_PDF) ? (
                                        <embed width="850" height="750" src={selectedReport.key} type="application/pdf"></embed>
                                        ) : (<img src={selectedReport.key}></img>)}
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
     */
    private renderExportBtn = exportStatus => {
        if (exportStatus === ExportReportStatus.isExporting) {
            return (
                <Spinner size={SpinnerSize.medium} />
            );
        }
        return (
            <PrimaryButton
                className="save-snapshot-btn"
                iconProps={{ iconName: "Camera" }}
                onClick={this.doExport}>
                {exportStatus === ExportReportStatus.hasExported ? __("ProjectStatus_SnapshotIsSaved") : __("ProjectStatus_SaveSnapshot")}
            </PrimaryButton>
        );
    }

    /**
     * Save file to library
     *
     * @param {string} libraryRelativeUrl Library relative URL
     * @param {string} fileName Filename
     * @param {string} title Title
     * @param {Blob} fileBlob File blob
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
    private fetchReports = () => new Promise<any[]>((resolve, reject) => {
        pnp.sp.web.lists.getByTitle(__("Lists_ProjectStatus_Title"))
            .items
            .select("FileLeafRef", "Title", "EncodedAbsUrl")
            .filter("substringof('.png', FileLeafRef)")
            .orderBy("Modified", false)
            .top(10)
            .get()
            .then(reports => {
                resolve(reports);
            })
            .catch(reject);
    })

    /**
     * Get report options
     *
     * @param {any} reports Reports
     */
    private getReportOptions = (reports): Array<IDropdownOption> => {
        let options = reports.filter(r => r.FileLeafRef).map(({ Title: text, EncodedAbsUrl: key }) => ({
            key,
            text,
        }));
        let firstOption = reports.length > 0
            ? {
                key: "01",
                text: String.format(__("ProjectStatus_SnapshotHistory"), reports.length),
            }
            : {
                key: "01",
                text: __("ProjectStatus_SnapshotNoHistory"),
            };
        return [
            firstOption,
            ...options,
        ];
    }

    /**
     * Save report
     *
     * @param {any} reportBlob Blob for the report file
     */
    private saveReport = (reportBlob: Blob, fileExtension: string) => {
        const dateDisplay = moment(new Date()).format("YYYY-MM-D-HHmm");
        const fileName = `${dateDisplay}-${_spPageContextInfo.webTitle}.${fileExtension}`;
        const fileTitle = `${dateDisplay} ${_spPageContextInfo.webTitle}`;
        this.saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/${__("Lists_ProjectStatus_Title")}`, fileName, fileTitle, reportBlob).then((data) => {
            this.setState({
                exportStatus: ExportReportStatus.hasExported,
                isLoading: true,
            }, () => {
                this.fetchReports().then(reports => this.setState({
                    isLoading: false,
                    reports,
                }));
            });
        });
    }

    /**
     * Do export
     *
     * @param {any} e Event
     */
    private doExport = e => {
        e.preventDefault();
        this.setState({ exportStatus: ExportReportStatus.isExporting }, () => {
            (AS_PDF) ? this.saveAsPDF() : this.saveAsPng();
        });
    }

    /**
     * Save file as PDF
     */
    private saveAsPDF(): void {
        let { sections } = this.props;
        let builder = new PDFBuilder(15, 20, "l");
        const promises = [];
        sections.forEach((section) => {
            if (section.showRiskMatrix) {
                promises.push(builder.addPageWithImage("risk-matrix", "Risiko - Matrise"));
            }
            if (section.listTitle) {
                promises.push(builder.addPageWithList(section));
            }
        });
        Promise.all(promises).then(() => {
            this.saveReport(builder.getBlob(), "pdf");
        });
    }

     /**
     * Save file as PNG
     */
    private saveAsPng(): void {
        const element = document.getElementById("pp-projectstatus");
        html2canvas(element, {
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
