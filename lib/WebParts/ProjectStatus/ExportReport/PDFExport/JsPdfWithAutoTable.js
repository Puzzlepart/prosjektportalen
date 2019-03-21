"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsPDF = require("jspdf");
require("jspdf-autotable");
class JsPdfWithAutoTable extends jsPDF {
    constructor(layout) {
        super(layout);
    }
}
exports.default = JsPdfWithAutoTable;
