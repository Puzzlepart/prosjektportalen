import { Schema } from "sp-js-provisioning/lib/schema";
export default interface ITemplateFile {
    FileRef: string;
    Title: string;
    Comments: string;
    GtIsDefault: boolean;
    GtIsEnabled: boolean;
    Schema: Schema;
}
