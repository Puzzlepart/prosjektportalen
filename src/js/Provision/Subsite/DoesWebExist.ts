/**
 * Checks if the web exists
 *
 * @param url Url
 */
const DoesWebExist = (url: string) => new Promise<boolean>((resolve, reject) => {
    let web = new Web(`${_spPageContextInfo.siteAbsoluteUrl}/${url}`);
    web.get()
        .then(_ => resolve(true))
        .catch(_ => resolve(false));
});

export default DoesWebExist;

