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
const Subsite_1 = require("./Subsite");
exports.DoesWebExist = Subsite_1.DoesWebExist;
const Data_1 = require("./Data");
const Template_1 = require("./Template");
const Extensions_1 = require("./Extensions");
const PropertyBag_1 = require("../Util/PropertyBag");
const SpListLogger_1 = require("../Util/SpListLogger");
/**
 * Provisions a project web
 *
 * @param {ProjectModel} model The project model
 * @param {IProgressCallback} progressCallbackFunc Progress callback function
 * @param {ITemplateFile} templateFile Template file
 *
 * @returns {string} Redirect URL
 */
function ProvisionWeb(model, progressCallbackFunc, templateFile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
            let context = { model, progressCallbackFunc, rootWeb, template: templateFile };
            context = yield Subsite_1.CreateWeb(context);
            context.webProperties = yield PropertyBag_1.GetAllProperties();
            context.template = yield Template_1.GetTemplate(context);
            yield Template_1.ApplyTemplate(context);
            yield Extensions_1.ApplyExtensions(context);
            yield Data_1.CopyDefaultData(context);
            return context.redirectUrl;
        }
        catch (err) {
            yield new SpListLogger_1.default().log(Object.assign({}, err, { url: model.Url, level: 3 /* Error */ }));
            throw err;
        }
    });
}
exports.default = ProvisionWeb;
