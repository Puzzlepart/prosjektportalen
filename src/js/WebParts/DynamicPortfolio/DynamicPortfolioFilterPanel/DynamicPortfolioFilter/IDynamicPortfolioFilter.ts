import IDynamicPortfolioFilterItem from '../DynamicPortfolioFilterItem/IDynamicPortfolioFilterItem'
import IDynamicPortfolioRefinerConfig from '../../DynamicPortfolioConfiguration/IDynamicPortfolioRefinerConfig'

export default interface IDynamicPortfolioFilter extends IDynamicPortfolioRefinerConfig {
    emptyMessage: string;
    items: IDynamicPortfolioFilterItem[];
    selected?: string[];
}
