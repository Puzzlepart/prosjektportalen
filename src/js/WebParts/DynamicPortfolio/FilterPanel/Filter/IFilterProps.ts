import IFilter from "./IFilter";

export interface IFilterProps {
    filter?: IFilter;
    onFilterChange?: (filter: IFilter) => void;
    showIcon?: boolean;
}

export default IFilterProps;
