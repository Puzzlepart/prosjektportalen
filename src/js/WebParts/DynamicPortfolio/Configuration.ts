import * as pnp from "sp-pnp-js";

const COLUMN_CONFIG_CT: string = "0x0100B98DDFB576777B409846155F0D450EB401";
const REFINER_CONFIG_CT: string = "0x0100B98DDFB576777B409846155F0D450EB402";
const QUERY_CONFIG_CT: string = "0x0100B98DDFB576777B409846155F0D450EB403";

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
 *
 * @param configList Configuration list
 */
export const getConfig = (configList = "DynamicPortfolioConfig") => new Promise<{ columnConfig: IColumnConfig[], refinerConfig: IRefinerConfig[], queryConfig: IQueryConfig[] }>((resolve, reject) => {
    pnp.sp.web.lists.getByTitle(configList).items.orderBy("GtDpOrder").get().then(items => {
        resolve({
            columnConfig: items.filter(i => i.ContentTypeId.indexOf(COLUMN_CONFIG_CT) !== -1).map(col => ({
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
            refinerConfig: items.filter(i => i.ContentTypeId.indexOf(REFINER_CONFIG_CT) !== -1).map(ref => ({
                name: ref.GtDpDisplayName,
                key: ref.GtDpProperty,
                fieldName: ref.GtDpProperty,
                multi: ref.GtDpMultiple,
                defaultHidden: ref.GtDpDefaultHidden,
                iconName: ref.GtDpIcon,
            })),
            queryConfig: items.filter(i => i.ContentTypeId.indexOf(QUERY_CONFIG_CT) !== -1).map(qc => ({
                name: qc.GtDpDisplayName,
                queryTemplate: qc.GtDpSearchQuery,
                iconName: qc.GtDpIcon,
                default: qc.GtDpDefault,
            })),
        });
    }).catch(reject);
});
