import { Schema } from "sp-pnp-provisioning/lib/schema";

export default interface ITemplateFile {
    FileRef: string;
    Title: string;
    GtIsDefault: boolean;
    GtIsEnabled: boolean;
    Schema: Schema;
}

