import IFilter from "../Filter/IFilter";
import IFilterItem from "./IFilterItem";

export default interface IFilterItemProps {
    filter: IFilter;
    item: IFilterItem;
    className: string;
    padding?: number | string;
    marginBottom?: number;
    onChange: (item: any, checked: boolean) => void;
}

export { IFilter };

