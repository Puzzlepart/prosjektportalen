//#region Imports
import __ from "../../Resources";
import * as React from "react";
import * as moment from "moment";
import { SearchQuery } from "@pnp/sp";
import { LogLevel, Logger } from "@pnp/logging";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import ITasksOverviewProps, { TasksOverviewDefaultProps } from "./ITasksOverviewProps";
import ITasksOverviewState from "./ITasksOverviewState";
import TasksOverviewCommandBar from "./TasksOverviewCommandBar";
import TasksOverviewDetailsModal from "./TasksOverviewDetailsModal";
import SearchService from "../../Services/SearchService";
import DataSourceService from "../../Services/DataSourceService";
import { TaskModel } from "./TaskModel";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { ITaskSearchResult } from "./ITaskSearchResult";
import { IFilterItemProps } from "../@Components/FilterPanel/FilterItem";
import { IFilterProps } from "../@Components/FilterPanel/Filter";
import getObjectValue from "../../Helpers";
import ITasksOverviewData from "./ITasksOverviewData";
import TaskOverviewItem from "./TaskOverviewItem";
import { HeaderLabelFormats } from "./HeaderLabelFormats";
import { SubHeaderLabelFormats } from "./SubHeaderLabelFormats";
//#endregion


const LOG_TEMPLATE = "(TasksOverview) {0}: {1}";

/**
 * Component: TasksOverview
 */
export default class TasksOverview extends React.Component<ITasksOverviewProps, ITasksOverviewState> {
    public static displayName = "TasksOverview";
    public static defaultProps = TasksOverviewDefaultProps;
    private searchDelay: number;

    /**
     * Constructor
     *
     * @param {ITasksOverviewProps} props Props
     */
    constructor(props: ITasksOverviewProps) {
        super(props);
        this.state = {
            activeFilters: {},
            searchTerm: "",
            groupBy: props.groupByOptions[0],
            isLoading: true,
        };
    }

    /**
     * Component did mount
     *
     * Fetching items using [sp.search]
     */
    public async componentDidMount(): Promise<void> {
        try {
            const items = await this.fetchItems(this.props.dataSourceName, this.props.searchQuery);
            this.setState({ items, isLoading: false });
        } catch (err) {
            this.setState({ isLoading: false });
        }
    }

    /**
     * Renders the <TasksOverview /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} label={__.getResource("TasksOverview_LoadingText")} />;
        }
        if (!this.state.items) {
            return <MessageBar>{__.getResource("TasksOverview_ErrorText")}</MessageBar>;
        }

        const data = this.getData(this.state.items);
        const filteredData = this.getFilteredData(data);

        return (
            <div>
                <TasksOverviewCommandBar
                    filters={this.getFilters(data)}
                    groupByOptions={this.props.groupByOptions}
                    groupBy={this.state.groupBy}
                    onFilterChange={this.onFilterChange}
                    onGroupByChanged={this.onGroupByChanged} />
                <SearchBox
                    labelText={__.getResource("TasksOverview_SearchBoxPrompt")}
                    onChanged={this.onSearch} />
                <MessageBar>
                    <div dangerouslySetInnerHTML={{ __html: __.getResource("TasksOverview_InfoText") }}></div>
                </MessageBar>
                <Timeline
                    groups={filteredData.groups}
                    items={filteredData.tasks}
                    stickyHeader={true}
                    stackItems={true}
                    canMove={false}
                    canChangeGroup={false}
                    sidebarWidth={220}
                    headerLabelGroupHeight={0}
                    lineHeight={48}
                    itemHeightRatio={0.8}
                    defaultTimeStart={moment().add(...this.props.defaultTimeStart)}
                    defaultTimeEnd={moment().add(...this.props.defaultTimeEnd)}
                    headerLabelFormats={HeaderLabelFormats}
                    subHeaderLabelFormats={SubHeaderLabelFormats}
                    itemRenderer={this.timelineItemRenderer}>
                    <TimelineMarkers>
                        <TodayMarker />
                    </TimelineMarkers>
                </Timeline>
                <TasksOverviewDetailsModal
                    task={this.state.selectedTask}
                    onDismiss={this.onTasksOverviewDetailsModalDismiss} />
            </div >
        );
    }

    /**
   * Timeline item renderer
   */
    @autobind
    private timelineItemRenderer({ item, itemContext, getItemProps }) {
        const htmlProps = getItemProps(item.itemProps);
        return (
            <TaskOverviewItem
                itemProps={htmlProps}
                item={item}
                itemContext={itemContext}
                onItemClick={this.onTimelineItemClick} />
        );
    }


