export enum SectionType {
    StatusSection,
    RiskSection,
    EconomySection,
    ListSection,
}

export default class SectionModel {
    public name: string;
    public iconName: string;
    public source: string;
    public listTitle: string;
    public viewQuery: string;
    public viewFields: string[];
    public fieldName: string;
    public showRiskMatrix: boolean;
    public showInNavbar: boolean;
    public statusValue: string;
    public statusComment?: string;
    private contentTypeId: string;

    /**
     * Constructor
     *
     * @param obj Section object
     * @param projet Project properties
     */
    constructor(obj: any, project: any) {
        this.name = obj.Title;
        this.iconName = obj.GtStSecIcon;
        this.source = obj.GtStSecSource;
        this.listTitle = obj.GtStSecList;
        this.viewQuery = obj.GtStSecViewQuery;
        this.viewFields = obj.GtStSecViewFields ? obj.GtStSecViewFields.split(",") : [];
        this.fieldName = obj.GtStSecFieldName;
        this.showRiskMatrix = obj.GtStSecShowRiskMatrix;
        this.showInNavbar = obj.GtStSecShowInNavbar;
        this.contentTypeId = obj.ContentTypeId;

        if (this.getType() === SectionType.RiskSection) {
            this.listTitle = "Usikkerhet";
            this.fieldName = "GtStatusRisk";
        }

        if (this.getType() === SectionType.EconomySection) {
            this.fieldName = "GtStatusBudget";
        }

        this.statusValue = project.hasOwnProperty(this.fieldName) ? project[this.fieldName] : "";
        this.statusComment = project.hasOwnProperty(`${this.fieldName}Comment`) ? project[`${this.fieldName}Comment`] : "";
    }

    /**
     * Get type
     */
    public getType(): SectionType {
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82802") !== -1) {
            return SectionType.StatusSection;
        }
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82803") !== -1) {
            return SectionType.EconomySection;
        }
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82804") !== -1) {
            return SectionType.RiskSection;
        }
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82805") !== -1) {
            return SectionType.ListSection;
        }
    }

    /**
     * Checks if section is valid
     */
    public isValid(): boolean {
        return this.statusValue !== "" && this.statusValue !== null;
    }
}
