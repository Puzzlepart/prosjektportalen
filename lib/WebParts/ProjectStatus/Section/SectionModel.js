"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util = require("../../../Util");
const Resources_1 = require("../../../Resources");
var SectionType;
(function (SectionType) {
    SectionType[SectionType["StatusSection"] = 0] = "StatusSection";
    SectionType[SectionType["RiskSection"] = 1] = "RiskSection";
    SectionType[SectionType["ProjectPropertiesSection"] = 2] = "ProjectPropertiesSection";
    SectionType[SectionType["ListSection"] = 3] = "ListSection";
})(SectionType = exports.SectionType || (exports.SectionType = {}));
class SectionModel {
    /**
     * Constructor
     *
     * @param {any} obj Section object
     * @param {any} project Project properties
     * @param {IStatusFieldsConfig} statusFieldsConfig Status fields config
     */
    constructor(obj, project, statusFieldsConfig) {
        this.sectionType = this.getSectionTypeFromContentType(obj.ContentTypeId);
        this.name = obj.Title;
        this.iconName = obj.GtStSecIcon;
        this.source = obj.GtStSecSource;
        this.listTitle = obj.GtStSecList;
        this.viewQuery = obj.GtStSecViewQuery;
        this.viewFields = obj.GtStSecViewFields ? obj.GtStSecViewFields.split(",") : [];
        this.rowLimit = obj.GtStSecRowLimit;
        this.fieldName = obj.GtStSecFieldName;
        this.showRiskMatrix = obj.GtStSecShowRiskMatrix;
        this.showInNavbar = obj.GtStSecShowInNavbar;
        this.showInStatusSection = obj.GtStSecShowInStatusSection;
        this.showAsSection = obj.GtStSecShowAsSection;
        this.customComponent = obj.GtStSecCustomComponent;
        this.statusProperties = {};
        if (this.sectionType === SectionType.RiskSection) {
            this.listTitle = Resources_1.default.getResource("Lists_Uncertainties_Title");
            this.fieldName = "GtStatusRisk";
        }
        this.commentFieldName = `${this.fieldName}Comment`;
        if (this.fieldName) {
            if (project && project.hasOwnProperty(this.fieldName)) {
                this.statusValue = project[this.fieldName];
            }
            if (project && project.hasOwnProperty(this.commentFieldName)) {
                this.statusComment = project[this.commentFieldName];
            }
            if (statusFieldsConfig && statusFieldsConfig.hasOwnProperty(this.fieldName)) {
                const [statusProperties] = statusFieldsConfig[this.fieldName].statuses.filter(({ statusValue }) => this.statusValue === statusValue);
                if (statusProperties) {
                    this.statusProperties = statusProperties;
                }
            }
        }
    }
    /**
     * Get type
     *
     * @param {string} contentTypeId Content type id
     */
    getSectionTypeFromContentType(contentTypeId) {
        if (contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82802") !== -1) {
            return SectionType.StatusSection;
        }
        if (contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82803") !== -1) {
            return SectionType.ProjectPropertiesSection;
        }
        if (contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82804") !== -1) {
            return SectionType.RiskSection;
        }
        if (contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82805") !== -1) {
            return SectionType.ListSection;
        }
    }
    getHtmlElementId(element) {
        if (element) {
            return `section-${Util.cleanString(this.name)}-${element}`;
        }
        else {
            return `section-${Util.cleanString(this.name)}`;
        }
    }
    /**
     * Checks if section is valid
     */
    isValid() {
        return (this.statusValue !== "" && this.statusValue !== null) || this.sectionType === SectionType.ListSection;
    }
}
exports.default = SectionModel;
