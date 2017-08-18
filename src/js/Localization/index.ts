const _ = {
    "1033": require("../Resources/en-US.json"),
    "1044": require("../Resources/no-NB.json"),
};

export default class Localization {
    private webLanguage: number;

    /**
     * Constructor
     *
     * @param webLanguage Web language
     */
    constructor(webLanguage: number) {
        this.webLanguage = webLanguage;
    }

    /**
     * Register global function
     */
    public registerGlobalScope(globalFunction: string) {
        window[globalFunction] = (key: string) => {
            return _[this.webLanguage.toString()][key];
        };
    }
}
