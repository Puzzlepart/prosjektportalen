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
const logging_1 = require("@pnp/logging");
const webprovisioner_1 = require("sp-js-provisioning/lib/webprovisioner");
const ProvisionError_1 = require("../ProvisionError");
const ApplyTemplateProgressMap_1 = require("./ApplyTemplateProgressMap");
/**
 * Applies the template to the specified web
 *
 * @param {IProvisionContext} context Provisioning context
 */
function ApplyTemplate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.progressCallbackFunc(Resources_1.default.getResource("ProvisionWeb_ApplyingTemplate"), "");
        const callbackFunc = objHandler => context.progressCallbackFunc(Resources_1.default.getResource("ProvisionWeb_ApplyingTemplate"), ApplyTemplateProgressMap_1.default[objHandler]);
        try {
            const template = Object.assign({}, context.template.Schema, { WebSettings: Object.assign({}, context.template.Schema.WebSettings, { AlternateCssUrl: `${context.webProperties.pp_assetssiteurl}/SiteAssets/pp/css/pp.main.css`, SiteLogoUrl: `${context.webProperties.pp_assetssiteurl}/SiteAssets/pp/img/ICO-Site-Project-11.png` }), PropertyBagEntries: [{
                        Key: "pp_version",
                        Value: context.webProperties.pp_version,
                        Overwrite: true,
                        Indexed: true,
                    },
                    {
                        Key: "pp_template",
                        Value: context.template.Title,
                        Overwrite: true,
                        Indexed: true,
                    }] });
            yield new webprovisioner_1.WebProvisioner(context.web).applyTemplate(template, callbackFunc);
            logging_1.Logger.log({ message: "(ApplyTemplate) Template applied successfully", data: {}, level: 1 /* Info */ });
        }
        catch (err) {
            logging_1.Logger.log({ message: "(ApplyTemplate) Failed to apply template", data: {}, level: 3 /* Error */ });
            throw new ProvisionError_1.default(err, "ApplyTemplate");
        }
    });
}
exports.default = ApplyTemplate;
