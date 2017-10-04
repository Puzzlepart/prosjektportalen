import { Web } from "sp-pnp-js";

/**
 * Checks if the web exists
 *
 * @param {string} siteServerRelativeUrl Url
 */
export default async function DoesWebExist(siteServerRelativeUrl: string): Promise<boolean> {
    let web = new Web(`${_spPageContextInfo.siteAbsoluteUrl}/${siteServerRelativeUrl}`);
    try {
        await web.get();
        return true;
    } catch (err) {
        return false;
    }
}
