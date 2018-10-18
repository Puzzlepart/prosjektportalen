import { Web } from "@pnp/sp";

/**
 * Checks if the web exists
 *
 * @param {string} siteServerRelativeUrl Url
 */
export default async function DoesWebExist(siteServerRelativeUrl: string): Promise<boolean> {
    if (!siteServerRelativeUrl || siteServerRelativeUrl.length === 0) {
        return false;
    }
    let web = new Web(`${_spPageContextInfo.siteAbsoluteUrl}/${siteServerRelativeUrl}`);
    try {
        await web.get();
        return true;
    } catch (err) {
        return false;
    }
}
