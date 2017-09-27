// @ts-check
import * as React from "react";
import RESOURCE_MANAGER from "localization";
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
import SectionModel from "../Section/SectionModel";
import { SectionType } from "../Section/SectionModel";
import { PDF } from "./PDF";
import { FileType, IFileTypeButton } from "./FileType";

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
            fileType: FileType.pdf,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        let {fileType} = this.state;
        let type = ( fileType === FileType.pdf ) ? "pdf" : "png";
        this.fetchReports(type).then(reports => this.setState({
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
    private _render({ }: IExportReportProps, { reports, showDialog, selectedReport, exportStatus, isLoading, fileType }: IExportReportState): JSX.Element {
        if (isLoading) {
            return <Spinner size={SpinnerSize.medium} />;
        }

        return (
            <div className="export-section ms-Grid">
                <div className="ms-Grid-row">
                    <div className=" ms-Grid-col ms-md5">
                        {this.renderExportBtn(exportStatus, fileType)}
                    </div>
                    <div className="ms-Grid-col ms-md7">
                        <Icon name="History" />
                        <Dropdown
                            id="pp-reportDropdown"
                            label=""
                            selectedKey="01"
                            options={this.getReportOptions(reports, fileType)}
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
                                    {(fileType === FileType.pdf) ? (
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
    private renderExportBtn = (exportStatus, fileType) => {
        let button: IFileTypeButton = this.getButtonLabel(fileType);
        if (exportStatus === ExportReportStatus.isExporting) {
            return (
                <Spinner size={SpinnerSize.medium} />
            );
        }
        return (
            <PrimaryButton
                className="save-snapshot-btn"
                iconProps={{  iconName: button.icon}}
                onClick={this.doExport}>
                {exportStatus === ExportReportStatus.hasExported ? button.isSaved : button.save}
            </PrimaryButton>
        );
    }

    /**
     * @param {number} fileType
     */
    private getButtonLabel = (fileType): IFileTypeButton => {
        switch (fileType) {
            case FileType.pdf:  {
                return {
                    save:  RESOURCE_MANAGER.getResource("ProjectStatus_SaveAsPdf"),
                    saving: RESOURCE_MANAGER.getResource("ProjectStatus_SavingAsPdf"),
                    isSaved: RESOURCE_MANAGER.getResource("ProjectStatus_PDFSaved"),
                    icon: "Save",
                };
            }
            case FileType.png:  {
                return {
                    save:  RESOURCE_MANAGER.getResource("ProjectStatus_SaveSnapshot"),
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
    private saveFileToLibrary = (libraryRelativeUrl: string, fileName: string, title: string, fileBlob: Blob): Promise<any> => {
        return pnp.sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl).files.add(fileName, fileBlob, true).then((fileAddResult) => {
            return fileAddResult.file.listItemAllFields.get().then((fileAllFields) => {
                return pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title")).items.getById(fileAllFields.Id).update({
                    "Title": title,
                });
            });
        });
    }


    /**
     * @param {number} fileType
     */
    private fetchReports = (fileType) => new Promise<any[]>((resolve, reject) => {
        pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title"))
            .items
            .select("FileLeafRef", "Title", "EncodedAbsUrl")
            .filter(`substringof('.${ fileType }', FileLeafRef)`)
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
    private getReportOptions = (reports, fileType): Array<IDropdownOption> => {
        let options = reports.filter(r => r.FileLeafRef).map(({ Title: text, EncodedAbsUrl: key }) => ({
            key,
            text,
        }));
        let firstOption = reports.length > 0
            ? {
                key: "01",
                text: String.format(RESOURCE_MANAGER.getResource("ProjectStatus_SnapshotHistory"), reports.length),
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

    /**
     * Do export
     *
     * @param {any} e Event
     */
    private doExport = e => {
        e.preventDefault();
        this.setState({ exportStatus: ExportReportStatus.isExporting }, () => {
            switch (this.state.fileType) {
                case FileType.pdf:
                    this.saveAsPDF();
                break;
                case FileType.png:
                    this.saveAsPng();
                break;
            }
        });
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
        this.saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/${RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title")}`, fileName, fileTitle, reportBlob).then((data) => {
            this.setState({
                exportStatus: ExportReportStatus.hasExported,
                isLoading: true,
            }, () => {
                this.fetchReports(fileExtension).then(reports => this.setState({
                    isLoading: false,
                    reports,
                }));
            });
        });
    }

    /**
     * Save file as PDF
     */
    private saveAsPDF = () => {
        this.setState({ exportStatus: ExportReportStatus.isExporting }, () =>  {
            let { sections } = this.props;
            let pdf = new PDF();
                pdf.addProjectPropertiesPage().then(() =>  {
                    pdf.addStatusSection(sections);
                    let promises = new Array<Promise<any>>();
                    sections.forEach((section: SectionModel) => {
                        if (section.showRiskMatrix && section.showAsSection) {
                            promises.push(pdf.addPageWithImage("risk-matrix", RESOURCE_MANAGER.getResource("ProjectStatus_PDFRiskMatrix")));
                        }
                        if (section.listTitle && section.showAsSection) {
                            promises.push(pdf.addPageWithList(section));
                        }
                        if ((section.getType() === SectionType.ProjectPropertiesSection) && section.showAsSection) {
                            promises.push(pdf.addProjectPropertiesSection(section));
                        }
                    });
                    promises.reduce((promise: Promise<any>, func) => {
                        return promise.then(_ => func);
                    }, Promise.resolve())
                    .then(() => {
                        this.saveReport(pdf.getBlob(), "pdf");
                    });
                });
            });
    }

     /**
     * Save file as PNG
     */
    private saveAsPng = () => {
        this.setState({ exportStatus: ExportReportStatus.isExporting }, () => {
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
        });
    }
}
