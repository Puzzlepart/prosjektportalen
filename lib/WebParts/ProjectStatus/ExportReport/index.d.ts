import * as React from "react";
import IExportReportProps from "./IExportReportProps";
import IExportReportState from "./IExportReportState";
export default class ExportReport extends React.Component<IExportReportProps, IExportReportState> {
    static defaultProps: Partial<IExportReportProps>;
    private _reportsLib;
    /**
     * Constructor
     *
     * @param {IExportReportProps} props Props
     */
    constructor(props: IExportReportProps);
    /**
     * Component did mount
     */
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IExportReportProps>;
    /**
     * Render export action
     *
     * @param {ExportReportStatus} exportStatus Export status
     * @param {string} exportType
     */
    private renderExportAction;
    /**
     * On render report option
     *
     * @param {IDropdownOption} opt Option
     */
    private _onRenderReportOption;
    /**
     * Get export action resources
     *
     * @param {string} exportType Export type (PDF/PNG)
     */
    private getExportTypeContext;
    /**
     *  Get report options
     */
    private getReportOptions;
    /**
     * On export click
     */
    private _onExportClick;
    /**
     * On selected report changed
     *
     * @param {IDropdownOption} opt Option
     */
    private _onSelectedReportChanged;
    /**
     * On <SnapshotDialog /> dismiss
     */
    private _onSnapshotDialogDismiss;
    private startExport;
    /**
     * Save report as PNG
     */
    private saveAsPng;
    /**
     * Save report as PDF
     */
    private saveAsPdf;
    /**
     * Save report
     *
     * @param {Blob} reportBlob Report blob
     * @param {string} fileExtension File extension
     */
    private saveReportToLibrary;
    /**
     * Save file to library
     *
     * @param {string} libServerRelativeUrl Library server relative URL
     * @param {string} fileName Filename
     * @param {string} title Title
     * @param {Blob} blob Blob
     * @param {boolean} shouldOverWrite Should overwrite
     */
    private saveFileToLibrary;
    /**
     * Fetch reports
     */
    private fetchReportHistory;
}