    /**
     * On dismiss <TasksOverviewDetailsModal />
     */
    @autobind
    private onTasksOverviewDetailsModalDismiss() {
        this.setState({ selectedTask: null });
    }

    /**
     * Get filter items for column
     *
     * @param {IColumn} column Column
     * @param {ITasksOverviewData} data Data
     */
    private getFilterItems(column: IColumn, data: ITasksOverviewData) {
        let values = [];
        data.tasks.forEach(task => {
            let value = getObjectValue<string>(task, `item.${column.fieldName}`, "").split(";");
            values.push(...value);
        });
        let valuesUnique = values.filter((value, index, self) => value && self.indexOf(value) === index);
        let valuesSorted = this.sortItems(valuesUnique, column.fieldName);
        return valuesSorted.map(value => ({ name: value, value })) as IFilterItemProps[];
    }

    /**
     * Get filters
     *
     * @param {ITasksOverviewData} data Data
     */
    private getFilters(data: ITasksOverviewData): IFilterProps[] {
        return this.props.filterColumns.map(column => {
            return { column, items: this.getFilterItems(column, data) };
        });
    }

    /**
     * On search
     *
     * @param {string} searchTerm Search term
     * @param {number} delayMs Delay in ms
     */
    @autobind
    private onSearch(searchTerm: string, delayMs: number = 500): void {
        searchTerm = searchTerm.toLowerCase();
        if (this.searchDelay) {
            clearTimeout(this.searchDelay);
        }
        this.searchDelay = window.setTimeout(() => {
            Logger.log({ message: String.format(LOG_TEMPLATE, "onSearch", `Updating search term to ${searchTerm}`), level: LogLevel.Info });
            this.setState({ searchTerm });
        }, delayMs);
    }

    /**
     * On filter change
     *
     * @param {IColumn} column Column
     * @param {IFilterItemProps[]} selectedItems Selected items
     */
    @autobind
    private onFilterChange(column: IColumn, selectedItems: IFilterItemProps[]): void {
        const { activeFilters } = ({ ...this.state } as ITasksOverviewState);
        if (selectedItems.length > 0) {
            activeFilters[column.fieldName] = selectedItems.map(i => i.value);
        } else {
            delete activeFilters[column.fieldName];
        }
        Logger.log({ message: String.format(LOG_TEMPLATE, "onFilterChange", `Filter changed for ${column.fieldName}`), data: activeFilters, level: LogLevel.Info });
        this.setState({ activeFilters });
    }

    /**
    * On group by changed
    *
    * @param {Object} groupBy Group by
    */
    @autobind
    private onGroupByChanged(groupBy: { fieldName: string, name: string }) {
        Logger.log({ message: String.format(LOG_TEMPLATE, "onGroupByChanged", `Group by changed to ${groupBy.fieldName}`), level: LogLevel.Info });
        this.setState({ groupBy });
    }

    /**
    * Get filtered tasks
    *
    * @param {TaskModel[]} tasks Tasks
    * @param {Object} activeFilters Active filters
    * @param {string} searchTerm Search term
    */
    private getFilteredTasks(tasks: TaskModel[], activeFilters: { [fieldName: string]: string[] }, searchTerm: string): TaskModel[] {
        Logger.log({ message: String.format(LOG_TEMPLATE, "getFilteredTasks", "Get filtered tasks"), level: LogLevel.Info });
        tasks = Object.keys(activeFilters).reduce((_tasks, fieldName) => {
            return _tasks.filter(_task => {
                return activeFilters[fieldName].filter(_filterValue => {
                    return getObjectValue(_task, `item.${fieldName}`, "").indexOf(_filterValue) !== -1;
                }).length > 0;
            });
        }, tasks);
        tasks = tasks.filter(_task => _task.title.toLowerCase().indexOf(searchTerm) !== -1);
        return tasks;
    }

