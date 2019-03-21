"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Extension {
    constructor(title, comments, filename, fileRef, isEnabled) {
        this.Title = title;
        this.Comments = comments;
        this.Filename = filename;
        this.FileRef = fileRef;
        this.IsEnabled = isEnabled;
    }
}
exports.default = Extension;
