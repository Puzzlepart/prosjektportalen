import RESOURCE_MANAGER from "../../../@localization";
import { Web } from "sp-pnp-js";
import IDynamicPortfolioConfiguration, { IDynamicPortfolioViewConfig, IDynamicPortfolioColumnConfig, IDynamicPortfolioRefinerConfig, IStatusFieldsConfig } from "./IDynamicPortfolioConfiguration";
import { loadJsonConfiguration } from "../../../Util";

function getFieldsConfig(configWeb: Web, orderBy: string) {
    return configWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DynamicPortfolioFields_Title"))
        .items
        .orderBy(orderBy)
        .usingCaching()
        .get();
}

function getRefinersConfig(configWeb: Web, orderBy: string) {
    return configWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DynamicPortfolioRefiners_Title"))
        .items
        .orderBy(orderBy)
        .usingCaching()
        .get();
}

function getViewsConfig(configWeb: Web, orderBy: string) {
    return configWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DynamicPortfolioViews_Title"))
        .items
        .filter(`((GtDpPersonalView eq 0) or (GtDpPersonalView eq 1 and Author/Id eq ${_spPageContextInfo.userId}))`)
        .expand("GtDpFieldsLookup", "GtDpRefinersLookup", "GtDpGroupByLookup", "Author")
        .select("ID", "GtDpDisplayName", "GtDpSearchQuery", "GtDpIcon", "GtDpDefault", "GtDpFieldsLookup/GtDpDisplayName", "GtDpRefinersLookup/GtDpDisplayName", "GtDpGroupByLookup/GtDpDisplayName", "Author/Id")
        .orderBy(orderBy)
        .usingCaching()
        .get();
}

/**
 * Get config from lists
 *
 * @param {string} orderBy Order by property
 * @param {string} configWebUrl URL for config lists
 */
export async function getConfig(orderBy = "GtDpOrder", configWebUrl = _spPageContextInfo.siteAbsoluteUrl): Promise<IDynamicPortfolioConfiguration> {
    const configWeb = new Web(configWebUrl);
    const [dpFields, dpRefiners, dpViews, statusFields] = await Promise.all([
        getFieldsConfig(configWeb, orderBy),
        getRefinersConfig(configWeb, orderBy),
        getViewsConfig(configWeb, orderBy),
        loadJsonConfiguration<IStatusFieldsConfig>("status-fields"),
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
        } else {
            fieldsLookupItems = view.GtDpFieldsLookup;
        }
        if (view.GtDpRefinersLookup.hasOwnProperty("results")) {
            refinersLookupItems = view.GtDpRefinersLookup.results;
        } else {
            refinersLookupItems = view.GtDpRefinersLookup;
        }
        return {
            id: view.ID,
            name: view.GtDpDisplayName,
            queryTemplate: view.GtDpSearchQuery,
            iconName: view.GtDpIcon,
            default: view.GtDpDefault,
            fields: fieldsLookupItems.map(item => item.GtDpDisplayName),
            refiners: refinersLookupItems.map(item => item.GtDpDisplayName),
            groupBy: view.GtDpGroupByLookup ? view.GtDpGroupByLookup.GtDpDisplayName : null,
        };
    });
    return { columns, refiners, views, statusFields };
}

export {
    IDynamicPortfolioConfiguration,
    IDynamicPortfolioViewConfig,
    IDynamicPortfolioColumnConfig,
    IDynamicPortfolioRefinerConfig,
    IStatusFieldsConfig,
};

