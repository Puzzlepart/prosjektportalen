const _ = {
    "1033": require("../Resources/en-US.json"),
    "1044": require("../Resources/no-NB.json"),
};

export default class Localization {
    private webLanguage: number;
    private globalFunction: string;

    /**
     * Constructor
     *
     * @param webLanguage Web language
     * @param globalFunction Global function to register
     */
    constructor(webLanguage: number, globalFunction: string) {
        this.webLanguage = webLanguage;
        this.globalFunction = globalFunction;
    }

    /**
     * Register global function
     */
    public registerGlobal() {
        window[this.globalFunction] = (key: string) => {
            return _[this.webLanguage.toString()][key];
        };
    }
}
