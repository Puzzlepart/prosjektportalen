import IFilter from "./Filter/IFilter";

interface IFilterPanelProps {
    filters: IFilter[];
    onFilterChange: (filter: IFilter) => void;
    onDismiss: () => void;
    isOpen: boolean;
    showIcons?: boolean;
}

export default IFilterPanelProps;
