"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../Resources");
const sp_1 = require("@pnp/sp");
const ListConfig_1 = require("./ListConfig");
exports.ListConfig = ListConfig_1.default;
/**
 * Retrieve list content configuration fron list
 */
function RetrieveConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const list = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_ListContentConfig_Title"));
        const configItems = yield list.items.get();
        return configItems.map(item => new ListConfig_1.default(item, "GtLcc"));
    });
}
exports.RetrieveConfig = RetrieveConfig;