    /**
     * Sort items, either alphabetically or by a custom sort specified by [customSorts] in props
     *
     * @param {string[]} items Items
     * @param {string} fieldName Field name
     */
    private sortItems(items: string[], fieldName: string): string[] {
        const customSort = getObjectValue<string[]>(this, `props.customSorts.${fieldName}`, null);
        if (customSort) {
            items = [...customSort, ""].filter(i => items.indexOf(i) !== -1);
        } else {
            items = items.sort((a, b) => a < b ? -1 : (a > b ? 1 : 0));
        }
        return items;
    }

    /**
    * Get groups
    *
    * @param {string[]} items Items
    */
    private getGroups(items: ITaskSearchResult[]): { id: number, title: string }[] {
        const groupByValues = items.map(task => getObjectValue(task, this.state.groupBy.fieldName, ""));
        const groupByValuesUnique = groupByValues.filter((value, index, self) => self.indexOf(value) === index && value.indexOf(";") === -1);
        const groupByValuesSorted = this.sortItems(groupByValuesUnique, this.state.groupBy.fieldName);
        const groups: { id: number, title: string }[] = groupByValuesSorted.map((title, id) => ({ id, title }));
        return groups;
    }

    /**
     * Get data
     *
     * @param {ITaskSearchResult[]} items Items
     */
    private getData(items: ITaskSearchResult[]): ITasksOverviewData {
        Logger.log({ message: String.format(LOG_TEMPLATE, "getData", "Getting data"), level: LogLevel.Info });
        const groups = this.getGroups(items);
        let tasks = items.map((task, id) => {
            const [group] = groups.filter(grp => grp.title === getObjectValue(task, this.state.groupBy.fieldName, ""));
            return group ? new TaskModel(id, group.id, task.Title, task.StartDateOWSDATE, task.DueDateOWSDATE, task) : null;
        });
        tasks = tasks.filter(task => task && task.start_time && task.end_time);
        return { groups, tasks };
    }

    /**
     * Get data for the timeline filtered by [activeFilters] and [searchTerm]
     *
     * @param {ITasksOverviewData} data Data
     */
    private getFilteredData(data: ITasksOverviewData) {
        Logger.log({ message: String.format(LOG_TEMPLATE, "getFilteredData", "Getting filtered data"), level: LogLevel.Info });
        let { activeFilters, searchTerm } = ({ ...this.state } as ITasksOverviewState);
        let tasks = this.getFilteredTasks(data.tasks, activeFilters, searchTerm);
        let groups = data.groups.filter(grp => tasks.filter(item => item.group === grp.id).length > 0);
        return { groups, tasks };
    }

    /**
     * On timeline item click, sets [selectedTask] in component [state]
     *
     * @param {TaskModel} task Task
     */
    @autobind
    private onTimelineItemClick(task: TaskModel) {
        this.setState({ selectedTask: task });
    }

    /**
     * Fetch items
     *
     * @param {string} dataSourceName Data source name
     * @param {SearchQuery} searchQuery Search confog
     */
    private async fetchItems(dataSourceName: string, searchQuery: SearchQuery): Promise<ITaskSearchResult[]> {
        const queryTemplate = await DataSourceService.getSourceByName(dataSourceName);
        if (queryTemplate) {
            try {
                const _searchQuery = { QueryTemplate: queryTemplate, ...searchQuery };
                const items = await SearchService.search<ITaskSearchResult[]>(_searchQuery);
                Logger.log({ message: String.format(LOG_TEMPLATE, "fetchItems", `Successfully fetched ${items.length} items`), level: LogLevel.Info });
                return items;
            } catch (err) {
                Logger.log({ message: String.format(LOG_TEMPLATE, "fetchItems", `An error occured retrieving items.`), level: LogLevel.Warning });
                return null;
            }
        } else {
            Logger.log({ message: String.format(LOG_TEMPLATE, "fetchItems", `Data source with name ${dataSourceName} not found.`), level: LogLevel.Warning });
            return null;
        }
    }
}

export { ITasksOverviewProps, ITasksOverviewState };
