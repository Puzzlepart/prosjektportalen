export default class SectionModel {
    public Order: number;
    public Title: string;
    public Icon: string;
    public List: string;
    public ViewQuery: string;
    public ViewFields: string[];
    public FieldName: string;
    public ShowRiskMatrix: boolean;

    constructor(obj: any) {
        this.Order = obj.StatusSectionsOrder;
        this.Title = obj.Title;
        this.Icon = obj.StatusSectionsIcon;
        this.List = obj.StatusSectionsList;
        this.ViewQuery = obj.StatusSectionsViewQuery;
        this.ViewFields = obj.StatusSectionsViewFields ? obj.StatusSectionsViewFields.split(",") : null;
        this.FieldName = obj.StatusSectionsFieldName;
        this.ShowRiskMatrix = obj.StatusSectionsShowRiskMatrix;
    }
}