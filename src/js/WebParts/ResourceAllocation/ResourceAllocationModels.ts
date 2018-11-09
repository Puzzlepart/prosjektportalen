import * as moment from "moment";

/**
 * Interface: IProjectReference
 */
export interface IProjectReference {
    name: string;
    url: string;
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
 * Class: ProjectResource
 */
export class ProjectResource {
    public role: string;
    public name: string;
    public user: ProjectUser;

    /**
     * Creates a new ProjectResource class
     *
     * @param {IParsedSearchResult} searchResult Search result
     */
    constructor(searchResult: any) {
        this.role = searchResult.RefinableString72;
        this.name = searchResult.RefinableString71;
    }
}

/**
 * Class: ProjectResourceAllocation
 */
export class ProjectResourceAllocation {
    public project: IProjectReference;
    public start_time: moment.Moment;
    public end_time: moment.Moment;
    public load: number;
    public resource: ProjectResource;
    public user: ProjectUser;

    /**
     * Creates a new ProjectResourceAllocation class
     *
     * @param {IParsedSearchResult} searchResult Search result
     */
    constructor(searchResult: any) {
        this.project = { name: searchResult.SiteTitle, url: searchResult.SPWebUrl };
        this.start_time = moment(new Date(searchResult.GtStartDateOWSDATE));
        this.end_time = moment(new Date(searchResult.GtEndDateOWSDATE));
        this.load = Math.round(parseFloat(searchResult.GtResourceLoadOWSNMBR) * 100);
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
