import Extension from '../Provision/Extensions/Extension'
import ListConfig from '../Provision/Data/Config/ListConfig'
import ProjectType from '../Provision/Data/ProjectTypes/ProjectType'

export class ProjectModel {
    public title?: string;
    public url?: string;
    public description?: string;
    public inheritPermissions?: boolean;
    public includeContent?: ListConfig[];
    public extensions?: Extension[];
    public projectType?: ProjectType;

    constructor() {
        this.title = ''
        this.url = ''
        this.description = ''
        this.inheritPermissions = false
    }

    public clone(): ProjectModel {
        return Object.assign(Object.create(this), this)
    }
}
