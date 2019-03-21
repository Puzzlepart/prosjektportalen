"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class Preferences {
    constructor() {
        this._preferences = require("./Preferences.json");
    }
    /**
     * Get parameter
     *
     * @param {string} key Key of the parameter
     */
    getParameter(key) {
        const parameters = this._preferences["pnp:Preferences"]["pnp:Parameters"][0]["pnp:Parameter"];
        const [parameter] = parameters.filter(param => param.$.Key === key);
        if (parameter) {
            return parameter._;
        }
        return "";
    }
};
