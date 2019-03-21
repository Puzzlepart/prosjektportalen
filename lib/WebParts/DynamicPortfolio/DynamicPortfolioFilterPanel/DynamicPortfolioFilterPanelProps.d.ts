import IDynamicPortfolioFilter from "./DynamicPortfolioFilter/IDynamicPortfolioFilter";
interface DynamicPortfolioFilterPanelProps {
    filters: IDynamicPortfolioFilter[];
    onFilterChange: (filter: IDynamicPortfolioFilter) => void;
    onDismiss: () => void;
    isOpen: boolean;
    showIcons?: boolean;
}
export default DynamicPortfolioFilterPanelProps;
