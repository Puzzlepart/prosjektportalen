import { Schema } from "sp-js-provisioning/lib/schema";

export default class Extension {
    public Title?: string;
    public Comments?: string;
    public Filename?: string;
    public FileRef?: string;
    public IsEnabled?: boolean;
    public IsValid?: boolean;
    public Schema?: Schema;

    constructor(title: string, comments: string, filename: string, fileRef: string, isEnabled: boolean) {
        this.Title = title;
        this.Comments = comments;
        this.Filename = filename;
        this.FileRef = fileRef;
        this.IsEnabled = isEnabled;
    }
}
