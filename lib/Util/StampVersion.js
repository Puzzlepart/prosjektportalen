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
const PropertyBag = require("./PropertyBag");
/**
 * Stamps version in the specified container
 *
 * @param {string} containerId DOM container
 * @param {string} versionKey Prop bag key
 * @param {string} prefix Prefix
 * @param {number} spacingBottom Spacing bottom in px
 */
function StampVersion(containerId, versionKey, prefix = "v", spacingBottom = 20) {
    return __awaiter(this, void 0, void 0, function* () {
        const versionString = yield PropertyBag.GetProperty(versionKey, _spPageContextInfo.webAbsoluteUrl);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML += `<div class='ms-metadata' style='font-size: 10px; position: fixed; bottom: ${spacingBottom}px; left 15px;'>${prefix}${versionString}</div>`;
        }
    });
}
exports.default = StampVersion;
