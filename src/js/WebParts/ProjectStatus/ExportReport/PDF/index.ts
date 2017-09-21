import * as moment from "moment";
import * as html2canvas from "html2canvas";
import SectionModel from "../../Section/SectionModel";
let jsPDF = require("jspdf");
require("jspdf-autotable");

interface IColumn {
    title: string;
    dataKey: string;
    widthStyle?: number;
    type?: string;
}
const FONT_SIZE = {
    xlarge: 24,
    large: 20,
    medium: 14,
    small: 10,
};
const MARGIN_LEFT = 14;
const IMAGE_WIDTH = 270;

export class PDF {
    private doc: any;
    public constructor() {
        this.doc = jsPDF("l");
        this.doc.setFont("Segoe UI");
    }
    /**
     * Return PDF Blob
     */
    public getBlob(): Blob {
        return this.doc.output("blob");
    }

    /**
     *
     * @param sections List of sections
     */
    public addProjectMetadataSection = (project: any): void =>  {
        const startPosition = 90;
        this.addTitle(`${__("String_StatusReport") }: ${_spPageContextInfo.webTitle}`, 60, MARGIN_LEFT);
        this.addMetaData(project.GtProjectNumber, __("SiteFields_GtProjectNumber_DisplayName") , startPosition, MARGIN_LEFT);
        this.addMetaData(project.GtProjectPhase, __("SiteFields_GtProjectPhase_DisplayName") , startPosition + 15, MARGIN_LEFT);
        this.addMetaData(project.GtStartDate, __("SiteFields_GtStartDate_DisplayName") , startPosition + 30, MARGIN_LEFT);
        this.addMetaData(project.GtEndDate, __("SiteFields_GtEndDate_DisplayName") , startPosition + 45, MARGIN_LEFT);
        this.addMetaData(project.GtEndDate, __("SiteFields_GtEndDate_DisplayName") , startPosition + 60, MARGIN_LEFT);
        this.addMetaData(project.GtOverallStatus, __("SiteFields_GtOverallStatus_DisplayName"), startPosition, 120);
    }

    /**
     *
     * @param project Project object
     */
    public addStatusSectionPage = (sections: Array<SectionModel>): void =>  {
        this.doc.addPage();
        this.addPageTitle(__("String_StatusReport"), 15, MARGIN_LEFT);
        let yPosition = 30;
        sections.forEach((section, index) => {
            if (section.statusValue) {
                ( index % 2) ? this.addSectionElement(
                    section.statusValue,
                    section.statusComment,
                    section.name,
                    yPosition - 25, 150) : this.addSectionElement(
                        section.statusValue,
                        section.statusComment,
                        section.name,
                        yPosition, 14);
                yPosition += 25;
            }
        });
    }

    /**
     * Returns a promise
     * @param section Status report section
     */
    public addPageWithList = (section: SectionModel): Promise<void> => new Promise<void>((resolve, reject) => {
        this.fetchData(section).then((data) => {
            if (data.items.length) {
                this.doc.addPage();
                this.addPageTitle(section.listTitle, 15, MARGIN_LEFT);
                const settings  = {
                    startY: 30,
                    styles: {
                        columnWidth: "auto",
                        fontSize: 8,
                        overflow: "linebreak",
                        tableWidth: "auto",
                    },
                    // tslint:disable-next-line:no-shadowed-variable
                    createdCell:  (cell, data) => {
                        data.column.widthStyle = this.getColumnWidth(data.column.raw.type);
                    },
                };
                this.doc.autoTable(data.columns, data.items, settings);
            }
            resolve();
        });
    })

     /**
     * Returns a promise
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
                const imgWidth = IMAGE_WIDTH;
                const pageHeight = this.doc.pageHeight;
                const imgHeight = canvas.height * imgWidth / canvas.width;

                let heightLeft = imgHeight;
                let position = 30;

                this.doc.addPage();
                this.addPageTitle(pageTitle, 15, MARGIN_LEFT);
                this.doc.addImage(imgData, "PNG", MARGIN_LEFT, position, imgWidth, imgHeight);
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
    * Fetches required list section data
    * @param section Section used for fetching list data
    */
    private fetchData = (section: SectionModel) => new Promise<any>((resolve, reject) => {
        console.log("Go fetch!");
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
        ctx.load(_items, `Include(FieldValuesAsText)`);
        ctx.load(_fields);
        ctx.executeQueryAsync(() => {
            let validViewFields = section.viewFields.filter(vf => _fields.get_data().filter(lf => lf.get_internalName() === vf).length > 0);
            let columns: Array<IColumn> = validViewFields.map(vf => {
                const [field] = _fields.get_data().filter(lf => lf.get_internalName() === vf);
                return this.createColumn(field);
            });
            let items = _items.get_data().map(i => i.get_fieldValuesAsText().get_fieldValues());
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
    /**
     *
     * @param value Section element value
     * @param comment Section element comment
     * @param name Section element name/label
     * @param yPosition y-axis position
     * @param xPosition x-axis position
     */
    private addSectionElement(value: string, comment: string, name: string, yPosition: number, xPosition: number) {
        this.doc.setTextColor(153, 168, 173);
        this.doc.setFontSize(FONT_SIZE.medium);
        this.doc.text(name.toUpperCase(), xPosition, yPosition);
        if (value) {
            this.doc.setTextColor(51, 51, 51);
            let splitValue = this.doc.splitTextToSize(value, 120);
            this.doc.text(splitValue, xPosition, yPosition + 8);
        }
        if (comment) {
            this.doc.setFontSize(FONT_SIZE.small);
            let splitComment = this.doc.splitTextToSize(comment, 120);
            this.doc.text(splitComment, xPosition, yPosition + 16);
        }
    }

    /**
     *
     * @param value Title value
     * @param yPosition x-axis position
     * @param xPosition y-axis position
     */
    private addTitle(value: string, yPosition: number, xPosition: number) {
        this.doc.setTextColor(153, 168, 173);
        this.doc.setFontSize(FONT_SIZE.xlarge);

        let splitValue = this.doc.splitTextToSize(value, 270);
        this.doc.text(splitValue, xPosition, yPosition);
        this.doc.setFontSize(FONT_SIZE.medium);
        this.doc.text(`${moment(new Date()).format("DD. MMM YYYY - HH:mm")}`, MARGIN_LEFT, yPosition + 15);
        this.doc.setDrawColor(153, 168, 173);
        this.doc.line(MARGIN_LEFT, yPosition + 20, 270, yPosition + 20);
    }
    /**
     *
     * @param value Title value
     * @param label Section element name/label
     * @param yPosition x-axis position
     * @param xPosition y-axis position
     */
    private addMetaData(value: string, label: string, yPosition: number, xPosition: number) {
        this.doc.setTextColor(51, 51, 51);
        this.doc.setFontSize(FONT_SIZE.medium);
        this.doc.setFontType("bold");
        this.doc.text(label, xPosition, yPosition);
        this.doc.setFontType("normal");
        if (value) {
            let splitValue = this.doc.splitTextToSize(value, 150);
            this.doc.text(splitValue, xPosition, yPosition + 8);
        }
    }
    /**
     *
     * @param value Title value
     * @param yPosition x-axis position
     * @param xPosition y-axis position
     */
    private addPageTitle(value: string, yPosition: number, xPosition: number) {
        this.doc.setTextColor(51, 51, 51);
        this.doc.setFontSize(FONT_SIZE.large);
        this.doc.text(value, xPosition, 20);
    }
}

