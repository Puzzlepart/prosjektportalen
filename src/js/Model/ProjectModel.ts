import Extension from "../Provision/Extensions/Extension";
import ListConfig from "../Provision/Data/Config/ListConfig";

export class ProjectModel {
    public Title?: string;
    public Url?: string;
    public Description?: string;
    public InheritPermissions?: boolean;
    public IncludeContent?: ListConfig[];
    public Extensions?: Extension[];

    constructor() {
        this.Title = "";
        this.Url = "";
        this.Description = "";
        this.InheritPermissions = false;
    }
}
