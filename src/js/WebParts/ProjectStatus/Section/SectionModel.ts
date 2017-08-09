export enum SectionType {
    StatusSection,
    RiskSection,
    EconomySection,
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
    private contentTypeId: string;

    /**
     * Constructor
     * 
     * @param obj Object
     */
    constructor(obj: any) {
        this.name = obj.Title;
        this.iconName = obj.StatusSectionsIcon;
        this.source = obj.StatusSectionsSource;
        this.listTitle = obj.StatusSectionsList;
        this.viewQuery = obj.StatusSectionsViewQuery;
        this.viewFields = obj.StatusSectionsViewFields ? obj.StatusSectionsViewFields.split(",") : [];
        this.fieldName = obj.StatusSectionsFieldName;
        this.showRiskMatrix = obj.StatusSectionsShowRiskMatrix;
        this.contentTypeId = obj.ContentTypeId;

        if(this.getType() === SectionType.RiskSection) {
            this.listTitle = "Usikkerhet";
            this.fieldName = "GtStatusRisk";
        }

        if(this.getType() === SectionType.EconomySection) {
            this.fieldName = "GtStatusBudget";
        }
    }
    
    /**
     * Get type
     */
    public getType(): SectionType {
        if(this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82802") !== -1) {
            return SectionType.StatusSection;
        }
        if(this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82803") !== -1) {
            return SectionType.EconomySection;
        }
        if(this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82804") !== -1) {
            return SectionType.RiskSection;
        }
    }
}
