import { getClientContext } from "../Util";

/**
 * Get property values from the web property bag
 *
 * @param url URL for the web
 */
export const GetAllProperties = (url = _spPageContextInfo.siteAbsoluteUrl) => new Promise<SP.PropertyValues>((resolve, reject) => {
    getClientContext(url).then(ctx => {
        const propertyBag = ctx.get_web().get_allProperties();
        ctx.load(propertyBag);
        ctx.executeQueryAsync(() => {
            resolve(propertyBag.get_fieldValues());
        }, reject);
    });
});

/**
 * Get property value for the provided key from the web property bag
 *
 * @param key Property key
 * @param url URL for the web
 */
export const GetProperty = (key: string, url = _spPageContextInfo.siteAbsoluteUrl) => new Promise<string>((resolve, reject) => {
    GetAllProperties(url)
        .then(properties => resolve(properties[key]))
        .catch(reject);
});
