"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
var ProjectAllocationType;
(function (ProjectAllocationType) {
    ProjectAllocationType[ProjectAllocationType["Absence"] = 0] = "Absence";
    ProjectAllocationType[ProjectAllocationType["ProjectAllocation"] = 1] = "ProjectAllocation";
})(ProjectAllocationType = exports.ProjectAllocationType || (exports.ProjectAllocationType = {}));
class ProjectResourceAllocation {
    /**
     * Creates a new ProjectResourceAllocation2 class
     */
    constructor(name, start_time, end_time, allocationPercentage, type, workDescription, workComment) {
        this.name = name;
        this.start_time = moment(new Date(start_time));
        this.end_time = moment(new Date(end_time));
        this.allocationPercentage = Math.round(parseFloat(allocationPercentage) * 100);
        this.type = type;
        this.workDescription = workDescription !== "DispForm.aspx" ? workDescription : "";
        this.workComment = workComment;
    }
    /**
     * Returns a string representation of the class
     */
    toString() {
        if (this.type === ProjectAllocationType.ProjectAllocation) {
            return `${this.role} - ${this.project.name} (${this.allocationPercentage}%)`;
        }
        else {
            return `${this.absence} (${this.allocationPercentage}%)`;
        }
    }
}
exports.ProjectResourceAllocation = ProjectResourceAllocation;
/**
 * Class: ProjectUser
 */
class ProjectUser {
    /**
     * Creates a new ProjectUser class
     *
     * @param {number} id ID
     * @param {string} name Name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.allocations = [];
    }
}
exports.ProjectUser = ProjectUser;
