declare const _default: {
    _res: {
        1033: any;
        1044: any;
    };
    /**
     * Get the resource with the specified key
     *
     * @param {string} resKey Resource key
     * @param {number} language Language
     */
    getResource(resKey: string, lcid?: number): string;
    /**
     * Get all resources for the specified language
     *
     * @param {number} language Language
     */
    getResources(lcid?: number): string;
};
export default _default;
