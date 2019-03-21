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
const jsom_ctx_1 = require("jsom-ctx");
/**
 * Sets shared navigation for the specified web
 *
 * @param {string} url Url
 * @param {boolean} useShared Use shared navigation
 */
function SetSharedNavigation(url, useShared = true) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let jsomCtx = yield jsom_ctx_1.CreateJsomContext(url);
            jsomCtx.web.get_navigation().set_useShared(true);
            yield jsom_ctx_1.ExecuteJsomQuery(jsomCtx);
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = SetSharedNavigation;
