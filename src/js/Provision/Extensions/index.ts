import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import IProgressCallback from "../IProgressCallback";
import GetValidExtensions from "./GetValidExtensions";

/**
 * Apply extensions
 *
 * @param {any} web The web
 * @param {IProgressCallback} onUpdateProgress
 */
const ApplyExtensions = (web: any, onUpdateProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    GetValidExtensions().then(extensions => {
        extensions.reduce((chain, extension) => chain.then(___ => {
            onUpdateProgress(Localization.getResource("ProvisionWeb_ApplyingExtensions"), extension.Title);
            return new WebProvisioner(web).applyTemplate(extension.data);
        }), Promise.resolve())
            .then(resolve)
            .catch(reject);
    });
});

export { ApplyExtensions };
