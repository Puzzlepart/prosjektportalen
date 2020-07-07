import IDynamicPortfolioFilter from '../DynamicPortfolioFilter/IDynamicPortfolioFilter'
import IDynamicPortfolioFilterItem from './IDynamicPortfolioFilterItem'

export default interface IDynamicPortfolioFilterItemProps {
    filter: IDynamicPortfolioFilter;
    item: IDynamicPortfolioFilterItem;
    className: string;
    padding?: number | string;
    marginBottom?: number;
    onChange: (item: any, checked: boolean) => void;
}

export { IDynamicPortfolioFilter }

