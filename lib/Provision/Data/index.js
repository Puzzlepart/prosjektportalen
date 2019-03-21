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
const Util = require("../../Util");
const Files_1 = require("./Files");
const Items_1 = require("./Items");
const ProvisionError_1 = require("../ProvisionError");
/**
 * Copies list content (items or files) from source to destination for the specified list
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 */
function Copy(context, conf) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Util.ensureTaxonomy();
        try {
            if (conf.DestinationLibrary) {
                yield Files_1.CopyFiles(context, conf);
            }
            else {
                yield Items_1.CopyItems(context, conf);
            }
        }
        catch (err) {
            throw err;
        }
    });
}
/**
 * Copies default data from source to destination
 *
 * @param {IProvisionContext} context Provisioning context
 */
function CopyDefaultData(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { IncludeContent } = context.model;
        logging_1.Logger.log({ message: "(CopyDefaultData) Starting copy of default data.", data: { IncludeContent }, level: 1 /* Info */ });
        try {
            for (let i = 0; i < IncludeContent.length; i++) {
                yield Copy(context, IncludeContent[i]);
            }
        }
        catch (err) {
            throw new ProvisionError_1.default(err, "CopyDefaultData");
        }
    });
}
exports.CopyDefaultData = CopyDefaultData;
