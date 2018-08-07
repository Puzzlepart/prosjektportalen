import * as moment from "moment";
export class SpBaseItem {
    public webId: string;
    public id: number;

    /**
     * Creates a new SpBaseItem class
     */
    constructor(item: SpBaseItem) {
        this.webId = item.webId;
        this.id = item.id;
    }
}

export class ProjectResourceAllocation extends SpBaseItem {
    public project: string;
    public resourceId: number;
    public start: moment.Moment;
    public end: moment.Moment;
    public load: number;
    public role: string;
    public userId: number;
    public userName: string;

    /**
     * Creates a new ProjectResourceAllocation class
     */
    constructor(base: SpBaseItem, project: string, resourceId: number, start: moment.Moment, end: moment.Moment, load: number) {
        super(base);
        this.project = project;
        this.resourceId = resourceId;
        this.start = start;
        this.end = end;
        this.load = load;
    }

    public getTitle(): string {
        return `${this.role} - ${this.load}% - ${this.project}`;
    }
}

export class ProjectUser {
    public id: number;
    public name: string;
    public allocations: Array<ProjectResourceAllocation>;

    /**
     * Creates a new ProjectUser class
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.allocations = [];
    }
}
