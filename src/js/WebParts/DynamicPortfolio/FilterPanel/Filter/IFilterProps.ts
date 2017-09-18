import IFilter from "./IFilter";

export default interface IFilterProps {
    filter?: IFilter;
    onFilterChange?: (filter: IFilter) => void;
}
