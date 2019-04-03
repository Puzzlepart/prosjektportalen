//#region Imports
import __ from "../../Resources";
import * as React from "react";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import ITasksOverviewProps, { TasksOverviewDefaultProps } from "./ITasksOverviewProps";
import ITasksOverviewState from "./ITasksOverviewState";
import BaseWebPart from "../@BaseWebPart";
import * as moment from "moment";
import SearchService from "src/js/Services/SearchService";
import DataSourceService from "src/js/Services/DataSourceService";
// import { TaskModel } from "./TaskModel";
// import { ProjectUser, ProjectTasksOverview, ProjectAllocationType } from "./TasksOverviewModels";
// import TasksOverviewDetailsModal from "./TasksOverviewDetailsModal";
// import TasksOverviewCommandBar from "./TasksOverviewCommandBar";
// import { autobind } from "office-ui-fabric-react/lib/Utilities";
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
        super(props, { isLoading: true });
        moment.locale(__.getResource("MomentDate_Locale"));
    }

    /**
     * Component did mount
     *
     * Fetching required data, and updating state
     */
    public async componentDidMount(): Promise<void> {
        try {
            const data = await this.fetchData();
            this.setState({ ...data, isLoading: false });
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

        const { items, groups } = this.getTimelineData();

        if (groups.length === 0 || items.length === 0) {
            return <MessageBar>{__.getResource("TasksOverview_ErrorText")}</MessageBar>;
        }
        return (
            <div>
                {/* <div className="allocation-cmd-bar">
                    <TasksOverviewCommandBar
                        users={this.state.users}
                        allocations={this.state.allocations}
                        selected={this.state.selected}
                        onSelectionUpdate={this.onSelectionUpdate} />
                </div> */}
                <Timeline
                    groups={groups}
                    items={items}
                    stackItems={true}
                    canMove={false}
                    canChangeGroup={false}
                    sidebarWidth={220}
                    defaultTimeStart={moment().subtract(1, "months")}
                    defaultTimeEnd={moment().add(1, "years")}
                // itemRenderer={this.timelineItemRenderer}
                >
                    <TimelineMarkers>
                        <TodayMarker />
                    </TimelineMarkers>
                </Timeline>
                {/* <TasksOverviewDetailsModal allocation={this.state.allocationDisplay} onDismiss={this.onTasksOverviewDetailsModalDismiss} /> */}
            </div>
        );
    }

    /**
     * Get data for the timeline
     */
    private getTimelineData() {
        const groups = [{
            id: 0,
            title: "Alle oppgaver",
        }];
        // const items = this.state.tasks.map(i => new TaskModel(i.Title, null, null));
        return { groups, items: [] };
    }

    // /**
    //  * On timeline item click, sets {allocationDisplay} in component state
    //  *
    //  * @param {React.MouseEvent} event Event
    //  * @param {any} item Item
    //  */
    // @autobind
    // private onTimelineItemClick(event: React.MouseEvent<HTMLDivElement>, item: any) {
    //     event.preventDefault();
    //     // this.setState({ allocationDisplay: item });
    // }

    // /**
    //  * On dismiss TasksOverviewDetailsModal, sets {allocationDisplay} to null in component state
    //  */
    // @autobind
    // private onTasksOverviewDetailsModalDismiss() {
    //     // this.setState({ allocationDisplay: null });
    // }

    // @autobind
    // private onSelectionUpdate(selected: any) {
    //     event.preventDefault();
    //     // this.setState({ selected: selected });
    // }

    /**
     * Fetch data
     */
    private async fetchData() {
       const queryTemplate = await DataSourceService.getSourceByName(this.props.dataSourceName);
        if (queryTemplate) {
            try {
                const searchSettings = { QueryTemplate: queryTemplate, ...this.props.searchConfiguration };
                const { PrimarySearchResults } = await SearchService.search(searchSettings);
                return { items: PrimarySearchResults };
            } catch (err) {
                return [];
            }
        } else {
            return [];
        }
    }
}

export { ITasksOverviewProps, ITasksOverviewState };
