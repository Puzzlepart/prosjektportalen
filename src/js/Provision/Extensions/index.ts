import RESOURCE_MANAGER from "localization";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import IProgressCallback from "../IProgressCallback";
import GetValidExtensions from "./GetValidExtensions";
import ProvisionError from "../ProvisionError";

/**
 * Apply extensions
 *
 * @param {any} web The web
 * @param {IProgressCallback} onUpdateProgress
 */
async function ApplyExtensions(web: any, onUpdateProgress: IProgressCallback): Promise<void> {
    try {
        const extensions = await GetValidExtensions();
        await extensions.reduce((chain, extension) => chain.then(___ => {
            onUpdateProgress(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingExtensions"), extension.Title);
            return new WebProvisioner(web).applyTemplate(extension.data);
        }), Promise.resolve());
        return;
    } catch (err) {
        throw new ProvisionError(err, "ApplyExtensions");
    }
}

export { ApplyExtensions };
