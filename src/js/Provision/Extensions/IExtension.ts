import { Schema } from "sp-pnp-provisioning/lib/schema";

export default interface IExtension {
    Title: string;
    LinkFilename: string;
    FileRef: string;
    data?: Schema;
}

