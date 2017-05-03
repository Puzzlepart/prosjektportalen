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

export interface IQueryConfig {
    name: string;
    queryTemplate: string;
    iconName: string;
    default: boolean;
}

/**
 * Get config from lists
 */
export const getConfig = () => new Promise<{ columnConfig: IColumnConfig[], refinerConfig: IRefinerConfig[], queryConfig: IQueryConfig[] }>((resolve, reject) => {
    Promise.all([
        pnp.sp.web.lists.getByTitle("DynamicPortfolioFields").items.orderBy("GtDpOrder").get(),
        pnp.sp.web.lists.getByTitle("DynamicPortfolioRefiners").items.orderBy("GtDpOrder").get(),
        pnp.sp.web.lists.getByTitle("DynamicPortfolioViews").items.orderBy("GtDpOrder").get(),
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
            queryConfig: views.map(qc => ({
                name: qc.GtDpDisplayName,
                queryTemplate: qc.GtDpSearchQuery,
                iconName: qc.GtDpIcon,
                default: qc.GtDpDefault,
            })),
        });
    }).catch(reject);
});
