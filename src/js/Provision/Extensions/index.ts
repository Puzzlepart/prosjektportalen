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
async function ApplyExtensions(context: IProvisionContext): Promise<void> {
    context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingExtensions"), "");
    try {
        const activatedExtensions = await GetActivatedExtensions(context);
        const extensions = [...activatedExtensions, ...context.model.Extensions];
        const webProvisioner = new WebProvisioner(context.web);
        for (let i = 0; i < extensions.length; i++) {
            const extension = extensions[i];
            context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingExtensions"), extension.Title);
            await webProvisioner.applyTemplate(extension.Schema);
            await UpdatePropertyArray("pp_installed_extensions", extension.Filename, ",", context.url);
        }
        return;
    } catch (err) {
        throw new ProvisionError(err, "ApplyExtensions");
    }
}

export { ApplyExtensions };
