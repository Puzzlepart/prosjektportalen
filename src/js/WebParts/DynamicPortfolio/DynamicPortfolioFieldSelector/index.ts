import __ from '../../../Resources'
import { IDynamicPortfolioFilter } from '../DynamicPortfolioFilterPanel'

const DynamicPortfolioFieldSelector: IDynamicPortfolioFilter = {
    fieldName: 'Fields',
    name: __.getResource('DynamicPortfolio_FieldSelector_Name'),
    key: 'Fields',
    emptyMessage: __.getResource('DynamicPortfolio_FieldSelector_EmptyMessage'),
    multi: true,
    defaultHidden: false,
    iconName: 'ShowResults',
    items: [],
}

export default DynamicPortfolioFieldSelector

