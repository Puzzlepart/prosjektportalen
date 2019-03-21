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
/**
 * Default Search Settings used for @pnp/sp
 */
exports.DEFAULT_SEARCH_SETTINGS = { Querytext: "*", RowLimit: 500, TrimDuplicates: false };
/**
 * Query the REST Search API using @pnp/sp
 *
 * @param {IDynamicPortfolioViewConfig} viewConfig View configuration
 * @param {IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
 */
function queryProjects(viewConfig, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchResults = yield sp_1.sp.search(Object.assign({}, exports.DEFAULT_SEARCH_SETTINGS, { SelectProperties: configuration.columns.map(f => f.fieldName).concat(["SiteTitle"]), Refiners: configuration.refiners.map(ref => ref.key).join(","), QueryTemplate: viewConfig.queryTemplate }));
            const refinementResults = searchResults.RawSearchResults.PrimaryQueryResult.RefinementResults;
            let refiners = [];
            if (refinementResults) {
                refiners = refinementResults.Refiners;
                if (refiners["results"]) {
                    refiners = refiners["results"];
                }
            }
            return {
                primarySearchResults: searchResults.PrimarySearchResults.map(res => (Object.assign({}, res, { Title: res["SiteTitle"], Path: res.Path.split("/Lists")[0] }))),
                refiners,
            };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.queryProjects = queryProjects;
