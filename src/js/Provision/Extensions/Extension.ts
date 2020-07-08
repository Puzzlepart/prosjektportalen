import { Schema } from 'sp-js-provisioning/lib/schema'

export default class Extension {
    public Id?: number;
    public Title?: string;
    public Comments?: string;
    public Filename?: string;
    public FileRef?: string;
    public IsEnabled?: boolean;
    public IsValid?: boolean;
    public Schema?: Schema;

    constructor(id: number, title: string, comments: string, filename: string, fileRef: string, isEnabled: boolean) {
        this.Id = id
        this.Title = title
        this.Comments = comments
        this.Filename = filename
        this.FileRef = fileRef
        this.IsEnabled = isEnabled
    }
}
