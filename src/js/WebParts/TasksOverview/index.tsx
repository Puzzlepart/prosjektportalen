//#region Imports
import __ from "../../Resources";
import * as React from "react";
import * as moment from "moment";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import ITasksOverviewProps, { TasksOverviewDefaultProps } from "./ITasksOverviewProps";
import ITasksOverviewState from "./ITasksOverviewState";
import BaseWebPart from "../@BaseWebPart";
import TasksOverviewCommandBar from "./TasksOverviewCommandBar";
import TasksOverviewDetailsModal from "./TasksOverviewDetailsModal";
import SearchService from "../../Services/SearchService";
import DataSourceService from "../../Services/DataSourceService";
import { TaskModel } from "./TaskModel";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { ITaskSearchResult } from "./ITaskSearchResult";
import { IFilterItemProps } from "../@Components/FilterPanel/FilterItem";
import ITasksOverviewData from "./ITasksOverviewData";
import { IFilterProps } from "../@Components/FilterPanel/Filter";
import getObjectValue from "../../Helpers";
//#endregion


/**
 * Component: TasksOverview
 */
export default class TasksOverview extends BaseWebPart<ITasksOverviewProps, ITasksOverviewState> {
    public static displayName = "TasksOverview";
    public static defaultProps = TasksOverviewDefaultProps;

    /**
     * Constructor
     *
     * @param {ITasksOverviewProps} props Props
     */
    constructor(props: ITasksOverviewProps) {
        super(props, { activeFilters: {}, isLoading: true });
    }

    /**
     * Component did mount
     *
     * Fetching required data, and updating state
     */
    public async componentDidMount(): Promise<void> {
        try {
            const data = await this.fetchData();
            this.setState({ data, isLoading: false });
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
        if (!this.state.data) {
            return <MessageBar>{__.getResource("TasksOverview_ErrorText")}</MessageBar>;
        }

        const filteredData = this.getFilteredData();

        return (
            <div>
                <TasksOverviewCommandBar filters={this.getFilters()} onFilterChange={this.onFilterChange} />
                <Timeline
                    groups={filteredData.projects}
                    items={filteredData.tasks}
                    stackItems={true}
                    canMove={false}
                    canChangeGroup={false}
                    sidebarWidth={220}
                    defaultTimeStart={moment().add(...this.props.defaultTimeStart)}
                    defaultTimeEnd={moment().add(...this.props.defaultTimeEnd)}
                    itemRenderer={this.timelineItemRenderer}                >
                    <TimelineMarkers>
                        <TodayMarker />
                    </TimelineMarkers>
                </Timeline>
                <TasksOverviewDetailsModal task={this.state.selectedTask} onDismiss={this.onTasksOverviewDetailsModalDismiss} />
            </div>
        );
    }

    /**
   * Timeline item renderer
   */
    @autobind
    private timelineItemRenderer({ item, itemContext, getItemProps }) {
        const props = getItemProps(item.itemProps);
        const itemStyle = {
            ...props.style,
            border: "none",
            cursor: "pointer",
            outline: "none",
            background: "rgb(51,153,51)",
        };
        return (
            <div
                key={props.key}
                className={props.className}
                style={itemStyle}
                title={itemContext.title}
                onClick={event => this.onTimelineItemClick(event, item)}>
                <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
                    {itemContext.title}
                </div>
            </div>
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
     */
    private getFilterItems(column: IColumn) {
        let values = [];
        getObjectValue<TaskModel[]>(this.state, "data.tasks", []).forEach(task => {
            let value = getObjectValue<string>(task, `item.${column.fieldName}`, "").split(";");
            values.push(...value);
        });
        let valuesUnique = values.filter((value, index, self) => value && self.indexOf(value) === index);
        let valuesSorted = valuesUnique.sort((a, b) => a < b ? -1 : (a > b ? 1 : 0));
        return valuesSorted.map(value => ({
            name: value,
            value,
            selected: getObjectValue<string[]>(this.state, `activeFilters.${column.fieldName}`, []).indexOf(value) !== -1,
        })) as IFilterItemProps[];
    }

    /**
     * Get filters
     */
    private getFilters(): IFilterProps[] {
        return this.props.filterColumns.map(column => {
            return { column, items: this.getFilterItems(column) };
        });
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
        this.setState({ activeFilters });
    }

    /**
    * Get filtered tasks
    *
    * @param {TaskModel[]} tasks Tasks
    * @param {Object} activeFilters Active filters
    */
    private getFilteredTasks(tasks: TaskModel[], activeFilters: { [fieldName: string]: string[] }) {
        return Object.keys(activeFilters).reduce((_tasks, fieldName) => {
            return _tasks.filter(_task => {
                return activeFilters[fieldName].filter(_filterValue => {
                    return getObjectValue(_task, `item.${fieldName}`, "").indexOf(_filterValue) !== -1;
                }).length > 0;
            });
        }, tasks);
    }

    /**
     * Get data for the timeline filtered by [activeFilters]
     */
    private getFilteredData() {
        let { data, activeFilters } = ({ ...this.state } as ITasksOverviewState);
        let tasks = this.getFilteredTasks(data.tasks, activeFilters);
        let projects = data.projects.filter(grp => tasks.filter(item => item.group === grp.id).length > 0);
        return { projects, tasks };
    }

    /**
     * On timeline item click, sets {allocationDisplay} in component state
     *
     * @param {React.MouseEvent} event Event
     * @param {TaskModel} task Task
     */
    @autobind
    private onTimelineItemClick(event: React.MouseEvent<HTMLDivElement>, task: TaskModel) {
        event.preventDefault();
        this.setState({ selectedTask: task });
    }

    /**
     * Fetch data
     */
    private async fetchData(): Promise<ITasksOverviewData> {
        const queryTemplate = await DataSourceService.getSourceByName(this.props.dataSourceName);
        if (queryTemplate) {
            try {
                const searchSettings = { QueryTemplate: queryTemplate, ...this.props.searchConfiguration };
                const items = await SearchService.search<ITaskSearchResult[]>(searchSettings);
                const projects: { id: number, title: string }[] = items
                    .map(task => task.SiteTitle)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((title, id) => ({ id, title }));
                let tasks = items
                    .map((task, id) => {
                        const [group] = projects.filter(grp => grp.title === task.SiteTitle);
                        return new TaskModel(id, group.id, task.Title, task.StartDateOWSDATE, task.DueDateOWSDATE, task);
                    })
                    .filter((task) => task.start_time && task.end_time);
                return { projects, tasks };
            } catch (err) {
                return null;
            }
        } else {
            return null;
        }
    }
}

export { ITasksOverviewProps, ITasksOverviewState };
