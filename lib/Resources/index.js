"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class Resources {
    constructor() {
        this._res = {
            1033: require("./en-US.json"),
            1044: require("./no-NB.json"),
        };
    }
    /**
     * Get the resource with the specified key
     *
     * @param {string} resKey Resource key
     * @param {number} language Language
     */
    getResource(resKey, lcid = _spPageContextInfo.webLanguage) {
        const dict = this.getResources(lcid);
        return dict ? dict[resKey] : "";
    }
    /**
     * Get all resources for the specified language
     *
     * @param {number} language Language
     */
    getResources(lcid = _spPageContextInfo.webLanguage) {
        const dict = this._res[lcid];
        return dict;
    }
};
