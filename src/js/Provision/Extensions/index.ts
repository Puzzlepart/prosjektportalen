import RESOURCE_MANAGER from "localization";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import GetValidExtensions from "./GetValidExtensions";
import IProvisionContext from "../IProvisionContext";
import ProvisionError from "../ProvisionError";

/**
 * Apply extensions
 *
 * @param {IProvisionContext} context Provisioning context
 */
async function ApplyExtensions(context: IProvisionContext): Promise<void> {
    try {
        const extensions = await GetValidExtensions();
        const webProvisioner = new WebProvisioner(context.webCreationResult.web);
        for (let i = 0; i < extensions.length; i++) {
            context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingExtensions"), extensions[i].Title);
            await webProvisioner.applyTemplate(extensions[i].data);
        }
        return;
    } catch (err) {
        throw new ProvisionError(err, "ApplyExtensions");
    }
}

export { ApplyExtensions };
