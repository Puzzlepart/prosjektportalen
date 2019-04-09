import * as moment from "moment";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IFilterItemProps } from "../../@Components/FilterPanel/FilterItem";
import { IFilterProps } from "../../@Components/FilterPanel/Filter";

export default interface ITasksOverviewCommandBarProps {
    visibleTime: { visibleTimeStart: moment.Moment, visibleTimeEnd: moment.Moment };
    filters: IFilterProps[];
    groupByOptions: { fieldName: string, name: string }[];
    groupBy: { fieldName: string, name: string };
    onFilterChange: (column: IColumn, selectedItems: IFilterItemProps[]) => void;
    onIntervalChange: (isDynamic: boolean, visibleTimeStart: moment.Moment, visibleTimeEnd: moment.Moment) => void;
    onGroupByChanged: (groupBy: { fieldName: string, name: string }) => void;
}
