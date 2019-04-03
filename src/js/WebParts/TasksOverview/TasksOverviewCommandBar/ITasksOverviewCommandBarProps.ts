import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IFilterItemProps } from "../../@Components/FilterPanel/FilterItem";
import { IFilterProps } from "../../@Components/FilterPanel/Filter";

export default interface ITasksOverviewCommandBarProps {
    filters: IFilterProps[];
    onFilterChange: (column: IColumn, selectedItems: IFilterItemProps[]) => void;
}
