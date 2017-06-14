import { Site, Web } from "sp-pnp-js";

export interface ICreateWebResult {
    web: Web;
    url: string;
    redirectUrl: string;
}

/**
 * Sets shared navigation for the specified web
 *
 * @param url Url
 * @param useShared Use shared navigation
 */
const SetSharedNavigation = (url: string, useShared = true): Promise<void> => new Promise<void>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const ctx = new SP.ClientContext(url);
        ctx.get_web().get_navigation().set_useShared(true);
        ctx.executeQueryAsync(resolve, reject);
    });
});

/**
 * Checks if the web exists
 *
 * @param url Url
 */
export const DoesWebExist = (url: string) => new Promise<boolean>((resolve, reject) => {
    let web = new Web(`${_spPageContextInfo.siteAbsoluteUrl}/${url}`);
    web.get()
        .then(_ => resolve(true))
        .catch(_ => resolve(false));
});

/**
 * Creates a new subsite
 *
 * @param title Title
 * @param url Url
 * @param description Description
 * @param inheritPermissions Inherit permissions
 */
export const CreateWeb = (title: string, url: string, description: string, inheritPermissions: boolean) => new Promise<ICreateWebResult>((resolve, reject) => {
    let site = new Site(_spPageContextInfo.siteAbsoluteUrl);
    site.rootWeb.webs.add(title, url, description, "STS#0", 1044, inheritPermissions)
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

