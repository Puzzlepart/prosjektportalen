import { Schema } from "sp-pnp-provisioning/lib/schema";

interface IExtension {
    Title: string;
    LinkFilename: string;
    FileRef: string;
    data?: Schema;
}

export default IExtension;
