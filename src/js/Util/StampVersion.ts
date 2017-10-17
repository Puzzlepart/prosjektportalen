import * as PropertyBag from "./PropertyBag";

/**
 * Stamps version in the specified container
 *
 * @param {string} containerId DOM container
 * @param {string} versionKey Prop bag key
 */
const StampVersion = (containerId: string, versionKey: string): void => {
    getVersion(versionKey)
        .then(version => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = String.format("<span class='ms-metadata' style='font-size: 10px; position: fixed; bottom: 20px; left 15px;'>v{0}</span>", version);
            }
        });
};

/**
 * Get version from web property bag
 *
 * @param {string} versionKey Prop bag key
 */
const getVersion = (versionKey: string) => new Promise<string>((resolve, reject) => {
    PropertyBag.GetAllProperties(_spPageContextInfo.webAbsoluteUrl)
        .then(props => {
            let e = Object.keys(props).filter(key => key === versionKey);
            if (e.length === 1) {
                resolve(props[versionKey]);
            } else {
                reject();
            }
        })
        .catch(reject);
});

export default StampVersion;
