import IFilter  from "../Filter/IFilter";
import IFilterItem from "./IFilterItem";

interface IFilterItemProps {
    filter: IFilter;
    item: IFilterItem;
    className: string;
    onChange: (item: any, checked: boolean) => void;
}

export default IFilterItemProps;
export { IFilter }

