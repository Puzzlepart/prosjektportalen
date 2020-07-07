export default class ProjectPropertyModel {
    public internalName: string;
    public displayName: string;
    public value?: string;
    public description?: string;
    public type?: string;
    public empty?: boolean;
    public required?: any;

    constructor(field, value: string) {
        this.internalName = field.InternalName
        this.displayName = field.Title
        this.description = field.Description
        this.value = value
        this.type = field.TypeAsString
        this.required = field.Required
        this.empty = value === ''
    }
}
