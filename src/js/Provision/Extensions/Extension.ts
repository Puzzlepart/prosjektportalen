import { Schema } from "sp-pnp-provisioning/lib/schema";

export default class Extension {
    public Title?: string;
    public Filename?: string;
    public FileRef?: string;
    public IsEnabled?: boolean;
    public IsValid?: boolean;
    public Schema?: Schema;

    constructor(title: string, filename: string, fileRef: string, isEnabled: boolean) {
        this.Title = title;
        this.Filename = filename;
        this.FileRef = fileRef;
        this.IsEnabled = isEnabled;
    }
}
