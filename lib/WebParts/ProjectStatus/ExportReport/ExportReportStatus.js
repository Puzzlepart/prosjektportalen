"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExportReportStatus;
(function (ExportReportStatus) {
    ExportReportStatus[ExportReportStatus["IDLE"] = 0] = "IDLE";
    ExportReportStatus[ExportReportStatus["IS_EXPORTING"] = 1] = "IS_EXPORTING";
    ExportReportStatus[ExportReportStatus["HAS_EXPORTED"] = 2] = "HAS_EXPORTED";
})(ExportReportStatus || (ExportReportStatus = {}));
exports.default = ExportReportStatus;
