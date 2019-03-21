"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
class RiskElementModel {
    constructor(id, title, probability, consequence, probabilityPostAction, consequencePostAction) {
        this.id = id;
        this.title = title;
        this.probability = parseInt(probability, 10);
        this.consequence = parseInt(consequence, 10);
        this.probabilityPostAction = parseInt(probabilityPostAction, 10);
        this.consequencePostAction = parseInt(consequencePostAction, 10);
        const listDefaultViewUrl = `${_spPageContextInfo.webAbsoluteUrl}/${Resources_1.default.getResource("DefaultView_Uncertainties_Url")}`;
        this.url = `${listDefaultViewUrl.replace("AllItems", "DispForm")}?ID=${this.id}`;
    }
    getKey(postfix) {
        const key = ["RiskElement", this.webId, this.id, postfix].filter(p => p).join("_");
        return key;
    }
}
exports.default = RiskElementModel;
