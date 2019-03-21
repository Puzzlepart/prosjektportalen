/**
 * Get property values from the web property bag
 *
 * @param {string} url URL for the webb
 */
export declare function GetAllProperties(url?: string): Promise<any>;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} url URL for the web
 */
export declare function GetProperty(key: string, url?: string): Promise<string>;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} delimiter Delimiter
 * @param {string} url URL for the web
 */
export declare function GetPropertyAsArray(key: string, delimiter?: string, url?: string): Promise<any[]>;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} valueToAdd Value to add to the array
 * @param {string} delimiter Delimiter
 * @param {string} url URL for the web
 */
export declare function UpdatePropertyArray(key: string, valueToAdd: string, delimiter?: string, url?: string): Promise<boolean>;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} value Property value
 * @param {string} url URL for the web
 */
export declare function SetProperty(key: string, value: string, url?: string): Promise<void>;
