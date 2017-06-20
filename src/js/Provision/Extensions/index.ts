import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import IProgressCallback from "../IProgressCallback";
import GetValidExtensions from "./GetValidExtensions";




const ApplyExtensions = (web: any, onProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    GetValidExtensions().then(extensions => {
        extensions.reduce((chain, extension) => chain.then(___ => {
            onProgress(__("ProvisionWeb_ApplyingExtensions"), extension.Title);
            return new WebProvisioner(web).applyTemplate(extension.data);
        }), Promise.resolve())
            .then(resolve)
            .catch(resolve);
    });
});

export { ApplyExtensions };
