import RESOURCE_MANAGER from "localization";
import * as pnp from "sp-pnp-js";
import IDynamicPortfolioConfiguration, { IDynamicPortfolioViewConfig, IDynamicPortfolioColumnConfig, IDynamicPortfolioRefinerConfig, IStatusFieldsConfig } from "./IDynamicPortfolioConfiguration";
import { loadJsonConfiguration } from "../../../Util";
/**
 * Get config from lists
 *
 * @param {string} orderBy Order by property
 */
export async function getConfig(orderBy = "GtDpOrder"): Promise<IDynamicPortfolioConfiguration> {
    const lists = pnp.sp.web.lists;
    const [fields, refiners, views, statusFields] = await Promise.all([
        lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DynamicPortfolioFields_Title"))
            .items
            .orderBy(orderBy)
            .usingCaching()
            .get(),
        lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DynamicPortfolioRefiners_Title"))
            .items
            .orderBy(orderBy)
            .usingCaching()
            .get(),
        lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DynamicPortfolioViews_Title"))
            .items
            .filter(`((GtDpPersonalView eq 0) or (GtDpPersonalView eq 1 and Author/Id eq ${_spPageContextInfo.userId}))`)
            .expand("GtDpFieldsLookup", "GtDpRefinersLookup", "GtDpGroupByLookup", "Author")
            .select("ID", "GtDpDisplayName", "GtDpSearchQuery", "GtDpIcon", "GtDpDefault", "GtDpFieldsLookup/GtDpDisplayName", "GtDpRefinersLookup/GtDpDisplayName", "GtDpGroupByLookup/GtDpDisplayName", "Author/Id")
            .orderBy(orderBy)
            .usingCaching()
            .get(),
        loadJsonConfiguration<IStatusFieldsConfig>("status-fields"),
    ]);
    return {
        columns: fields.map(col => ({
            name: col.GtDpDisplayName,
            key: col.GtDpProperty,
            fieldName: col.GtDpProperty,
            readOnly: col.GtDpReadOnly,
            render: col.GtDpRender,
            minWidth: col.GtDpMinWidth,
            maxWidth: col.GtDpMaxWidth,
            isResizable: col.GtDpIsResizable,
            groupBy: col.GtDpGroupBy,
        })),
        refiners: refiners.map(ref => ({
            name: ref.GtDpDisplayName,
            key: ref.GtDpProperty,
            fieldName: ref.GtDpProperty,
            multi: ref.GtDpMultiple,
            defaultHidden: ref.GtDpDefaultHidden,
            iconName: ref.GtDpIcon,
        })),
        views: views.map(({ ID, GtDpDisplayName, GtDpSearchQuery, GtDpIcon, GtDpDefault, GtDpFieldsLookup, GtDpRefinersLookup, GtDpGroupByLookup }) => ({
            id: ID,
            name: GtDpDisplayName,
            queryTemplate: GtDpSearchQuery,
            iconName: GtDpIcon,
            default: GtDpDefault,
            fields: GtDpFieldsLookup.results.map(({ GtDpDisplayName: lookupValue }) => lookupValue),
            refiners: GtDpRefinersLookup.results.map(({ GtDpDisplayName: lookupValue }) => lookupValue),
            groupBy: GtDpGroupByLookup.GtDpDisplayName || null,
        })),
        statusFields,
    };
}

export {
    IDynamicPortfolioConfiguration,
    IDynamicPortfolioViewConfig,
    IDynamicPortfolioColumnConfig,
    IDynamicPortfolioRefinerConfig,
    IStatusFieldsConfig,
};

