import * as moment from "moment";
import * as html2canvas from "html2canvas";
import { Site, Web } from "sp-pnp-js";
import SectionModel from "../../Section/SectionModel";
import * as jsPDF from "jspdf";
require("jspdf-autotable");

interface ITableColumn {
    title: string;
    dataKey: string;
    widthStyle?: number;
    type?: string;
}
interface IProject {
    item: any;
    fields: any;
}


enum FONT_SIZE {
    xlarge =  24,
    large = 20,
    medium = 14,
    small = 10,
    xsmall =  8,
}

export class PDF extends jsPDF {
    private autoTable: any;
    private pageHeight: any;
    private readonly MARGIN_LEFT = 14;
    private readonly IMAGE_WIDTH = 270;
    public constructor(layout: string = "l") {
        super(layout);
        this.setFont("Segoe UI");
    }
    /**
     * Return PDF Blob
     */
    public getBlob = (): Blob  => {
        return this.output("blob");
    }
    /**
     *
     * Add project metadata to first page
     */
    public addProjectPropertiesPage = (): Promise<void> => new Promise<void>((resolve, reject) => {
        this.addDocumentTitle(`${__("String_StatusReport") }: ${_spPageContextInfo.webTitle}`, 15, this.MARGIN_LEFT);
        this.fetchProject().then((project: IProject) => {
            this.addProperty(this.createColumn(__("SiteFields_GtOverallStatus_DisplayName"), "GtOverallStatus"), project.item.GtOverallStatus, null, 40);
            this.fetchProjectData(project).then((data) => {
                data.properties.filter((property) => property.value).map((property) => {
                        this.addProperty(property.field, property.value, null, this.autoTable.previous.finalY);
                });
                resolve();
            })
            .catch(reject);
        });
    })
    /**
     * @param sections Status report section collection: Array<SectionModel>
     */
    public addStatusSection = (sections: Array<SectionModel>): void =>  {
        this.addPage();
        sections.filter((section: SectionModel) => section.showInStatusSection).map((section, index) => {
            const yPosition = (index > 0) ?  this.autoTable.previous.finalY : 20;
            this.addProperty(this.createColumn(section.name, section.fieldName), section.statusValue, section.statusComment, yPosition);
        });
    }
    /**
     * @param section Status report section: SectionModel
     */
    public addPageWithList = (section: SectionModel): Promise<void> => new Promise<void>((resolve, reject) => {
        this.fetchData(section).then((data) => {
            if (data.items.length) {
                this.addPage();
                this.addPageTitle(section.name, 15, this.MARGIN_LEFT);
                const settings  = {
                    startY: 30,
                    styles: {
                        columnWidth: "auto",
                        fontSize: 8,
                        overflow: "linebreak",
                        tableWidth: "auto",
                    },
                    createdCell:  (cell, element) => {
                        element.column.widthStyle = this.getColumnWidth(element.column.raw.type);
                    },
                };
                this.autoTable(data.columns, data.items, settings);
            }
            resolve();
        })
        .catch(reject);
    })

