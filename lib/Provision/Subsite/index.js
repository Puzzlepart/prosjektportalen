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
const DoesWebExist_1 = require("./DoesWebExist");
exports.DoesWebExist = DoesWebExist_1.default;
const SetSharedNavigation_1 = require("./SetSharedNavigation");
exports.SetSharedNavigation = SetSharedNavigation_1.default;
const ProvisionError_1 = require("../ProvisionError");
/**
 * Get redirect URL. Appends permsetup.aspx if the web has unique permissions
 *
 * @param {string} url Url
 * @param {boolean} inheritPermissions Inherit permissions
 */
const GetRedirectUrl = (url, inheritPermissions) => {
    return inheritPermissions ? url : String.format("{0}/_layouts/15/permsetup.aspx?next={1}", url, encodeURIComponent(url));
};
/**
 * Creates a new subsite
 *
 * @param {IProvisionContext} context Provisioning context
 */
function CreateWeb(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.progressCallbackFunc(Resources_1.default.getResource("ProvisionWeb_CreatingWeb"), "");
        const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        try {
            const createWebResult = yield rootWeb.webs.add(context.model.Title, context.model.Url.toLowerCase(), context.model.Description, "STS#0", _spPageContextInfo.webLanguage, context.model.InheritPermissions);
            yield SetSharedNavigation_1.default(createWebResult.data.Url);
            return Object.assign({}, context, { web: createWebResult.web, url: createWebResult.data.Url, redirectUrl: GetRedirectUrl(createWebResult.data.Url, context.model.InheritPermissions) });
        }
        catch (err) {
            throw new ProvisionError_1.default(err, "CreateWeb");
        }
    });
}
exports.CreateWeb = CreateWeb;
