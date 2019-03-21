import Extension from "../Provision/Extensions/Extension";
import ListConfig from "../Provision/Data/Config/ListConfig";
export declare class ProjectModel {
    Title?: string;
    Url?: string;
    Description?: string;
    InheritPermissions?: boolean;
    IncludeContent?: ListConfig[];
    Extensions?: Extension[];
    constructor();
}
