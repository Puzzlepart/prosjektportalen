import { Site } from "sp-pnp-js";

import ICreateWebResult from "./ICreateWebResult";
import DoesWebExist from "./DoesWebExist";
import SetSharedNavigation from "./SetSharedNavigation";

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
const CreateWeb = (title: string, url: string, description: string, inheritPermissions: boolean) => new Promise<ICreateWebResult>((resolve, reject) => {
    let site = new Site(_spPageContextInfo.siteAbsoluteUrl);
    site.rootWeb.webs.add(title, url, description, "STS#0", process.env.LANGUAGE, inheritPermissions)
        .then(result => {
            url = result.data.Url;
            SetSharedNavigation(url)
                .then(() => {
                    resolve({
                        web: result.web,
                        url: url,
                        redirectUrl: GetRedirectUrl(url, inheritPermissions),
                    });
                })
                .catch(reject);
        })
        .catch(reject);
});

export {
    ICreateWebResult,
    DoesWebExist,
    SetSharedNavigation,
    CreateWeb,
};
