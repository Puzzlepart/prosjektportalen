import Extension from "./Extension";
/**
 * Loads extension JSON
 *
 * @param {any} fileInfo The extension file
 */
declare function LoadExtension(fileInfo: any): Promise<Extension>;
export default LoadExtension;
