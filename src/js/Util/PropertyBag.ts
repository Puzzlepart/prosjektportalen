export const GetAllProperties = (url = _spPageContextInfo.siteAbsoluteUrl) => new Promise<SP.PropertyValues>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const ctx = new SP.ClientContext(url);
        const propertyBag = ctx.get_web().get_allProperties();
        ctx.load(propertyBag);
        ctx.executeQueryAsync(() => {
            resolve(propertyBag);
        }, reject);
    });
});

export const GetProperty = (key: string, url = _spPageContextInfo.siteAbsoluteUrl) => new Promise<string>((resolve, reject) => {
    GetAllProperties(url)
        .then(properties => resolve(properties.get_item(key)))
        .catch(reject);
});
