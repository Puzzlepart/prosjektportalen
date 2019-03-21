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
const Resources_1 = require("../../Resources");
const sp_1 = require("@pnp/sp");
/**
 * Get selectable template from templates library
 */
function GetSelectableTemplates() {
    return __awaiter(this, void 0, void 0, function* () {
        const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const templatesLib = rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_SiteTemplates_Title"));
        try {
            const selectableTemplates = yield templatesLib
                .items
                .select("Title", "Comments", "FileRef", "GtIsDefault")
                .filter("GtIsEnabled eq 1")
                .orderBy("GtOrder")
                .get();
            return selectableTemplates;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = GetSelectableTemplates;
