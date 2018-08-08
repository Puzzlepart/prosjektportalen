import * as moment from "moment";



/**
 * Interface: IProjectReference
 */
export interface IProjectReference {
    name: string;
    url: string;
}


/**
 * Class: SPBaseItem
 */
export class SPBaseItem {
    public url: string;
    public webId: string;
    public itemId: number;

    /**
     * Creates a new SPBaseItem class
     */
    constructor(url: string, webId: string, itemId: number) {
        this.url = url;
        this.webId = webId;
        this.itemId = itemId;
    }
}

/**
 * Class: ProjectResource
 */
export class ProjectResource extends SPBaseItem {
    public role: string;
    public name: string;
    public user: ProjectUser;

     /**
     * Creates a new ProjectResourceAllocation class
     *
     * @param {SPBaseItem} item Item base
     * @param {string} role Role
     * @param {string} name Name
     */
    constructor(item: SPBaseItem, role: string, name: string) {
        super(item.url, item.webId, item.itemId);
        this.role = role;
        this.name = name;
    }
}

/**
 * Class: ProjectResourceAllocation
 */
export class ProjectResourceAllocation extends SPBaseItem {
    public project: IProjectReference;
    public resourceId: number;
    public start_time: moment.Moment;
    public end_time: moment.Moment;
    public load: number;
    public approved: boolean;
    public resource: ProjectResource;
    public user: ProjectUser;

    /**
     * Creates a new ProjectResourceAllocation class
     *
     * @param {SPBaseItem} item Item base
     * @param {IProjectReference} project Project reference
     * @param {number} resourceId Resource ID
     * @param {moment.Moment} start_time Start time
     * @param {moment.Moment} end_time End time
     * @param {number} load Resource load in percent
     * @param {boolean} approved Approved
     */
    constructor(item: SPBaseItem, project: IProjectReference, resourceId: number, start_time: moment.Moment, end_time: moment.Moment, load: number, approved: boolean) {
        super(item.url, item.webId, item.itemId);
        this.project = project;
        this.resourceId = resourceId;
        this.start_time = start_time;
        this.end_time = end_time;
        this.load = load;
        this.approved = approved;
    }

    /**
     * Returns a string representation of the class
     */
    public toString(): string {
        return `${this.resource.role} - ${this.load}% - ${this.project.name}`;
    }
}

/**
 * Class: ProjectUser
 */
export class ProjectUser {
    public id: number;
    public name: string;
    public allocations: Array<ProjectResourceAllocation>;

    /**
     * Creates a new ProjectUser class
     *
     * @param {number} id ID
     * @param {string} name Name
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.allocations = [];
    }
}
