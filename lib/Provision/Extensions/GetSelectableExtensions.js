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
const LoadExtension_1 = require("./LoadExtension");
/**
 * Get selectable extensions
 */
function GetSelectableExtensions() {
    return __awaiter(this, void 0, void 0, function* () {
        const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const extensionLib = rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_Extensions_Title"));
        try {
            const files = yield extensionLib.items.select("Title", "Comments", "LinkFilename", "FileRef", "GtIsEnabled").filter("GtShowInNewForm eq 1").orderBy("GtOrder").get();
            const extensions = yield Promise.all(files.map(file => LoadExtension_1.default(file)));
            if (extensions && extensions.length) {
                const validExtensions = extensions.filter(ext => ext.IsValid);
                return validExtensions;
            }
            return [];
        }
        catch (err) {
            return [];
        }
    });
}
exports.default = GetSelectableExtensions;
