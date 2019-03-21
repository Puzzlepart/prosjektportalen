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
const sp_1 = require("@pnp/sp");
/**
 * Query the REST Search API using @pnp/sp. Find all project content types in the specified data source
 *
 * @param {string} dataSourceName Data source name
 * @param {number} rowLimit Row limit
 * @param {Array<string>} selectProperties Select properties
 */
function queryProjects(dataSourceName, rowLimit, selectProperties = []) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dataSourcesList = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DataSources_Title"));
            const [dataSource] = yield dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
            if (dataSource) {
                const { PrimarySearchResults } = yield sp_1.sp.search({
                    Querytext: "*",
                    QueryTemplate: dataSource.GtDpSearchQuery,
                    SelectProperties: ["Path", "SiteTitle", "RefinableString52", "RefinableString53", "RefinableString54", "GtProjectManagerOWSUSER", "GtProjectOwnerOWSUSER", "LastModifiedTime", ...selectProperties],
                    RowLimit: rowLimit,
                    TrimDuplicates: false,
                });
                return PrimarySearchResults;
            }
            else {
                return [];
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.queryProjects = queryProjects;
/**
 * Query the REST Search API using @pnp/sp. Find all webs in the specified data source
 *
 * @param {string} dataSourceName Data source name
 * @param {number} rowLimit Row limit
 */
function queryProjectWebs(dataSourceName, rowLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dataSourcesList = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DataSources_Title"));
            const [dataSource] = yield dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
            if (dataSource) {
                const dataSourceWithWebs = dataSource.GtDpSearchQuery.toString().toUpperCase().replace("CONTENTTYPEID:" + Resources_1.default.getResource("ContentTypes_Prosjektegenskaper_ContentTypeId").toUpperCase() + "*", "contentclass:STS_Web");
                const { PrimarySearchResults } = yield sp_1.sp.search({
                    Querytext: "*",
                    QueryTemplate: dataSourceWithWebs,
                    SelectProperties: ["Title", "Path", "SiteLogo"],
                    RowLimit: rowLimit,
                    TrimDuplicates: false,
                });
                return PrimarySearchResults;
            }
            else {
                return [];
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.queryProjectWebs = queryProjectWebs;
