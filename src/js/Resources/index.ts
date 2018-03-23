export default new class Localization {
    private _res = {
        1033: require("../en-US.json"),
        1044: require("../no-NB.json"),
    };

    /**
     * Get the resource with the specified key
     *
     * @param {string} resKey Resource key
     * @param {number} language Language
     */
    public getResource(resKey: string, lcid = _spPageContextInfo.webLanguage): string {
        const dict = this.getResources(lcid);
        return dict ? dict[resKey] : "";
    }

    /**
     * Get all resources for the specified language
     *
     * @param {number} language Language
     */
    public getResources(lcid = _spPageContextInfo.webLanguage): string {
        const dict = this._res[lcid];
        return dict;
    }
};

