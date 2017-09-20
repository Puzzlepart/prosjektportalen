import * as moment from "moment";
import * as html2canvas from "html2canvas";
let jsPDF = require("jspdf");
require("jspdf-autotable");

interface IColumn {
    title: string;
    dataKey: string;
    widthStyle?: number;
    type?: string;
}

const FONT_SIZE = {
    large: 24,
    medium: 18,
    small: 12,
};

export class PDFBuilder {
    private doc: any;
    private marginLeft: number;
    private marginTop: number;
    private tableSettings: any;

    /**
     *
     * @param marginLeft PDF report margin left
     * @param marginLeft PDF report margin top
     * @param layout PDF report layout
     */
    public constructor(marginLeft: number, marginTop: number, layout: string) {
        this.marginLeft = marginLeft;
        this.marginTop = marginTop;
        this.doc = jsPDF(layout);
        this.tableSettings = {
            startY: 30,
            styles: {
                columnWidth: "auto",
                fontSize: 8,
                overflow: "linebreak",
                tableWidth: "auto",
            },
            createdCell:  (cell, data) => {
                data.column.widthStyle = this.getColumnWidth(data.column.raw.type);
            },
        };
    }
    public getBlob(): Blob {
        return this.doc.output("blob");
    }

    /**
     *
     * @param section List section used for generating pdf autotable
     */
    public addPageWithList = (section): Promise<void> => new Promise<void>((resolve, reject) => {
        this.fetchData(section).then((data) => {
            this.doc.addPage();
            this.doc.setTextColor(0, 0, 0);
            this.doc.setFontSize(20);
            this.doc.text(section.listTitle, this.marginLeft, 20);
            this.doc.autoTable(data.columns, data.items, this.tableSettings);
            resolve();
        });
    })

     /**
     *
     * @param imageId ID of DOM element to be added
     * @param pageTitle The title of the page
     */

    public addPageWithImage = (imageId: string, pageTitle: string): Promise<void> => new Promise<void>((resolve, reject) => {
        if (!document.getElementById(imageId)) {
            resolve();
        }
        html2canvas(document.getElementById(imageId), {
            onrendered: canvas => {
                const imgData = canvas.toDataURL("image/jpeg");
                const imgWidth = 270;
                const pageHeight = this.doc.pageHeight;
                const imgHeight = canvas.height * imgWidth / canvas.width;

                let heightLeft = imgHeight;
                let position = 30;

                this.doc.addPage();
                this.doc.setFontSize(FONT_SIZE.large);
                this.doc.text(pageTitle, this.marginLeft, 20);
                this.doc.addImage(imgData, "PNG", this.marginLeft, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    this.doc.addPage();
                    this.doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                resolve();
            },
        });
    })
     /**
    * Fetches required list data
    * @param section Section used for fetching list data
    */
    private fetchData = (section) => new Promise<any>((resolve, reject) => {
        console.log("fetch!");
        const ctx = SP.ClientContext.get_current();
        const list = ctx.get_web().get_lists().getByTitle(section.listTitle);
        const camlQuery = new SP.CamlQuery();
        let viewXml = ["<View>"];
        if (section.viewQuery) {
            viewXml.push(`<Query>${section.viewQuery}</Query>`);
        }
        if (section.rowLimit) {
            viewXml.push(`<RowLimit>${section.rowLimit}</RowLimit>`);
        }
        viewXml.push("</View>");
        camlQuery.set_viewXml(viewXml.join(""));
        const _items = list.getItems(camlQuery);
        const _fields = list.get_fields();
        ctx.load(_items, `Include(${section.viewFields.join()})`);
        ctx.load(_fields);
        ctx.executeQueryAsync(() => {
            let validViewFields = section.viewFields.filter(vf => _fields.get_data().filter(lf => lf.get_internalName() === vf).length > 0);
            let columns: Array<IColumn> = validViewFields.map(vf => {
                const [field] = _fields.get_data().filter(lf => lf.get_internalName() === vf);
                return this.createColumn(field);
            });
            let items = _items.get_data().map(i => this.parseFieldValues(i, columns));
            resolve({items, columns});
        }, reject);
    })

    /**
    * Create new autotable column
    * @param field SP.Field
    */
    private createColumn(field: SP.Field): IColumn {
        let column: IColumn = {
            title: field.get_title(),
            dataKey: field.get_internalName(),
            type: field.get_typeAsString().toLowerCase(),
        };
        return column;
    }

    /**
    * Parse field values such as taxonomyfieldtype and datetime
    * @param item SP.ListItem
    * @param columns Array<IColumn>
    */
    private parseFieldValues(item: SP.ListItem, columns:  Array<IColumn>): SP.Field {
        columns.forEach((column: IColumn) => {
            const value = item.get_fieldValues()[column.dataKey];
            switch (column.type) {
                case "taxonomyfieldtype": {
                    item.get_fieldValues()[column.dataKey] = (value) ? value.Label : "";
                }
                    break;
                case "datetime": {
                    item.get_fieldValues()[column.dataKey] = (value) ? moment(new Date(value)).format("DD. MMM YYYY") : "";
                }
                    break;
                default:
                    item.get_fieldValues()[column.dataKey] = (value) ? value : "";

            }
        });
        return item.get_fieldValues();
    }
    /**
    * Returns column width based on field type
    * @param type Field type
    */
    private getColumnWidth(type: string): number {
        // might have some calculations based on number of columns
        switch (type) {
            case "text": case "note": {
                return 40;
            }
        }
    }
}

