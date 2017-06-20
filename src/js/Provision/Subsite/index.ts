import { Site } from "sp-pnp-js";

import ICreateWebResult from "./ICreateWebResult";
import DoesWebExist from "./DoesWebExist";
import SetSharedNavigation from "./SetSharedNavigation";

/**
 * Creates a new subsite
 *
 * @param title Title
 * @param url Url
 * @param description Description
 * @param inheritPermissions Inherit permissions
 */
const CreateWeb = (title: string, url: string, description: string, inheritPermissions: boolean) => new Promise<ICreateWebResult>((resolve, reject) => {
    let site = new Site(_spPageContextInfo.siteAbsoluteUrl);
    site.rootWeb.webs.add(title, url, description, "STS#0", process.env.LANGUAGE, inheritPermissions)
        .then(result => {
            url = result.data.Url;
            let redirectUrl = inheritPermissions ? url : String.format("{0}/_layouts/15/permsetup.aspx?next={1}", url, encodeURIComponent(url));
            SetSharedNavigation(url)
                .then(() => {
                    resolve({
                        web: result.web,
                        url: url,
                        redirectUrl: redirectUrl,
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
