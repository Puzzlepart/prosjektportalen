import __ from '../../../Resources'
import { Web } from '@pnp/sp'
import IDynamicPortfolioConfiguration, { IDynamicPortfolioViewConfig, IDynamicPortfolioColumnConfig, IDynamicPortfolioRefinerConfig, IStatusFieldsConfig } from './IDynamicPortfolioConfiguration'
import { loadJsonConfiguration } from '../../../Util'

/**
 * Get fields config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
export function getFieldsConfig(orderBy: string, configWeb: Web): Promise<any[]> {
    return configWeb.lists.getByTitle(__.getResource('Lists_DynamicPortfolioFields_Title'))
        .items
        .orderBy(orderBy)
        .usingCaching()
        .get()
}

/**
 * Get refiner config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
export function getRefinersConfig(orderBy: string, configWeb: Web): Promise<any[]> {
    return configWeb.lists.getByTitle(__.getResource('Lists_DynamicPortfolioRefiners_Title'))
        .items
        .orderBy(orderBy)
        .usingCaching()
        .get()
}

/**
 * Get view config from list
 *
 * @param {string} viewConfigList Views config list
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
export function getViewsConfig(viewConfigList: string, orderBy: string, configWeb: Web): Promise<any[]> {
    return configWeb.lists.getByTitle(viewConfigList)
        .items
        .filter(`((GtDpPersonalView eq 0) or (GtDpPersonalView eq 1 and Author/Id eq ${_spPageContextInfo.userId}))`)
        .expand('GtDpFieldsLookup', 'GtDpRefinersLookup', 'GtDpGroupByLookup', 'Author')
        .select('ID', 'GtDpDisplayName', 'GtDpSearchQuery', 'GtDpIcon', 'GtDpDefault', 'GtDpFieldsLookup/GtDpOrder', 'GtDpFieldsLookup/GtDpDisplayName', 'GtDpRefinersLookup/GtDpOrder', 'GtDpRefinersLookup/GtDpDisplayName', 'GtDpGroupByLookup/GtDpDisplayName', 'Author/Id')
        .orderBy(orderBy)
        .usingCaching()
        .get()
}

/**
 * Get config from lists
 *
 * @param {string} viewConfigList Views config list
 * @param {string} orderBy Order by property
 * @param {string} configWebUrl URL for config lists
 */
export async function getConfig(viewConfigList: string = __.getResource('Lists_DynamicPortfolioViews_Title'), orderBy = 'GtDpOrder', configWebUrl: string = _spPageContextInfo.siteAbsoluteUrl): Promise<IDynamicPortfolioConfiguration> {
    const configWeb = new Web(configWebUrl)
    const [dpFields, dpRefiners, dpViews, statusFields] = await Promise.all([
        getFieldsConfig(orderBy, configWeb),
        getRefinersConfig(orderBy, configWeb),
        getViewsConfig(viewConfigList, orderBy, configWeb),
        loadJsonConfiguration<IStatusFieldsConfig>('status-fields'),
    ])
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
            ariaLabel: fld.GtDpDisplayName,
        }
    })
    const refiners = dpRefiners.map(ref => {
        return {
            name: ref.GtDpDisplayName,
            key: ref.GtDpProperty,
            fieldName: ref.GtDpProperty,
            multi: ref.GtDpMultiple,
            defaultHidden: ref.GtDpDefaultHidden,
            iconName: ref.GtDpIcon,
        }
    })
    const views = dpViews.map(view => {
        let fieldsLookupItems = []
        let refinersLookupItems = []
        if (view.GtDpFieldsLookup.hasOwnProperty('results')) {
            fieldsLookupItems = view.GtDpFieldsLookup.results
        } else {
            fieldsLookupItems = view.GtDpFieldsLookup
        }
        if (view.GtDpRefinersLookup.hasOwnProperty('results')) {
            refinersLookupItems = view.GtDpRefinersLookup.results
        } else {
            refinersLookupItems = view.GtDpRefinersLookup
        }
        const viewFields = fieldsLookupItems
            .sort((a, b) => a.GtDpOrder - b.GtDpOrder)
            .map(item => item.GtDpDisplayName)
        const viewRefiners = refinersLookupItems
            .sort((a, b) => a.GtDpOrder - b.GtDpOrder)
            .map(item => item.GtDpDisplayName)
        const viewGroupBy = view.GtDpGroupByLookup ? view.GtDpGroupByLookup.GtDpDisplayName : null
        return {
            id: view.ID,
            name: view.GtDpDisplayName,
            queryTemplate: view.GtDpSearchQuery,
            iconName: view.GtDpIcon,
            default: view.GtDpDefault,
            fields: viewFields,
            refiners: viewRefiners,
            groupBy: viewGroupBy,
        }
    })
    return { columns, refiners, views, statusFields }
}

export {
    IDynamicPortfolioConfiguration,
    IDynamicPortfolioViewConfig,
    IDynamicPortfolioColumnConfig,
    IDynamicPortfolioRefinerConfig,
    IStatusFieldsConfig,
}

