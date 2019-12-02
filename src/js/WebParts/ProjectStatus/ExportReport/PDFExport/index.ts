import __ from "../../../../Resources";
import * as moment from "moment";
import html2canvas from "html2canvas";
import { Site, Web } from "@pnp/sp";
import SectionModel, { SectionType } from "../../Section/SectionModel";
import JsPdfWithAutoTable from "./JsPdfWithAutoTable";
import FONT_SIZE from "./FONT_SIZE";
import IProject from "./IProject";
import ITableColumn from "./ITableColumn";


export default class PDFExport {
    private jspdf: JsPdfWithAutoTable;
    private readonly MARGIN_LEFT = 14;
    private readonly IMAGE_WIDTH = 270;
    private sections: SectionModel[];

    public constructor(sections: SectionModel[], layout: string = "l", font: string = "Segoe UI") {
        this.jspdf = new JsPdfWithAutoTable(layout);
        this.jspdf.setFont(font);
        this.sections = sections;
        this.generateBlob = this.generateBlob.bind(this);
    }

    /**
     * Generate blob
     */
    public async generateBlob(): Promise<Blob> {
        await this.addProjectPropertiesPage();
        await this.addStatusSection();
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.showRiskMatrix && section.showAsSection) {
                await this.addPageWithImage("risk-matrix", __.getResource("ProjectStatus_PDFRiskMatrix"));
            }
            if (section.listTitle && section.showAsSection) {
                await this.addPageWithList(section);
            }
            if ((section.sectionType === SectionType.ProjectPropertiesSection) && section.showAsSection) {
                await this.addProjectPropertiesSection(section);
            }
            if (section.customComponent) {
                await this.addPageWithImage(section.getHtmlElementId("inner"), section.name);
            }
        }
        const blob: Blob = this.jspdf.output("blob");
        return blob;
    }

    /**
     * Add project properties page
     */
    public async addProjectPropertiesPage(): Promise<void> {
        this.addDocumentTitle(`${__.getResource("String_StatusReport")}: ${_spPageContextInfo.webTitle}`, 15, this.MARGIN_LEFT);
        const project = await this.fetchProject();
        this.addProperty(this.createColumn(__.getResource("SiteFields_GtOverallStatus_DisplayName"), "GtOverallStatus"), project.item.GtOverallStatus, null, 40);
        const data = await this.fetchProjectData(project);
        data.properties
            .filter(prop => prop.value)
            .forEach(prop => this.addProperty(prop.field, prop.value, null, this.jspdf.autoTable.previous.finalY));
        return;
    }

    /**
     * Add status section
     */
    public addStatusSection(): void {
        this.jspdf.addPage();
        this.sections
            .filter((section: SectionModel) => section.showInStatusSection)
            .forEach((section, index) => {
                const yPosition = (index > 0) ? this.jspdf.autoTable.previous.finalY : 20;
                this.addProperty(this.createColumn(section.name, section.fieldName), section.statusValue, section.statusComment, yPosition);
            });
    }

    /**
     * Add page with list
     *
     * @param {SectionModel} section Section
     */
    public async addPageWithList(section: SectionModel): Promise<void> {
        const data = await this.fetchDataForSection(section);
        if (data.items.length) {
            this.jspdf.addPage();
            this.addPageTitle(section.name, 15, this.MARGIN_LEFT);
            const settings = {
                startY: 30,
                styles: {
                    columnWidth: "auto",
                    fontSize: FONT_SIZE.xsmall,
                    overflow: "linebreak",
                    tableWidth: "auto",
                },
                createdCell: (cell, element) => {
                    element.column.widthStyle = 40;
                },
            };
            this.jspdf.autoTable(data.columns, data.items, settings);
        }
    }

    /**
     * Add page with image
     *
     * @param {string} imageId Image id
     * @param {string} pageTitle Page title
     */
    public async addPageWithImage(imageId: string, pageTitle: string) {
        const imageElement = document.getElementById(imageId);
        if (imageElement !== null) {
            const imageCanvas = await html2canvas(imageElement);
            this.jspdf.addPage();
            this.addPageTitle(pageTitle, 15, this.MARGIN_LEFT);
            this.addImageToCanvas(imageCanvas);
        }
    }

    /**
    * Add project properties section
    *
    * @param {SectionModel} section Section
    */
    public async addProjectPropertiesSection(section: SectionModel): Promise<void> {
        const project = await this.fetchProject();
        this.jspdf.addPage();
        this.addPageTitle(section.name, 15, this.MARGIN_LEFT);
        section.viewFields
            .filter(field => project.item.hasOwnProperty(field))
            .forEach((viewField, index) => {
                const yPosition = (index > 0) ? this.jspdf.autoTable.previous.finalY : 30;
                let field = project.fields.filter((_) => _.InternalName === viewField)[0];
                let value = project.item[field.InternalName];
                this.addProperty(this.createColumn(field.Title, field.InternalName), value, null, yPosition);
            });
    }

    /**
     * Add document title
     *
     * @param {string} value Value
     * @param {number} yPosition Y position
     * @param {number} xPosition X postion
     */
    private addDocumentTitle = (value: string, yPosition: number, xPosition: number) => {
        this.jspdf.setTextColor(51);
        this.jspdf.setFontSize(FONT_SIZE.xlarge);
        let splitValue = this.jspdf.splitTextToSize(value, 270);
        this.jspdf.text(splitValue, xPosition, yPosition);
        this.jspdf.setFontSize(FONT_SIZE.medium);
        this.jspdf.text(`${moment(new Date()).format("DD. MMM YYYY - HH:mm")}`, this.MARGIN_LEFT, yPosition + 15);
        this.jspdf.setDrawColor(153, 168, 173);
        this.jspdf.line(this.MARGIN_LEFT, yPosition + 20, 280, yPosition + 20);
    }

    /**
     * Add property
     *
     * @param {ITableColumn} column Table column
     * @param {string} value Value
     * @param {string} comment Comment
     * @param {number} yPosition Y position
     */
    private addProperty = (column: ITableColumn, value: string, comment?: string, yPosition?: number) => {
        const tableWidth = 200;
        const settings = {
            theme: "plain",
            startY: yPosition,
            styles: {
                columnWidth: "auto",
                fontSize: FONT_SIZE.small,
                overflow: "linebreak",
                tableWidth: tableWidth,
            },
            columnStyles: {
                Comment: { columnWidth: tableWidth },
            },
        };
        let item = {};
        item[column.dataKey] = value;
        this.jspdf.autoTable([column], [item], settings);
        if (comment) {
            const commentSettings = {
                theme: "plain",
                startY: this.jspdf.autoTable.previous.finalY - 8,
                styles: {
                    columnWidth: "auto",
                    fontSize: FONT_SIZE.small,
                    overflow: "linebreak",
                    tableWidth: tableWidth,
                },
                columnStyles: {
                    Comment: { columnWidth: tableWidth },
                },
                drawHeaderCell: (cell, data) => {
                    return false;
                },
            };
            let commentColumn = this.createColumn("Comment", "Comment");
            item["Comment"] = comment;
            this.jspdf.autoTable([commentColumn], [item], commentSettings);
        }
    }


    /**
     * Add page title
     *
     * @param {string} value Value
     * @param {number} yPosition Y position
     * @param {number} xPosition X postion
     * @param {number} textColor Text color
     */
    private addPageTitle = (value: string, yPosition: number, xPosition: number, textColor = 51) => {
        this.jspdf.setTextColor(textColor);
        this.jspdf.setFontSize(FONT_SIZE.large);
        this.jspdf.text(value, xPosition, 20);
    }

    /**
     * Create column
     *
     * @param {string} title Title
     * @param {string} key Key
     * @param {string} type Type (optional)
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
     * Fetch data
     *
     * @param {SectionModel} section Section
     */
    private fetchDataForSection = (section: SectionModel) => new Promise<any>((resolve, reject) => {
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
            resolve({ items, columns });
        }, reject);
    })


    /**
     * Fetch project data
     *
     * @param {IProject} project The project
     * @param {string} configListTitle Config list title
     */
    private fetchProjectData = (project: IProject, configListTitle = __.getResource("Lists_ProjectConfig_Title")) => new Promise<Partial<any>>((resolve, reject) => {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const configPromise = rootWeb
            .lists
            .getByTitle(configListTitle)
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
     * Fetch projects
     */
    private async fetchProject(): Promise<IProject> {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const fieldsPromise = rootWeb
            .contentTypes
            .getById(__.getResource("ContentTypes_Prosjektegenskaper_ContentTypeId"))
            .fields
            .select("Title", "Description", "InternalName", "Required", "TypeAsString")
            .get();

        const itemPromise = new Web(_spPageContextInfo.webAbsoluteUrl)
            .lists
            .getByTitle(__.getResource("Lists_ProjectProperties_Title"))
            .items
            .getById(1)
            .fieldValuesAsText
            .get();
        try {
            const [item, fields] = await Promise.all([itemPromise, fieldsPromise]);
            return ({ item, fields });
        } catch (err) {
            throw err;
        }
    }

    /**
     * Add image to canvas
     *
     * @param {any} canvas The canvas
     */
    private addImageToCanvas(canvas): void {
        const imgData = canvas.toDataURL("image/jpeg");
        const imgWidth = this.IMAGE_WIDTH;
        const pageHeight = this.jspdf.pageHeight;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 30;
        this.jspdf.addImage(imgData, "PNG", this.MARGIN_LEFT, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            this.jspdf.addPage();
            this.jspdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
    }
}


