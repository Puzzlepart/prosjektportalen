import Extension from "../Provision/Extensions/Extension";
import ListConfig from "../Provision/Data/Config/ListConfig";
import ListProjectType from "../Provision/Data/ProjectTypes/ListProjectType";

export class ProjectModel {
    public Title?: string;
    public Url?: string;
    public Description?: string;
    public InheritPermissions?: boolean;
    public IncludeContent?: ListConfig[];
    public IncludeProjectTypes?: ListProjectType[];
    public Extensions?: Extension[];

    constructor() {
        this.Title = "";
        this.Url = "";
        this.Description = "";
        this.InheritPermissions = false;
    }
}
