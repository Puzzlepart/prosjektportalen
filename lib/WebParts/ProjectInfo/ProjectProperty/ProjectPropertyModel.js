"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectPropertyModel {
    constructor(field, value) {
        this.internalName = field.InternalName;
        this.displayName = field.Title;
        this.description = field.Description;
        this.value = value;
        this.type = field.TypeAsString;
        this.required = field.Required;
        this.empty = value === "";
    }
}
exports.default = ProjectPropertyModel;