     /**
     * @param imageId ID of DOM element to be added
     * @param pageTitle The title of the page
     */
    public addPageWithImage = (imageId: string, pageTitle: string): Promise<void> => new Promise<void>((resolve, reject) => {
        if (!document.getElementById(imageId)) {
            resolve();
        }
        html2canvas(document.getElementById(imageId), {
            onrendered: canvas => {
                this.addPage();
                this.addPageTitle(pageTitle, 15, this.MARGIN_LEFT);
                this.addImageToCanvas(canvas);
                resolve();
            },
        });
    })
    /**
     * Returns a promise
     * @param section Status report section: SectionModel
     */
    public addProjectPropertiesSection = (section: SectionModel) => new Promise<void>((resolve, reject) => {
        this.fetchProject().then((project: IProject) => {
            this.addPage();
            this.addPageTitle(section.name, 15, this.MARGIN_LEFT);
            section.viewFields.filter((field) => project.item.hasOwnProperty(field)).map((viewField, index) => {
                const yPosition = (index > 0) ?  this.autoTable.previous.finalY : 30;
                let field = project.fields.filter((_) => _.InternalName === viewField)[0];
                let value = project.item[field.InternalName];
                this.addProperty(this.createColumn(field.Title, field.InternalName), value, null, yPosition);
            });
            resolve();
        })
        .catch(reject);
    })
    /**
    * Returns column width based on field type
    * @param type Field type
    */
    private getColumnWidth = (type: string): number => {
        switch (type) {
            case "text": case "note": {
                return 40;
            }
        }
    }
    /**
     *
     * @param value Title value
     * @param yPosition x-axis position
     * @param xPosition y-axis position
     */
    private addDocumentTitle = (value: string, yPosition: number, xPosition: number) => {
        this.setTextColor(51);
        this.setFontSize(FONT_SIZE.xlarge);
        let splitValue = this.splitTextToSize(value, 270);
        this.text(splitValue, xPosition, yPosition);
        this.setFontSize(FONT_SIZE.medium);
        this.text(`${moment(new Date()).format("DD. MMM YYYY - HH:mm")}`, this.MARGIN_LEFT, yPosition + 15);
        this.setDrawColor(153, 168, 173);
        this.line(this.MARGIN_LEFT, yPosition + 20, 280, yPosition + 20);
    }
    /**
     *
     * @param column ITableColumn
     * @param value Title value
     * @param comment Optional comment
     * @param yPosition x-axis position
     */
    private addProperty = (column: ITableColumn, value: string, comment?: string, yPosition?: number) => {
        const settings  = {
            theme: "plain",
            startY: yPosition,
            styles: {
                columnWidth: "auto",
                fontSize: 10,
                overflow: "linebreak",
                tableWidth: 200,
            },
            columnStyles: {
                Comment: {columnWidth: 200},
            },
        };
        let item = {};
        item[column.dataKey] = value;
        this.autoTable([column], [item], settings);
        if (comment) {
            const commentSettings  = {
                theme: "plain",
                startY: this.autoTable.previous.finalY - 8,
                styles: {
                    columnWidth: "auto",
                    fontSize: 10,
                    overflow: "linebreak",
                    tableWidth: 200,
                },
                columnStyles: {
                    Comment: {columnWidth: 200},
                },
                drawHeaderCell : (cell, data) => {
                    return false;
                },
            };
            let commentColumn = this.createColumn("Comment", "Comment");
            item["Comment"] = comment;
            this.autoTable([commentColumn], [item], commentSettings);
        }
    }
    /**
     *
     * @param value Title value
     * @param yPosition x-axis position
     * @param xPosition y-axis position
     */
    private addPageTitle = (value: string, yPosition: number, xPosition: number) => {
        this.setTextColor(51);
        this.setFontSize(FONT_SIZE.large);
        this.text(value, xPosition, 20);
    }
    /**
    * Create new autotable column
    * @param title string
    * @param key string
    * @param type string
    */
    private createColumn = (title: string, key: string, type?: string): ITableColumn => {
        let column: ITableColumn = {
            title: title,
            dataKey: key,
            type: type,
        };
        return column;
    }
    /**
    * Fetches required list section data
    * @param section Section used for fetching list data
    */
    private fetchData = (section: SectionModel) => new Promise<any>((resolve, reject) => {
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
            let columns: Array<ITableColumn> = validViewFields.map(vf => {
                const [field] = _fields.get_data().filter(lf => lf.get_internalName() === vf);
                return this.createColumn(field.get_title(), field.get_internalName(), field.get_typeAsString().toLowerCase());
            });
            let items = _items.get_data().map(i => i.get_fieldValuesAsText().get_fieldValues());
            resolve({items, columns});
        }, reject);
    })
    /**
     * Fetch data. Config, fields and project frontpage data.
     * @param {string} configList Configuration list
     */
    private fetchProjectData = (project: IProject, configList = __("Lists_ProjectConfig_Title")) => new Promise<Partial<any>>((resolve, reject) => {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;

        const configPromise = rootWeb
            .lists
            .getByTitle(configList)
            .items
            .select("Title", "GtPcProjectStatus")
            .get();

        Promise.all([configPromise])
            .then(([config]) => {
                let itemFieldNames = Object.keys(project.item);
                const properties = itemFieldNames
                    .filter(fieldName => {
                        const [field] = project.fields.filter(({ InternalName }) => InternalName === fieldName);
                        if (!field) {
                            return false;
                        }
                        const [configItem] = config.filter(c => c.Title === field.Title);
                        if (!configItem) {
                            return false;
                        }
                        const shouldBeShown = configItem["GtPcProjectStatus"] === true;
                        const valueIsString = typeof project.item[fieldName] === "string";
                        return (valueIsString && shouldBeShown);
                    })
                    .map(fieldName => ({
                        field: project.fields.filter(({ InternalName }) => InternalName === fieldName)[0],
                        value: project.item[fieldName],
                    }))
                    .map(({ field, value }) => {
                        return { value: value, field: this.createColumn(field.Title, field.InternalName, field.TypeAsString.toLowerCase()) };
                    });
                resolve({
                    properties: properties,
                });
            })
            .catch(reject);
    })
    /**
     * Get project item and fields
     */
    private fetchProject = () => new Promise<any>((resolve, reject) => {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const fieldsPromise = rootWeb
            .contentTypes
            .getById(__("ContentTypes_Prosjektforside_ContentTypeId"))
            .fields
            .select("Title", "Description", "InternalName", "Required", "TypeAsString")
            .get();

        const itemPromise = new Web(_spPageContextInfo.webAbsoluteUrl)
            .lists
            .getByTitle(__("Lists_SitePages_Title"))
            .items
            .getById(3)
            .fieldValuesAsText
            .get();
         Promise.all([itemPromise, fieldsPromise])
         .then(([item, fields]) => resolve({item, fields}))
         .catch(reject);
    })
    /**
     * @param {any} canvas
     */
    private addImageToCanvas = (canvas: any) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const imgWidth = this.IMAGE_WIDTH;
        const pageHeight = this.pageHeight;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 30;
        this.addImage(imgData, "PNG", this.MARGIN_LEFT, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            this.addPage();
            this.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
    }
}


