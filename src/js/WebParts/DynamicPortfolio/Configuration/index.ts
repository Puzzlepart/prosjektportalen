import * as pnp from "sp-pnp-js";
import IConfiguration, { IViewConfig, IColumnConfig, IRefinerConfig } from "./IConfiguration";

let STORED_CONFIGURATION: IConfiguration = null;

/**
 * Get config from lists
 */
export const getConfig = () => new Promise<IConfiguration>((resolve, reject) => {
    if (STORED_CONFIGURATION) {
        resolve(STORED_CONFIGURATION);
    } else {
        const lists = pnp.sp.web.lists;
        Promise.all([
            lists.getByTitle("DynamicPortfolioFields")
                .items
                .orderBy("GtDpOrder")
                .get(),
            lists.getByTitle("DynamicPortfolioRefiners")
                .items
                .orderBy("GtDpOrder")
                .get(),
            lists.getByTitle("DynamicPortfolioViews")
                .items
                .filter(`((GtDpPersonalView eq 0) or (GtDpPersonalView eq 1 and AuthorId eq ${_spPageContextInfo.userId}))`)
                .expand("GtDpFieldsLookup", "GtDpRefinersLookup")
                .select("ID", "GtDpDisplayName", "GtDpSearchQuery", "GtDpIcon", "GtDpDefault", "GtDpFieldsLookup/GtDpDisplayName", "GtDpRefinersLookup/GtDpDisplayName")
                .orderBy("GtDpOrder")
                .get(),
        ]).then(([fields, refiners, views]) => {
            STORED_CONFIGURATION = {
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
                views: views.map(({ ID, GtDpDisplayName, GtDpSearchQuery, GtDpIcon, GtDpDefault, GtDpFieldsLookup, GtDpRefinersLookup }) => ({
                    id: ID,
                    name: GtDpDisplayName,
                    queryTemplate: GtDpSearchQuery,
                    iconName: GtDpIcon,
                    default: GtDpDefault,
                    fields: GtDpFieldsLookup.results.map(({ GtDpDisplayName: lookupValue }) => lookupValue),
                    refiners: GtDpRefinersLookup.results.map(({ GtDpDisplayName: lookupValue }) => lookupValue),
                })),
            };
            resolve(STORED_CONFIGURATION);
        }).catch(reject);
    }
});

export { IConfiguration, IViewConfig, IColumnConfig, IRefinerConfig };

