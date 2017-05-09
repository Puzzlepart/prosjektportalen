import * as pnp from "sp-pnp-js";

export interface IColumnConfig {
    name: string;
    key: string;
    fieldName: string;
    default: boolean;
    readOnly: boolean;
    render: string;
    minWidth?: number;
    maxWidth?: number;
    isResizable?: boolean;
}

export interface IRefinerConfig {
    name: string;
    key: string;
    fieldName: string;
    multi: boolean;
    defaultHidden: boolean;
    iconName: string;
}

export interface IViewConfig {
    name: string;
    queryTemplate: string;
    iconName: any;
    default: boolean;
    fields?: any[];
    refiners?: any[];
}

/**
 * Get config from lists
 */
export const getConfig = () => new Promise<{ columnConfig: IColumnConfig[], refinerConfig: IRefinerConfig[], viewConfig: IViewConfig[] }>((resolve, reject) => {
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
            .expand("GtDpFieldsLookup", "GtDpRefinersLookup")
            .select("GtDpDisplayName", "GtDpSearchQuery", "GtDpIcon", "GtDpDefault", "GtDpFieldsLookup/GtDpDisplayName", "GtDpRefinersLookup/GtDpDisplayName")
            .orderBy("GtDpOrder")
            .get(),
    ]).then(([fields, refiners, views]) => {
        resolve({
            columnConfig: fields.map(col => ({
                name: col.GtDpDisplayName,
                key: col.GtDpProperty,
                fieldName: col.GtDpProperty,
                default: col.GtDpDefault,
                readOnly: col.GtDpReadOnly,
                render: col.GtDpRender,
                minWidth: col.GtDpMinWidth,
                maxWidth: col.GtDpMaxWidth,
                isResizable: col.GtDpIsResizable,
            })),
            refinerConfig: refiners.map(ref => ({
                name: ref.GtDpDisplayName,
                key: ref.GtDpProperty,
                fieldName: ref.GtDpProperty,
                multi: ref.GtDpMultiple,
                defaultHidden: ref.GtDpDefaultHidden,
                iconName: ref.GtDpIcon,
            })),
            viewConfig: views.map(({ GtDpDisplayName, GtDpSearchQuery, GtDpIcon, GtDpDefault, GtDpFieldsLookup, GtDpRefinersLookup }) => ({
                name: GtDpDisplayName,
                queryTemplate: GtDpSearchQuery,
                iconName: GtDpIcon,
                default: GtDpDefault,
                fields: GtDpFieldsLookup.results.map(({ GtDpDisplayName: lookupValue }) => lookupValue),
                refiners: GtDpRefinersLookup.results.map(({ GtDpDisplayName: lookupValue }) => lookupValue),
            })),
        });
    }).catch(reject);
});
