import * as PropertyBag from "./PropertyBag";

/**
 * Stamps version in the specified container
 *
 * @param {string} containerId DOM container
 * @param {string} versionKey Prop bag key
 * @param {string} prefix Prefix
 * @param {number} spacingBottom Spacing bottom in px
 */
export default async function StampVersion(containerId: string, versionKey: string, prefix = "v", spacingBottom = 20): Promise<void> {
    const versionString = await PropertyBag.GetProperty(versionKey);
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML += `<div class='ms-metadata' style='font-size: 10px; position: fixed; bottom: ${spacingBottom}px; left 15px;'>${prefix}${versionString}</div>`;
    }
}
