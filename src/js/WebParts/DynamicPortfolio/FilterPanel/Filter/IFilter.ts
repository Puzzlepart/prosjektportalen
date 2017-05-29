import IFilterItem from "../FilterItem/IFilterItem";

interface IFilter {
    name: string;
    key?: string;
    emptyMessage: string;
    multi: boolean;
    items: IFilterItem[];
    selected?: string[];
    defaultHidden?: boolean;
    iconName?: string;
}

export default IFilter;
