import IProvisionContext from "../IProvisionContext";
import Extension from "./Extension";
/**
 * Get activated extensions
 *
 * @param {IProvisionContext} context Provisioning context
 */
export default function GetActivatedExtensions(context: IProvisionContext): Promise<Extension[]>;
