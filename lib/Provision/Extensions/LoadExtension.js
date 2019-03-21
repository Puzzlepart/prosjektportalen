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
const logging_1 = require("@pnp/logging");
const Extension_1 = require("./Extension");
const ProvisionError_1 = require("../ProvisionError");
const SpListLogger_1 = require("../../Util/SpListLogger");
const spListLogger = new SpListLogger_1.default();
/**
 * Loads extension JSON
 *
 * @param {any} fileInfo The extension file
 */
function LoadExtension(fileInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const fileObject = rootWeb.getFileByServerRelativeUrl(fileInfo.FileRef);
        const extension = new Extension_1.default(fileInfo.Title, fileInfo.Comments, fileInfo.Filename, fileInfo.FileRef, fileInfo.GtIsEnabled);
        try {
            const fileSchemaText = yield fileObject.getText();
            try {
                const data = JSON.parse(fileSchemaText);
                extension.IsValid = true;
                extension.Schema = data;
            }
            catch (e) {
                extension.IsValid = false;
                const logElement = {
                    message: `(LoadExtension) Extensions in file '${extension.Filename}' contains invalid JSON.`,
                    data: { fileSchemaText },
                    level: 2 /* Warning */,
                };
                spListLogger.log(Object.assign({}, logElement, { source: "LoadExtension" }));
                logging_1.Logger.log(logElement);
            }
            return extension;
        }
        catch (err) {
            throw new ProvisionError_1.default(err, "LoadExtension");
        }
    });
}
exports.default = LoadExtension;
