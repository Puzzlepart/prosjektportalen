import { Schema } from "sp-pnp-provisioning/lib/schema";

export default interface IProvisionTemplate {
    fileRef?: string;
    schema?: Schema;
}
