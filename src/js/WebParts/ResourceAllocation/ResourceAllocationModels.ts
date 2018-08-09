import * as moment from "moment";

export interface ISPBaseItem {
     url: string;
     webId: string;
     itemId: number;
}

export interface IParsedSearchResult extends ISPBaseItem {
    contentTypeId: string;
    webTitle: string;
    webUrl: string;
    start: moment.Moment;
    end: moment.Moment;
    load?: any;
    name: string;
    role: string;
    approved: boolean;
    resourceId: number;
}

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
     * Creates a new ProjectResource class
     *
     * @param {IParsedSearchResult} searchResult Search result
     */
    constructor(searchResult: IParsedSearchResult) {
        super(searchResult.url, searchResult.webId, searchResult.itemId);
        this.role = searchResult.role;
        this.name = searchResult.name;
    }
}


/**
 * Class: ProjectResourceAvailability
 */
export class ProjectResourceAvailability {
    public name: string;
    public start_time: moment.Moment;
    public end_time: moment.Moment;
    public load: number;
    public absence: string;
    public user: ProjectUser;

    /**
     * Creates a new ProjectResourceAvailability class
     *
     * @param {any} spListItem SP list item
     */
    constructor(spListItem: any) {
        this.name = spListItem.GtResourceUser.Title;
        this.start_time = moment(new Date(spListItem.GtStartDate));
        this.end_time = moment(new Date(spListItem.GtEndDate));
        this.load = spListItem.GtResourceLoad * 100;
        this.absence = spListItem.GtResourceAbsence;
    }

    /**
     * Returns a string representation of the class
     */
    public toString(): string {
        return `${this.absence} (${this.load}%)`;
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
     * @param {IParsedSearchResult} searchResult Search result
     */
    constructor(searchResult: IParsedSearchResult) {
        super(searchResult.url, searchResult.webId, searchResult.itemId);
        this.project = { name: searchResult.webTitle, url: searchResult.webUrl };
        this.resourceId = searchResult.resourceId;
        this.start_time = searchResult.start;
        this.end_time = searchResult.end;
        this.load = searchResult.load;
        this.approved = searchResult.approved;
    }

    /**
     * Returns a string representation of the class
     */
    public toString(): string {
        return `${this.resource.role} - ${this.project.name} (${this.load}%)`;
    }
}

/**
 * Class: ProjectUser
 */
export class ProjectUser {
    public id: number;
    public name: string;
    public allocations: Array<ProjectResourceAllocation>;
    public availability: Array<ProjectResourceAvailability>;

    /**
     * Creates a new ProjectUser class
     *
     * @param {number} id ID
     * @param {string} name Name
     * @param {Array<ProjectResourceAllocation>} allocations Allocations
     * @param {Array<ProjectResourceAvailability>} availability Availability
     */
    constructor(id: number, name: string, allocations = [], availability = []) {
        this.id = id;
        this.name = name;
        this.allocations = allocations;
        this.availability = availability;
    }
}
