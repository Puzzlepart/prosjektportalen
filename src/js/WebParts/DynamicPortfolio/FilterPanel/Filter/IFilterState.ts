import IFilter from "./IFilter";

export default interface IFilterState {
    isCollapsed: boolean;
    filter?: IFilter;
}
