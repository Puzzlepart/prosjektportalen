/// <reference types="react" />
import IDynamicPortfolioFilter from "../DynamicPortfolioFilter/IDynamicPortfolioFilter";
import IDynamicPortfolioFilterItem from "./IDynamicPortfolioFilterItem";
export default interface IDynamicPortfolioFilterItemProps extends React.HTMLAttributes<HTMLElement> {
    filter: IDynamicPortfolioFilter;
    item: IDynamicPortfolioFilterItem;
    onChanged: (item: any, checked: boolean) => void;
}
export { IDynamicPortfolioFilter };
