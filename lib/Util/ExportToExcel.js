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
const _1 = require("./");
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}
var ExcelExportStatus;
(function (ExcelExportStatus) {
    ExcelExportStatus[ExcelExportStatus["Idle"] = 0] = "Idle";
    ExcelExportStatus[ExcelExportStatus["Exporting"] = 1] = "Exporting";
})(ExcelExportStatus = exports.ExcelExportStatus || (exports.ExcelExportStatus = {}));
function ExportToExcel({ sheets, fileName, options = { type: "binary", bookType: "xlsx" } }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield _1.loadLibraries(["FileSaver.min.js", "xlsx.full.min.js"]);
        const workBook = window.XLSX.utils.book_new();
        sheets.forEach((s, index) => {
            const sheet = window.XLSX.utils.aoa_to_sheet(s.data);
            window.XLSX.utils.book_append_sheet(workBook, sheet, s.name || `Sheet${index + 1}`);
        });
        const wbout = window.XLSX.write(workBook, options);
        window.saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName);
        return;
    });
}
exports.default = ExportToExcel;
