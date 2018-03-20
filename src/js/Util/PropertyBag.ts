import {
    getJsomContext,
    executeJsom,
} from "../Util";

/**
 * Get property values from the web property bag
 *
 * @param {string} url URL for the webb
 */
export async function GetAllProperties(url = _spPageContextInfo.siteAbsoluteUrl): Promise<any> {
    const { ctx, propertyBag } = await getJsomContext(url);
    await executeJsom(ctx, [propertyBag]);
    return propertyBag.get_fieldValues();
}

/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} url URL for the web
 */
export async function GetProperty(key: string, url = _spPageContextInfo.siteAbsoluteUrl): Promise<string> {
    try {
        const properties = await GetAllProperties(url);
        return properties[key];
    } catch (err) {
        return "";
    }
}

/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} delimiter Delimiter
 * @param {string} url URL for the web
 */
export async function GetPropertyAsArray(key: string, delimiter = ",", url = _spPageContextInfo.siteAbsoluteUrl): Promise<any[]> {
    try {
        const property = await GetProperty(key, url);
        const array = property.split(delimiter);
        return array;
    } catch (err) {
        return [];
    }
}

/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} valueToAdd Value to add to the array
 * @param {string} delimiter Delimiter
 * @param {string} url URL for the web
 */
export async function UpdatePropertyArray(key: string, valueToAdd: string, delimiter = ",", url = _spPageContextInfo.siteAbsoluteUrl): Promise<boolean> {
    try {
        let array = await GetPropertyAsArray(key, delimiter, url);
        array.push(valueToAdd);
        await SetProperty(key, array.join(delimiter), url);
        return true;
    } catch (err) {
        return false;
    }
}



/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} value Property value
 * @param {string} url URL for the web
 */
export async function SetProperty(key: string, value: string, url = _spPageContextInfo.siteAbsoluteUrl): Promise<void> {
    const { ctx, web } = await getJsomContext(url);
    web.get_allProperties().set_item(key, value);
    web.update();
    await executeJsom(ctx);
    return;
}
