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
const logging_1 = require("@pnp/logging");
const ProvisionError_1 = require("../ProvisionError");
/**
 * Get template from templates library
 *
 * @param {IProvisionContext} context Provisioning context
 */
function GetTemplate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let template = context.template;
            const templateFileText = yield context.rootWeb.getFileByServerRelativeUrl(template.FileRef).getText();
            template.Schema = JSON.parse(templateFileText);
            return template;
        }
        catch (err) {
            logging_1.Logger.log({ message: "(GetTemplate) Failed to retrieve or parse template", level: 3 /* Error */ });
            throw new ProvisionError_1.default(err, "GetTemplate");
        }
    });
}
exports.default = GetTemplate;
