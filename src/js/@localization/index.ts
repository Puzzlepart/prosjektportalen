export default new class Localization {
    private __resources = {
        1033: require("../Resources/en-US.json"),
        1044: require("../Resources/no-NB.json"),
    };

    /**
     * Get the resource with the specified key
     *
     * @param {string} key Key
     * @param {number} language Language
     */
    public getResource(key: string, language = _spPageContextInfo.webLanguage): string {
        const dict = this.__resources[language];
        return dict ? dict[key] : "";
    }
};

