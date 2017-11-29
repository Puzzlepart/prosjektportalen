import Extension from "../Provision/Extensions/Extension";
import ListConfig from "../Provision/Data/Config/ListConfig";

export interface IProjectModel {
    Title?: string;
    Url?: string;
    Description?: string;
    InheritPermissions?: boolean;
    IncludeContent?: ListConfig[];
    Extensions?: Extension[];
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
    public IncludeContent?: ListConfig[];
    public Extensions?: Extension[];
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
            this.IncludeContent = [];
            this.Extensions = [];
        }
    }
}
