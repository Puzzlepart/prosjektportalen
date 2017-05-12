export interface IProjectModel {
    Title?: string;
    Url?: string;
    Description?: string;
    InheritPermissions?: boolean;
    IncludeContent?: string[];
    ProjectPhase?: string;
    ProjectPhaseLetter?: string;
    ProjectOwner?: string;
    ProjectManager?: string;
}

export class ProjectModel implements IProjectModel {
    public Title?: string;
    public Url?: string;
    public Description?: string;
    public InheritPermissions?: boolean;
    public IncludeContent?: string[];
    public ProjectPhase?: string;
    public ProjectPhaseLetter?: string;
    public ProjectOwner?: string;
    public ProjectManager?: string;

    constructor(obj?) {
        if (obj) {
            this.Title = obj.Title;
            this.Url = obj.Url;
            this.Description = obj.Description || "";
            this.InheritPermissions = obj.InheritPermissions;
            this.IncludeContent = obj.IncludeContent;
        }
    }
}
