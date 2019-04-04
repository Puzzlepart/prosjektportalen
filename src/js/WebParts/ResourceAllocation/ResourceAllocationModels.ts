import * as moment from "moment";

/**
 * Interface: IProjectReference
 */
export interface IProjectReference {
    name: string;
    url: string;
}

export enum ProjectAllocationType {
    Absence,
    ProjectAllocation,
}

export class ProjectResourceAllocation {
    public start_time: moment.Moment;
    public end_time: moment.Moment;
    public allocationPercentage: number;
    public project: IProjectReference;
    public role: string;
    public absence: string;
    public user: ProjectUser;
    public workDescription: string;

    /**
     * Creates a new ProjectResourceAllocation class
     */
    constructor(
        public name: string,
        start_time: string,
        end_time: string,
        allocationPercentage: string,
        public type: ProjectAllocationType,
        workDescription: string,
        public workComment: string,
    ) {

        this.start_time = moment(new Date(start_time));
        this.end_time = moment(new Date(end_time));
        this.allocationPercentage = Math.round(parseFloat(allocationPercentage) * 100);
        this.workDescription = workDescription !== "DispForm.aspx" ? workDescription : "";
    }

    /**
     * Returns a string representation of the class
     */
    public toString(): string {
        if (this.type === ProjectAllocationType.ProjectAllocation) {
            return `${this.role} - ${this.project.name} (${this.allocationPercentage}%)`;
        } else {
            return `${this.absence} (${this.allocationPercentage}%)`;
        }
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
