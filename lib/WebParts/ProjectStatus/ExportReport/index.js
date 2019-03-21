"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../Resources");
const sp_1 = require("@pnp/sp");
const logging_1 = require("@pnp/logging");
const moment = require("moment");
const html2canvas = require("html2canvas");
const sanitize = require("sanitize-filename");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const SnapshotDialog_1 = require("./SnapshotDialog");
const ExportReportStatus_1 = require("./ExportReportStatus");
const PDFExport_1 = require("./PDFExport");
class ExportReport extends React.Component {
    /**
     * Constructor
     *
     * @param {IExportReportProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = {
            exportStatus: ExportReportStatus_1.default.IDLE,
            isLoading: true,
        };
        this._reportsLib = sp_1.sp.web.lists.getByTitle(props.reportsLibTitle);
        this._onExportClick = this._onExportClick.bind(this);
        this._onSelectedReportChanged = this._onSelectedReportChanged.bind(this);
        this._onSnapshotDialogDismiss = this._onSnapshotDialogDismiss.bind(this);
        this._onRenderReportOption = this._onRenderReportOption.bind(this);
    }
    /**
     * Component did mount
     */
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield this.fetchReportHistory();
            this.setState({ isLoading: false, reports });
        });
    }
    render() {
        const { exportType } = this.props;
        const { selectedReport, exportStatus, isLoading } = this.state;
        if (isLoading) {
            return React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.medium });
        }
        return (React.createElement("div", { className: "export-section ms-Grid" },
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: " ms-Grid-col ms-md5" }, this.renderExportAction(exportStatus, exportType)),
                React.createElement("div", { className: "ms-Grid-col ms-md7" },
                    React.createElement(Icon_1.Icon, { iconName: "History" }),
                    React.createElement(Dropdown_1.Dropdown, { id: "pp-reportDropdown", label: "", selectedKey: "ReportOption_0", options: this.getReportOptions(), onChanged: this._onSelectedReportChanged, onRenderOption: this._onRenderReportOption }),
                    selectedReport && (React.createElement(SnapshotDialog_1.default, { report: selectedReport.data, onDismiss: this._onSnapshotDialogDismiss }))))));
    }
    /**
     * Render export action
     *
     * @param {ExportReportStatus} exportStatus Export status
     * @param {string} exportType
     */
    renderExportAction(exportStatus, exportType) {
        const exportTypeContext = this.getExportTypeContext(exportType);
        switch (exportStatus) {
            case ExportReportStatus_1.default.IS_EXPORTING: {
                return (React.createElement("div", { style: { paddingTop: 5 } },
                    React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.small })));
            }
            case ExportReportStatus_1.default.HAS_EXPORTED: {
                return (React.createElement("div", { style: { paddingTop: 5 } },
                    React.createElement(Icon_1.Icon, { style: { marginRight: 8 }, iconName: exportTypeContext.IS_SAVED_ICON_NAME }),
                    React.createElement("span", null, exportTypeContext.IS_SAVED)));
            }
            case ExportReportStatus_1.default.IDLE: {
                return (React.createElement(Button_1.PrimaryButton, { id: "pp-saveSnapshotBtn", text: exportTypeContext.SAVE, className: "save-snapshot-btn", iconProps: { iconName: exportTypeContext.SAVE_ICON_NAME }, onClick: (e) => { this._onExportClick(e); } }));
            }
        }
    }
    /**
     * On render report option
     *
     * @param {IDropdownOption} opt Option
     */
    _onRenderReportOption(opt) {
        if (opt.data) {
            const exportType = opt.data.FileLeafRef.split(".").pop().toLowerCase();
            const exportTypeContext = this.getExportTypeContext(exportType);
            return (React.createElement("div", null,
                React.createElement(Icon_1.Icon, { style: { marginRight: 8 }, iconName: exportTypeContext.SAVE_ICON_NAME }),
                React.createElement("span", null, opt.text)));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("span", null, opt.text)));
        }
    }
    /**
     * Get export action resources
     *
     * @param {string} exportType Export type (PDF/PNG)
     */
    getExportTypeContext(exportType) {
        switch (exportType) {
            case "pdf": {
                return {
                    SAVE: Resources_1.default.getResource("ProjectStatus_SaveAsPdf"),
                    IS_SAVING: Resources_1.default.getResource("ProjectStatus_SavingAsPdf"),
                    IS_SAVED: Resources_1.default.getResource("ProjectStatus_PDFSaved"),
                    SAVE_ICON_NAME: "PDF",
                    IS_SAVED_ICON_NAME: "Save",
                };
            }
            case "png": {
                return {
                    SAVE: Resources_1.default.getResource("ProjectStatus_SaveSnapshot"),
                    IS_SAVING: Resources_1.default.getResource("ProjectStatus_SavingSnapshot"),
                    IS_SAVED: Resources_1.default.getResource("ProjectStatus_SnapshotIsSaved"),
                    SAVE_ICON_NAME: "Camera",
                    IS_SAVED_ICON_NAME: "Save",
                };
            }
        }
    }
    /**
     *  Get report options
     */
    getReportOptions() {
        const { reports } = this.state;
        const hasHistory = reports.length > 0;
        const validReports = reports.filter(r => r.FileLeafRef);
        const options = validReports.map((r, index) => ({
            key: `ReportOption_${index + 1}`,
            text: r.Title,
            data: r,
        }));
        let firstOption = {
            key: "ReportOption_0",
            text: Resources_1.default.getResource("ProjectStatus_SnapshotNoHistory"),
        };
        if (hasHistory) {
            firstOption.text = String.format(Resources_1.default.getResource("ProjectStatus_SnapshotHistory"), reports.length);
        }
        return [firstOption, ...options];
    }
    /**
     * On export click
     */
    _onExportClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            this.startExport();
        });
    }
    /**
     * On selected report changed
     *
     * @param {IDropdownOption} opt Option
     */
    _onSelectedReportChanged(opt) {
        this.setState({ selectedReport: opt });
    }
    /**
     * On <SnapshotDialog /> dismiss
     */
    _onSnapshotDialogDismiss() {
        this.setState({ selectedReport: null });
    }
    startExport() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.log({ message: "(startExport) Starting export", data: { exportType: this.props.exportType }, level: 1 /* Info */ });
            this.setState({ exportStatus: ExportReportStatus_1.default.IS_EXPORTING });
            let blob;
            switch (this.props.exportType) {
                case "pdf":
                    blob = yield this.saveAsPdf();
                    break;
                case "png":
                    blob = yield this.saveAsPng();
                    break;
            }
            const report = yield this.saveReportToLibrary(blob, this.props.exportType);
            logging_1.Logger.log({ message: "(startExport) Export done", data: { exportType: this.props.exportType }, level: 1 /* Info */ });
            this.setState({
                reports: [report, ...this.state.reports],
                exportStatus: ExportReportStatus_1.default.HAS_EXPORTED,
            });
        });
    }
    /**
     * Save report as PNG
     */
    saveAsPng() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const canvas = yield html2canvas(document.getElementById("pp-projectstatus"));
                if (canvas.toBlob) {
                    canvas.toBlob(resolve);
                }
                else if (canvas["msToBlob"]) {
                    const blob = canvas["msToBlob"]();
                    resolve(blob);
                }
            }));
        });
    }
    /**
     * Save report as PDF
     */
    saveAsPdf() {
        return __awaiter(this, void 0, void 0, function* () {
            const { sections } = this.props;
            const pdfExport = new PDFExport_1.default(sections);
            const blob = yield pdfExport.generateBlob();
            return blob;
        });
    }
    /**
     * Save report
     *
     * @param {Blob} reportBlob Report blob
     * @param {string} fileExtension File extension
     */
    saveReportToLibrary(reportBlob, fileExtension) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtFormatted = moment(new Date()).format("YYYY-MM-D-HHmm");
            const fileName = `${dtFormatted}-${sanitize(_spPageContextInfo.webTitle)}.${fileExtension}`;
            const fileTitle = `${dtFormatted} ${_spPageContextInfo.webTitle}`;
            const libServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${this.props.reportsLibTitle}`;
            logging_1.Logger.log({ message: `(saveReportToLibrary) Saving report as ${fileExtension}`, data: { fileName, fileTitle, libServerRelativeUrl }, level: 1 /* Info */ });
            const report = yield this.saveFileToLibrary(libServerRelativeUrl, fileName, fileTitle, reportBlob);
            logging_1.Logger.log({ message: "(saveReportToLibrary) Successfully saved report", data: {}, level: 1 /* Info */ });
            return report;
        });
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
    saveFileToLibrary(libServerRelativeUrl, fileName, title, blob, shouldOverWrite = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const libRootFolder = sp_1.sp.web.getFolderByServerRelativeUrl(libServerRelativeUrl);
            const fileAddResult = yield libRootFolder.files.add(fileName, blob, shouldOverWrite);
            const { ID, FileLeafRef, EncodedAbsUrl } = yield fileAddResult
                .file
                .listItemAllFields
                .select("ID", "FileLeafRef", "EncodedAbsUrl")
                .get();
            yield this._reportsLib.items.getById(ID).update({ "Title": title });
            return {
                Title: title,
                FileLeafRef,
                EncodedAbsUrl,
            };
        });
    }
    /**
     * Fetch reports
     */
    fetchReportHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield this._reportsLib
                    .items
                    .select("FileLeafRef", "Title", "EncodedAbsUrl")
                    .filter("substringof('.png',FileLeafRef) or substringof('.pdf',FileLeafRef)")
                    .orderBy("Modified", false)
                    .top(this.props.maxReportHistory)
                    .get();
                return reports;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
ExportReport.defaultProps = {
    reportsLibTitle: Resources_1.default.getResource("Lists_ProjectStatus_Title"),
    maxReportHistory: 25,
};
exports.default = ExportReport;
