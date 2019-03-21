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
const Resources_1 = require("../../../../Resources");
const moment = require("moment");
const html2canvas = require("html2canvas");
const sp_1 = require("@pnp/sp");
const SectionModel_1 = require("../../Section/SectionModel");
const JsPdfWithAutoTable_1 = require("./JsPdfWithAutoTable");
const FONT_SIZE_1 = require("./FONT_SIZE");
class PDFExport {
    constructor(sections, layout = "l", font = "Segoe UI") {
        this.MARGIN_LEFT = 14;
        this.IMAGE_WIDTH = 270;
        /**
         * Add document title
         *
         * @param {string} value Value
         * @param {number} yPosition Y position
         * @param {number} xPosition X postion
         */
        this.addDocumentTitle = (value, yPosition, xPosition) => {
            this.jspdf.setTextColor(51);
            this.jspdf.setFontSize(FONT_SIZE_1.default.xlarge);
            let splitValue = this.jspdf.splitTextToSize(value, 270);
            this.jspdf.text(splitValue, xPosition, yPosition);
            this.jspdf.setFontSize(FONT_SIZE_1.default.medium);
            this.jspdf.text(`${moment(new Date()).format("DD. MMM YYYY - HH:mm")}`, this.MARGIN_LEFT, yPosition + 15);
            this.jspdf.setDrawColor(153, 168, 173);
            this.jspdf.line(this.MARGIN_LEFT, yPosition + 20, 280, yPosition + 20);
        };
        /**
         * Add property
         *
         * @param {ITableColumn} column Table column
         * @param {string} value Value
         * @param {string} comment Comment
         * @param {number} yPosition Y position
         */
        this.addProperty = (column, value, comment, yPosition) => {
            const tableWidth = 200;
            const settings = {
                theme: "plain",
                startY: yPosition,
                styles: {
                    columnWidth: "auto",
                    fontSize: FONT_SIZE_1.default.small,
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
                        fontSize: FONT_SIZE_1.default.small,
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
        };
        /**
         * Add page title
         *
         * @param {string} value Value
         * @param {number} yPosition Y position
         * @param {number} xPosition X postion
         * @param {number} textColor Text color
         */
        this.addPageTitle = (value, yPosition, xPosition, textColor = 51) => {
            this.jspdf.setTextColor(textColor);
            this.jspdf.setFontSize(FONT_SIZE_1.default.large);
            this.jspdf.text(value, xPosition, 20);
        };
        /**
         * Create column
         *
         * @param {string} title Title
         * @param {string} key Key
         * @param {string} type Type (optional)
         */
        this.createColumn = (title, key, type) => {
            let column = {
                title: title,
                dataKey: key,
                type: type,
            };
            return column;
        };
        /**
         * Fetch data
         *
         * @param {SectionModel} section Section
         */
        this.fetchDataForSection = (section) => new Promise((resolve, reject) => {
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
                let columns = validViewFields.map(vf => {
                    const [field] = _fields.get_data().filter(lf => lf.get_internalName() === vf);
                    return this.createColumn(field.get_title(), field.get_internalName(), field.get_typeAsString().toLowerCase());
                });
                let items = _items.get_data().map(i => i.get_fieldValuesAsText().get_fieldValues());
                resolve({ items, columns });
            }, reject);
        });
        /**
         * Fetch project data
         *
         * @param {IProject} project The project
         * @param {string} configListTitle Config list title
         */
        this.fetchProjectData = (project, configListTitle = Resources_1.default.getResource("Lists_ProjectConfig_Title")) => new Promise((resolve, reject) => {
            const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
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
        });
        this.jspdf = new JsPdfWithAutoTable_1.default(layout);
        this.jspdf.setFont(font);
        this.sections = sections;
        this.generateBlob = this.generateBlob.bind(this);
    }
    /**
     * Generate blob
     */
    generateBlob() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addProjectPropertiesPage();
            yield this.addStatusSection();
            for (let i = 0; i < this.sections.length; i++) {
                let section = this.sections[i];
                if (section.showRiskMatrix && section.showAsSection) {
                    yield this.addPageWithImage("risk-matrix", Resources_1.default.getResource("ProjectStatus_PDFRiskMatrix"));
                }
                if (section.listTitle && section.showAsSection) {
                    yield this.addPageWithList(section);
                }
                if ((section.sectionType === SectionModel_1.SectionType.ProjectPropertiesSection) && section.showAsSection) {
                    yield this.addProjectPropertiesSection(section);
                }
                if (section.customComponent) {
                    yield this.addPageWithImage(section.getHtmlElementId("inner"), section.name);
                }
            }
            const blob = this.jspdf.output("blob");
            return blob;
        });
    }
    /**
     * Add project properties page
     */
    addProjectPropertiesPage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addDocumentTitle(`${Resources_1.default.getResource("String_StatusReport")}: ${_spPageContextInfo.webTitle}`, 15, this.MARGIN_LEFT);
            const project = yield this.fetchProject();
            this.addProperty(this.createColumn(Resources_1.default.getResource("SiteFields_GtOverallStatus_DisplayName"), "GtOverallStatus"), project.item.GtOverallStatus, null, 40);
            const data = yield this.fetchProjectData(project);
            data.properties
                .filter(prop => prop.value)
                .forEach(prop => this.addProperty(prop.field, prop.value, null, this.jspdf.autoTable.previous.finalY));
            return;
        });
    }
    /**
     * Add status section
     */
    addStatusSection() {
        this.jspdf.addPage();
        this.sections
            .filter((section) => section.showInStatusSection)
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
    addPageWithList(section) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.fetchDataForSection(section);
            if (data.items.length) {
                this.jspdf.addPage();
                this.addPageTitle(section.name, 15, this.MARGIN_LEFT);
                const settings = {
                    startY: 30,
                    styles: {
                        columnWidth: "auto",
                        fontSize: FONT_SIZE_1.default.xsmall,
                        overflow: "linebreak",
                        tableWidth: "auto",
                    },
                    createdCell: (cell, element) => {
                        element.column.widthStyle = 40;
                    },
                };
                this.jspdf.autoTable(data.columns, data.items, settings);
            }
        });
    }
    /**
     * Add page with image
     *
     * @param {string} imageId Image id
     * @param {string} pageTitle Page title
     */
    addPageWithImage(imageId, pageTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElement = document.getElementById(imageId);
            if (imageElement !== null) {
                const imageCanvas = yield html2canvas(imageElement);
                this.jspdf.addPage();
                this.addPageTitle(pageTitle, 15, this.MARGIN_LEFT);
                this.addImageToCanvas(imageCanvas);
            }
        });
    }
    /**
    * Add project properties section
    *
    * @param {SectionModel} section Section
    */
    addProjectPropertiesSection(section) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.fetchProject();
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
        });
    }
    /**
     * Fetch projects
     */
    fetchProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
            const fieldsPromise = rootWeb
                .contentTypes
                .getById(Resources_1.default.getResource("ContentTypes_Prosjektegenskaper_ContentTypeId"))
                .fields
                .select("Title", "Description", "InternalName", "Required", "TypeAsString")
                .get();
            const itemPromise = new sp_1.Web(_spPageContextInfo.webAbsoluteUrl)
                .lists
                .getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"))
                .items
                .getById(1)
                .fieldValuesAsText
                .get();
            try {
                const [item, fields] = yield Promise.all([itemPromise, fieldsPromise]);
                return ({ item, fields });
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Add image to canvas
     *
     * @param {any} canvas The canvas
     */
    addImageToCanvas(canvas) {
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
exports.default = PDFExport;
