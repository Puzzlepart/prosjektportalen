import { Schema } from "sp-js-provisioning/lib/schema";
export default class Extension {
    Title?: string;
    Comments?: string;
    Filename?: string;
    FileRef?: string;
    IsEnabled?: boolean;
    IsValid?: boolean;
    Schema?: Schema;
    constructor(title: string, comments: string, filename: string, fileRef: string, isEnabled: boolean);
}
