import { Site, Web } from "sp-pnp-js";

export interface ICreateResult {
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
    const ctx = new SP.ClientContext(url);
    ctx.get_web().get_navigation().set_useShared(true);
    ctx.executeQueryAsync(resolve, reject);
});

/**
 * Creates a new subsite
 *
 * @param title Title
 * @param url Url
 * @param description Description
 * @param inheritPermissions Inherit permissions
 */
const Create = (title: string, url: string, description: string, inheritPermissions: boolean): Promise<ICreateResult> => new Promise<ICreateResult>((resolve, reject) => {
    let site = new Site(_spPageContextInfo.siteAbsoluteUrl);
    site.rootWeb.webs.add(title, url, description, "STS#0", 1044, inheritPermissions).then(result => {
        url = result.data.Url;
        let redirectUrl = inheritPermissions ? url : String.format("{0}/_layouts/15/permsetup.aspx?next={1}", url, encodeURIComponent(url));
        SetSharedNavigation(url).then(() => {
            resolve({
                web: result.web,
                url: url,
                redirectUrl: redirectUrl,
            });
        }).catch(reject);
    }).catch(({ data: { responseBody }, message, status }) => {
        reject(responseBody["odata.error"].message.value);
    });
});

export { Create };
