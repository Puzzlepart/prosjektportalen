export interface IPreferencesParameter {
    _: string;
    $: { Key: string };
}

export default new class Preferences {
    private _preferences = require("./Preferences.json");

    /**
     * Get parameter
     *
     * @param {string} key Key of the parameter
     */
    public getParameter(key: string): string {
        const parameters: IPreferencesParameter[] = this._preferences["pnp:Preferences"]["pnp:Parameters"][0]["pnp:Parameter"];
        const [parameter] = parameters.filter(param => param.$.Key === key);
        if (parameter) {
            return parameter._;
        }
        return "";
    }
};

