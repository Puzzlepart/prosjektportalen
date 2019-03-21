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
const Util = require("../../../Util");
/**
 * Get context for source and destination
 *
 * @param {ListConfig} conf Configuration
 * @param {string} destUrl Destination web URL
 * @param {string} viewXml View XML
 */
function GetDataContext(conf, destUrl, viewXml = "<View></View>") {
    return __awaiter(this, void 0, void 0, function* () {
        yield Util.getClientContext(_spPageContextInfo.siteAbsoluteUrl);
        let camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(viewXml);
        let ctx = {
            CamlQuery: camlQuery,
            Source: { _: new SP.ClientContext(conf.SourceUrl) },
            Destination: { _: new SP.ClientContext(destUrl) },
            loadAndExecuteQuery: (clCtx, clObj = []) => new Promise((res, rej) => {
                clObj.forEach(obj => clCtx.load(obj));
                clCtx.executeQueryAsync(res, (sender, args) => {
                    rej({ sender, args });
                });
            }),
        };
        ctx.Source.list = ctx.Source._.get_web().get_lists().getByTitle(conf.SourceList);
        ctx.Destination.list = ctx.Destination._.get_web().get_lists().getByTitle(conf.DestinationList);
        return ctx;
    });
}
exports.default = GetDataContext;
