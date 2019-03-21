import * as moment from "moment";
/**
 * Interface: IProjectReference
 */
export interface IProjectReference {
    name: string;
    url: string;
}
export declare enum ProjectAllocationType {
    Absence = 0,
    ProjectAllocation = 1
}
export declare class ProjectResourceAllocation {
    name: string;
    start_time: moment.Moment;
    end_time: moment.Moment;
    allocationPercentage: number;
    type: ProjectAllocationType;
    project: IProjectReference;
    role: string;
    absence: string;
    user: ProjectUser;
    workDescription: string;
    workComment: string;
    /**
     * Creates a new ProjectResourceAllocation2 class
     */
    constructor(name: string, start_time: string, end_time: string, allocationPercentage: string, type: ProjectAllocationType, workDescription: any, workComment: any);
    /**
     * Returns a string representation of the class
     */
    toString(): string;
}
/**
 * Class: ProjectUser
 */
export declare class ProjectUser {
    id: number;
    name: string;
    allocations: Array<ProjectResourceAllocation>;
    /**
     * Creates a new ProjectUser class
     *
     * @param {number} id ID
     * @param {string} name Name
     */
    constructor(id: number, name: string);
}
