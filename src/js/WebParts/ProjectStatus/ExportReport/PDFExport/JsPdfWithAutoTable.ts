import * as jsPDF from 'jspdf'
require('jspdf-autotable')

export default class JsPdfWithAutoTable extends jsPDF {
    public autoTable: any;
    public pageHeight: any;

    constructor(layout) {
        super(layout)
    }
}
