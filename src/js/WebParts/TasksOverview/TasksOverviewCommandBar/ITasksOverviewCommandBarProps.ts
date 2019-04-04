import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IFilterItemProps } from "../../@Components/FilterPanel/FilterItem";
import { IFilterProps } from "../../@Components/FilterPanel/Filter";

export default interface ITasksOverviewCommandBarProps {
    filters: IFilterProps[];
    groupByOptions: { fieldName: string, name: string }[];
    groupBy: { fieldName: string, name: string };
    onFilterChange: (column: IColumn, selectedItems: IFilterItemProps[]) => void;
    onGroupByChanged: (groupBy: { fieldName: string, name: string }) => void;
}
