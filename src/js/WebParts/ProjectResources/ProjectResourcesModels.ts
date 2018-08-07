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
    public start: Date;
    public end: Date;
    public load: number;
    public role: string;
    public userId: number;

    /**
     * Creates a new ProjectResourceAllocation class
     */
    constructor(base: SpBaseItem, project: string, resourceId: number, start: Date, end: Date, load: number) {
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
    public ids: Array<{ project: { url: string, title: string }, id: number }>;
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
