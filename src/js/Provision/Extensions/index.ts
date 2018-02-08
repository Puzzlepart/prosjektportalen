import RESOURCE_MANAGER from "../../@localization";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import { UpdatePropertyArray } from "../../Util/PropertyBag";
import GetActivatedExtensions from "./GetActivatedExtensions";
import IProvisionContext from "../IProvisionContext";
import ProvisionError from "../ProvisionError";

/**
 * Apply extensions
 *
 * @param {IProvisionContext} context Provisioning context
 */
export async function ApplyExtensions(context: IProvisionContext): Promise<void> {
    try {
        const activatedExtensions = await GetActivatedExtensions(context);
        const extensions = [...activatedExtensions, ...context.model.Extensions];
        if (extensions.length > 0) {
            context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingExtensions"), "");
            for (let i = 0; i < extensions.length; i++) {
                const extension = extensions[i];
                context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingExtensions"), extension.Title);
                await new WebProvisioner(context.web).applyTemplate(extension.Schema);
                await UpdatePropertyArray("pp_installed_extensions", extension.Filename, ",", context.url);
            }
        }
    } catch (err) {
        throw new ProvisionError(err, "ApplyExtensions");
    }
}
