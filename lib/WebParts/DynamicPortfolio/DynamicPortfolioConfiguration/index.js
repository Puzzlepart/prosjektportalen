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
const Resources_1 = require("../../../Resources");
const sp_1 = require("@pnp/sp");
const Util_1 = require("../../../Util");
/**
 * Get fields config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
function getFieldsConfig(orderBy, configWeb) {
    return configWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DynamicPortfolioFields_Title"))
        .items
        .orderBy(orderBy)
        .usingCaching()
        .get();
}
exports.getFieldsConfig = getFieldsConfig;
/**
 * Get refiner config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
function getRefinersConfig(orderBy, configWeb) {
    return configWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DynamicPortfolioRefiners_Title"))
        .items
        .orderBy(orderBy)
        .usingCaching()
        .get();
}
exports.getRefinersConfig = getRefinersConfig;
/**
 * Get view config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
function getViewsConfig(orderBy, configWeb) {
    return configWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DynamicPortfolioViews_Title"))
        .items
        .filter(`((GtDpPersonalView eq 0) or (GtDpPersonalView eq 1 and Author/Id eq ${_spPageContextInfo.userId}))`)
        .expand("GtDpFieldsLookup", "GtDpRefinersLookup", "GtDpGroupByLookup", "Author")
        .select("ID", "GtDpDisplayName", "GtDpSearchQuery", "GtDpIcon", "GtDpDefault", "GtDpFieldsLookup/GtDpOrder", "GtDpFieldsLookup/GtDpDisplayName", "GtDpRefinersLookup/GtDpOrder", "GtDpRefinersLookup/GtDpDisplayName", "GtDpGroupByLookup/GtDpDisplayName", "Author/Id")
        .orderBy(orderBy)
        .usingCaching()
        .get();
}
exports.getViewsConfig = getViewsConfig;
/**
 * Get config from lists
 *
 * @param {string} orderBy Order by property
 * @param {string} configWebUrl URL for config lists
 */
function getConfig(orderBy = "GtDpOrder", configWebUrl = _spPageContextInfo.siteAbsoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const configWeb = new sp_1.Web(configWebUrl);
        const [dpFields, dpRefiners, dpViews, statusFields] = yield Promise.all([
            getFieldsConfig(orderBy, configWeb),
            getRefinersConfig(orderBy, configWeb),
            getViewsConfig(orderBy, configWeb),
            Util_1.loadJsonConfiguration("status-fields"),
        ]);
        const columns = dpFields.map(fld => {
            return {
                name: fld.GtDpDisplayName,
                key: fld.GtDpProperty,
                fieldName: fld.GtDpProperty,
                readOnly: fld.GtDpReadOnly,
                render: fld.GtDpRender,
                minWidth: fld.GtDpMinWidth,
                maxWidth: fld.GtDpMaxWidth,
                isResizable: fld.GtDpIsResizable,
                groupBy: fld.GtDpGroupBy,
            };
        });
        const refiners = dpRefiners.map(ref => {
            return {
                name: ref.GtDpDisplayName,
                key: ref.GtDpProperty,
                fieldName: ref.GtDpProperty,
                multi: ref.GtDpMultiple,
                defaultHidden: ref.GtDpDefaultHidden,
                iconName: ref.GtDpIcon,
            };
        });
        const views = dpViews.map(view => {
            let fieldsLookupItems = [];
            let refinersLookupItems = [];
            if (view.GtDpFieldsLookup.hasOwnProperty("results")) {
                fieldsLookupItems = view.GtDpFieldsLookup.results;
            }
            else {
                fieldsLookupItems = view.GtDpFieldsLookup;
            }
            if (view.GtDpRefinersLookup.hasOwnProperty("results")) {
                refinersLookupItems = view.GtDpRefinersLookup.results;
            }
            else {
                refinersLookupItems = view.GtDpRefinersLookup;
            }
            const viewFields = fieldsLookupItems
                .sort((a, b) => a.GtDpOrder - b.GtDpOrder)
                .map(item => item.GtDpDisplayName);
            const viewRefiners = refinersLookupItems
                .sort((a, b) => a.GtDpOrder - b.GtDpOrder)
                .map(item => item.GtDpDisplayName);
            const viewGroupBy = view.GtDpGroupByLookup ? view.GtDpGroupByLookup.GtDpDisplayName : null;
            return {
                id: view.ID,
                name: view.GtDpDisplayName,
                queryTemplate: view.GtDpSearchQuery,
                iconName: view.GtDpIcon,
                default: view.GtDpDefault,
                fields: viewFields,
                refiners: viewRefiners,
                groupBy: viewGroupBy,
            };
        });
        return { columns, refiners, views, statusFields };
    });
}
exports.getConfig = getConfig;
