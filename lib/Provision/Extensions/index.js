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
const webprovisioner_1 = require("sp-js-provisioning/lib/webprovisioner");
const PropertyBag_1 = require("../../Util/PropertyBag");
const GetActivatedExtensions_1 = require("./GetActivatedExtensions");
const ProvisionError_1 = require("../ProvisionError");
/**
 * Apply extensions
 *
 * @param {IProvisionContext} context Provisioning context
 */
function ApplyExtensions(context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activatedExtensions = yield GetActivatedExtensions_1.default(context);
            const extensions = [...activatedExtensions, ...context.model.Extensions];
            if (extensions.length > 0) {
                context.progressCallbackFunc(Resources_1.default.getResource("ProvisionWeb_ApplyingExtensions"), "");
                for (let i = 0; i < extensions.length; i++) {
                    const extension = extensions[i];
                    context.progressCallbackFunc(Resources_1.default.getResource("ProvisionWeb_ApplyingExtensions"), extension.Title);
                    yield new webprovisioner_1.WebProvisioner(context.web).applyTemplate(extension.Schema);
                    yield PropertyBag_1.UpdatePropertyArray("pp_installed_extensions", extension.Filename, ",", context.url);
                }
            }
        }
        catch (err) {
            throw new ProvisionError_1.default(err, "ApplyExtensions");
        }
    });
}
exports.ApplyExtensions = ApplyExtensions;
