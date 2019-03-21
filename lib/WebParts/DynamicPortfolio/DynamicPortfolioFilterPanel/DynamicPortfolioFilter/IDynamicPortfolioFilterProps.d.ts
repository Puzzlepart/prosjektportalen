import IDynamicPortfolioFilter from "./IDynamicPortfolioFilter";
export default interface IDynamicPortfolioFilterProps {
    filter?: IDynamicPortfolioFilter;
    onFilterChange?: (filter: IDynamicPortfolioFilter) => void;
}
