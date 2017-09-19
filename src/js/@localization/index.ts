export default new class Localization {
    private __resources = {
        1033: require("../Resources/en-US.json"),
        1044: require("../Resources/no-NB.json"),
    };

    public getResource(key: string, language = _spPageContextInfo.webLanguage): string {
        return this.__resources[language][key];
    }
}

