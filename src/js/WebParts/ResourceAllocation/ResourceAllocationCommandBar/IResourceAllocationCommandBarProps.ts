import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IFilterProps, IFilterItemProps } from "../../@Components/FilterPanel";

export default interface IResourceAllocationCommandBarProps {
    filters: IFilterProps[];
    onFilterChange: (column: IColumn, selectedItems: IFilterItemProps[]) => void;
}
