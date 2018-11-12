//#region Imports
import __ from "../../Resources";
import * as React from "react";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import { sp, Site } from "@pnp/sp";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import IResourceAllocationProps, { ResourceAllocationDefaultProps } from "./IResourceAllocationProps";
import IResourceAllocationState from "./IResourceAllocationState";
import { ProjectUser, ProjectResourceAllocation, ProjectAllocationType } from "./ResourceAllocationModels";
import ResourceAllocationDetailsModal from "./ResourceAllocationDetailsModal";
import ResourceAllocationCommandBar from "./ResourceAllocationCommandBar";
import IResourceAllocationCommandBarState from "./ResourceAllocationCommandBar/IResourceAllocationCommandBarState";
import BaseWebPart from "../@BaseWebPart";
import * as moment from "moment";
//#endregion


/**
 * Component: ResourceAllocation
 */
export default class ResourceAllocation extends BaseWebPart<IResourceAllocationProps, IResourceAllocationState> {
    public static displayName = "ResourceAllocation";
    public static defaultProps = ResourceAllocationDefaultProps;

    /**
     * Constructor
     *
     * @param {IResourceAllocationProps} props Props
     */
    constructor(props: IResourceAllocationProps) {
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
            console.log(err);
            this.setState({ isLoading: false });
        }
    }

    /**
     * Renders the <ResourceAllocation /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return (
                <Spinner
                    type={SpinnerType.large}
                    label={__.getResource("ResourceAllocation_LoadingText")} />
            );
        }
        const data = this.getTimelineData();

        if (data.groups.length === 0 || data.items.length === 0) {
            return <MessageBar>{__.getResource("ResourceAllocation_ErrorText")}</MessageBar>;
        }
        return (
            <div>
                <ResourceAllocationCommandBar
                    users={this.state.users}
                    allocations={this.state.allocations}
                    selected={this.state.selected}
                    onSelectionUpdate={this.onSelectionUpdate} />
                <Timeline
                    groups={data.groups}
                    items={data.items}
                    itemRenderer={this.timelineItemRenderer}
                    stackItems={true}
                    canMove={false}
                    canChangeGroup={false}
                    sidebarWidth={220}
                    defaultTimeStart={moment().subtract(1, "months")}
                    defaultTimeEnd={moment().add(1, "years")}>
                    <TimelineMarkers>
                        <TodayMarker />
                    </TimelineMarkers>
                </Timeline>
                <ResourceAllocationDetailsModal
                    allocation={this.state.allocationDisplay}
                    onDismiss={this.onResourceAllocationDetailsModalDismiss} />
            </div>
        );
    }

    /**
     * Get data for the timeline
     */
    private getTimelineData() {
        const {
            users,
            allocations,
            selected,
        } = this.state;

        const groups = users
            .map(user => ({ id: user.id, title: user.name }))
            .sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0))
            .filter(grp => {
                if (selected && selected.user) {
                    return grp.id === selected.user.id;
                }
                return true;
            });
        const items = allocations
            .filter(alloc => {
                if (!(alloc.user)) {
                    return false;
                }
                if (selected) {
                    if (selected.project) {
                        return (alloc.project.name === selected.project);
                    }
                    if (selected.role) {
                        return (alloc.role === selected.role);
                    }
                }
                return true;
            })
            .map((alloc, idx) => {
                return {
                    id: idx,
                    title: alloc.toString(),
                    group: alloc.user.id,
                    type: alloc.type,
                    ...alloc,
                };
            });
        return { groups, items };
    }

    @autobind
    private timelineItemRenderer({ item, itemContext, getItemProps }) {
        const props = getItemProps(item.itemProps);
        const itemOpacity = item.allocationPercentage < 20 ? 0.2 : item.allocationPercentage / 100;
        const itemColor = item.allocationPercentage < 30 ? "#000" : "#fff";
        switch (item.type) {
            case ProjectAllocationType.ProjectAllocation: {
                return (
                    <div
                        key={props.key}
                        className={props.className}
                        style={{
                            ...props.style,
                            color: itemColor,
                            backgroundColor: `rgb(26, 111, 179, ${itemOpacity})`,
                            border: "none",
                            cursor: "text",
                        }}
                        title={itemContext.title}
                        onClick={event => this.onTimelineItemClick(event, item)}>
                        <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
                            {itemContext.title}
                        </div>
                    </div>
                );
            }
            case ProjectAllocationType.Absence: {
                return (
                    <div
                        key={props.key}
                        className={props.className}
                        style={{
                            ...props.style,
                            color: itemColor,
                            backgroundColor: `rgb(205, 92, 92, ${itemOpacity})`,
                            border: "none",
                            cursor: "text",
                        }}
                        title={itemContext.title}>
                        <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
                            {itemContext.title}
                        </div>
                    </div>
                );
            }
        }
    }

    /**
     * On timeline item click, sets {allocationDisplay} in component state
     *
     * @param {React.MouseEvent} event Event
     * @param {any} item Item
     */
    @autobind
    private onTimelineItemClick(event: React.MouseEvent<HTMLDivElement>, item: any) {
        event.preventDefault();
        this.setState({ allocationDisplay: item });
    }

    /**
     * On dismiss ResourceAllocationDetailsModal, sets {allocationDisplay} to null in component state
     */
    @autobind
    private onResourceAllocationDetailsModalDismiss() {
        this.setState({ allocationDisplay: null });
    }

    @autobind
    private onSelectionUpdate(selected: IResourceAllocationCommandBarState) {
        event.preventDefault();
        this.setState({ selected: selected });
    }

    /**
     * Fetch data, parses the data, and creates arrays for [users] and [allocations]
     */
    private async fetchData() {
        const [searchResult, itemsAvailability] = await Promise.all([
            this._searchAllocationItems(),
            this._fetchAvailabilityItems(),
        ]);

        // Mapping allocations and availability
        const availability = itemsAvailability.map(item => {
            const a = new ProjectResourceAllocation(item.GtResourceUser.Title, item.GtStartDate, item.GtEndDate, item.GtResourceLoad, ProjectAllocationType.Absence);
            a.absence = item.GtResourceAbsence;
            return a;
        });
        const allocations = [
            ...availability,
            ...searchResult.map(res => {
                const a = new ProjectResourceAllocation(res.RefinableString71, res.GtStartDateOWSDATE, res.GtEndDateOWSDATE, res.GtResourceLoadOWSNMBR, ProjectAllocationType.ProjectAllocation);
                a.project = { name: res.SiteTitle, url: res.SPWebUrl };
                a.role = res.RefinableString72;
                return a;
            }),
        ];

        let users: Array<ProjectUser> = [];
        let userId = 0;
        for (let i = 0; i < allocations.length; i++) {
            let [user] = users.filter(r => r.name === allocations[i].name);
            if (!user) {
                user = new ProjectUser(userId, allocations[i].name);
                users.push(user);
                userId++;
            }
            allocations[i].user = user;
            user.allocations.push(allocations[i]);
        }

        return { users, allocations };
    }

    /**
     * Searches for allocation items using sp.search
     */
    private async _searchAllocationItems(): Promise<any> {
        const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
        const [dataSource] = await dataSourcesList.items.filter(`Title eq '${this.props.dataSource}'`).get();
        if (dataSource) {
            try {
                const searchSettings = { ...this.props.searchConfiguration, QueryTemplate: dataSource.GtDpSearchQuery };
                const { PrimarySearchResults } = await sp.search(searchSettings);
                console.log(searchSettings, PrimarySearchResults);
                return PrimarySearchResults;
            } catch (err) {
                throw err;
            }
        } else {
            return [];
        }
    }

    /**
     * Fetches availability items from list on root
     */
    private async _fetchAvailabilityItems(): Promise<Array<any>> {
        const itemsAvailability = await sp.web.lists.getByTitle(__.getResource("Lists_ResourceAllocation_Title"))
            .items
            .select("GtResourceUser/Title", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsence")
            .expand("GtResourceUser")
            .get();
        return itemsAvailability;
    }
}

export { IResourceAllocationProps, IResourceAllocationState };
