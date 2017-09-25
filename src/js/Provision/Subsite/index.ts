import { Site } from "sp-pnp-js";
import ICreateWebResult from "./ICreateWebResult";
import DoesWebExist from "./DoesWebExist";
import SetSharedNavigation from "./SetSharedNavigation";
import ProvisionError from "../ProvisionError";

/**
 * Get redirect URL. Appends permsetup.aspx if the web has unique permissions
 *
 * @param {string} url Url
 * @param {boolean} inheritPermissions Inherit permissions
 */
const GetRedirectUrl = (url: string, inheritPermissions: boolean): string => {
    return inheritPermissions ? url : String.format("{0}/_layouts/15/permsetup.aspx?next={1}", url, encodeURIComponent(url));
};

/**
 * Creates a new subsite
 *
 * @param {string} title Title
 * @param {string} url Url
 * @param {string} description Description
 * @param {boolean} inheritPermissions Inherit permissions
 */
async function CreateWeb(title: string, url: string, description: string, webLanguage = _spPageContextInfo.webLanguage, inheritPermissions: boolean): Promise<ICreateWebResult> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    try {
        const createWebResult = await rootWeb.webs.add(title, url, description, "STS#0", webLanguage, inheritPermissions);
        await SetSharedNavigation(createWebResult.data.Url);
        return {
            web: createWebResult.web,
            url: createWebResult.data.Url,
            redirectUrl: GetRedirectUrl(createWebResult.data.Url, inheritPermissions),
        };
    } catch (err) {
        throw new ProvisionError(err, "CreateWeb");
    }
}

export {
    ICreateWebResult,
    DoesWebExist,
    SetSharedNavigation,
    CreateWeb,
};
