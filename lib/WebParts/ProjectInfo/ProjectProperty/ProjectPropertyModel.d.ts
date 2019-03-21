export default class ProjectPropertyModel {
    internalName: string;
    displayName: string;
    value?: string;
    description?: string;
    type?: string;
    empty?: boolean;
    required?: any;
    constructor(field: any, value: string);
}
