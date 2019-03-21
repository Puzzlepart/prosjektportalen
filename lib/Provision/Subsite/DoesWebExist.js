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
const sp_1 = require("@pnp/sp");
/**
 * Checks if the web exists
 *
 * @param {string} siteServerRelativeUrl Url
 */
function DoesWebExist(siteServerRelativeUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!siteServerRelativeUrl || siteServerRelativeUrl.length === 0) {
            return false;
        }
        let web = new sp_1.Web(`${_spPageContextInfo.siteAbsoluteUrl}/${siteServerRelativeUrl}`);
        try {
            yield web.get();
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.default = DoesWebExist;
