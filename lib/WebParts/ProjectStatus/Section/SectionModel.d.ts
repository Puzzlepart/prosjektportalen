import IStatusFieldsConfig, { IStatusProperties } from "../../../Model/Config/IStatusFieldsConfig";
export declare enum SectionType {
    StatusSection = 0,
    RiskSection = 1,
    ProjectPropertiesSection = 2,
    ListSection = 3
}
export default class SectionModel {
    sectionType: SectionType;
    name: string;
    iconName: string;
    source: string;
    listTitle: string;
    viewQuery: string;
    viewFields: string[];
    rowLimit: number;
    fieldName: string;
    commentFieldName: string;
    statusClassName: string;
    showRiskMatrix: boolean;
    showInNavbar: boolean;
    showInStatusSection: boolean;
    showAsSection: boolean;
    customComponent: string;
    statusValue: string;
    statusComment?: string;
    statusProperties?: IStatusProperties;
    /**
     * Constructor
     *
     * @param {any} obj Section object
     * @param {any} project Project properties
     * @param {IStatusFieldsConfig} statusFieldsConfig Status fields config
     */
    constructor(obj: any, project: any, statusFieldsConfig: IStatusFieldsConfig);
    /**
     * Get type
     *
     * @param {string} contentTypeId Content type id
     */
    getSectionTypeFromContentType(contentTypeId: string): SectionType;
    getHtmlElementId(element?: string): string;
    /**
     * Checks if section is valid
     */
    isValid(): boolean;
}
