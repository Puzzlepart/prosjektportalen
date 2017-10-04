import RESOURCE_MANAGER from "localization";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import { UpdatePropertyArray } from "../../Util/PropertyBag";
import GetValidExtensions from "./GetValidExtensions";
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
        const extensions = await GetValidExtensions();
        const webProvisioner = new WebProvisioner(context.web);
        for (let i = 0; i < extensions.length; i++) {
            const extensionToApply = extensions[i];
            context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingExtensions"), extensionToApply.Title);
            await webProvisioner.applyTemplate(extensionToApply.data);
            await UpdatePropertyArray("pp_installed_extensions", extensionToApply.LinkFilename, ",", context.url);
        }
        return;
    } catch (err) {
        throw new ProvisionError(err, "ApplyExtensions");
    }
}

export { ApplyExtensions };
