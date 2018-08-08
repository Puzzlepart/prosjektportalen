//#region Imports
import * as React from "react";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import __ from "../../Resources";
import pnp, { SearchQuery } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import IResourceAllocationProps, { ResourceAllocationDefaultProps } from "./IResourceAllocationProps";
import IResourceAllocationState from "./IResourceAllocationState";
import { ProjectResource, ProjectResourceAllocation, ProjectUser } from "./ResourceAllocationModels";
import ResourceAllocationDetailsModal from "./ResourceAllocationDetailsModal";
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
            const { users, allocations } = await this._fetchData();
            this.setState({
                users,
                allocations,
                isLoading: false,
            });
        } catch (err) {
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

        const data = this._getTimelineData();

        return (
            <div>
                <Timeline
                    groups={data.groups}
                    items={data.items}
                    itemRenderer={this._timelineItemRenderer}
                    stackItems={true}
                    canMove={false}
                    canChangeGroup={false}
                    sidebarWidth={220}
                    defaultTimeStart={moment()}
                    defaultTimeEnd={moment().add(1, "years")}>
                    <TimelineMarkers>
                        <TodayMarker />
                    </TimelineMarkers>
                </Timeline>
                <ResourceAllocationDetailsModal allocation={this.state.selectedAllocation} onDismiss={this._onResourceAllocationDetailsModalDismiss} />
            </div>
        );
    }

    /**
     * Get data for the timeline
     *
     * Need to return {users} and {allocations} from state in the correct format
     *
     * Sorts groups alphabetically by title
     */
    protected _getTimelineData() {
        const groups = this.state.users
            .map(user => ({ id: user.id, title: user.name }))
            .sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0));
        const items = this.state.allocations
            .filter(alloc => alloc.user)
            .map((alloc, idx) => {
                return {
                    id: idx,
                    title: alloc.toString(),
                    group: alloc.user.id,
                    ...alloc,
                };
            });
        return { groups, items };
    }

    @autobind
    protected _timelineItemRenderer({ item, itemContext, getItemProps }) {
        const props = getItemProps(item.itemProps);
        return (
            <div
                key={props.key}
                className={props.className}
                style={{
                    ...props.style,
                    opacity: item.approved ? 1 : 0.3,
                }}
                title={itemContext.title}
                onClick={event => this._onTimelineItemClick(event, item)}>
                <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
                    {itemContext.title}
                </div>
            </div>
        );
    }

    /**
     * On timeline item click, sets {selectedAllocation} in component state
     *
     * @param {React.MouseEvent} event Event
     * @param {any} item Item
     */
    @autobind
    protected _onTimelineItemClick(event: React.MouseEvent<HTMLDivElement>, item: any) {
        event.preventDefault();
        this.setState({ selectedAllocation: item });
    }

    /**
     * On dismiss ResourceAllocationDetailsModal, sets {selectedAllocation} to null in component state
     */
    @autobind
    protected _onResourceAllocationDetailsModalDismiss() {
        this.setState({ selectedAllocation: null });
    }

    /**
     * Fetch data, parses the data, and creates arrays for [users] and [allocations]
     */
    protected async _fetchData() {
        const items = await this._searchItems(this.props.searchConfiguration);
        const itemsResources = items.filter(item => item.ctIndex === 9);
        const itemsAllocations = items.filter(item => item.ctIndex === 10 && item.resourceId);
        const allocations = itemsAllocations.map(itemAlc => new ProjectResourceAllocation(itemAlc.item, { name: itemAlc.web.title, url: itemAlc.web.url }, itemAlc.resourceId, itemAlc.start, itemAlc.end, itemAlc.load, itemAlc.approved));
        const resources = itemsResources.map(itemRes => new ProjectResource(itemRes.item, itemRes.role, itemRes.name));
        let users: Array<ProjectUser> = [];
        let userId = 0;
        resources.forEach(resource => {
            let [user] = users.filter(r => r.name === resource.name);
            if (!user) {
                user = new ProjectUser(userId, resource.name);
                users.push(user);
                userId++;
            }
            resource.user = user;
            const allocationsForResource = allocations.filter(a => a.resourceId === resource.itemId && a.webId === resource.webId);
            allocationsForResource.forEach(allocation => {
                allocation.resource = resource;
                allocation.user = user;
                user.allocations.push(allocation);
            });
        });
        return { users, allocations };
    }

    /**
     * Searches for items using {pnp.sp}
     *
     * Calculates content type index
     *
     * 9 = Project Resource
     * 10 = Resource Allocation
     *
     * @param {SearchQuery} searchConfiguration Search configuration
     */
    protected async _searchItems(searchConfiguration: SearchQuery) {
        const { PrimarySearchResults } = await pnp.sp.search(searchConfiguration);
        const itemsParsed = PrimarySearchResults.map((result: any) => ({
            web: { title: result.SiteTitle, url: result.SPWebUrl },
            item: { url: result.Path, webId: result.WebId, itemId: parseInt(result.ListItemID, 10) },
            ctIndex: parseInt(result.ContentTypeID.split("0x010088578E7470CC4AA68D56634648310702")[1].substring(0, 2), 10),
            start: moment(new Date(result.GtStartDateOWSDATE)),
            end: moment(new Date(result.GtEndDateOWSDATE)),
            load: parseFloat(result.GtResourceLoadOWSNMBR) * 100,
            name: result.RefinableString71,
            role: result.RefinableString72,
            approved: result.GtApprovedOWSBOOL === "1",
            resourceId: result.RefinableString73 && parseInt(result.RefinableString73, 10),
        }));
        return itemsParsed;
    }
}

export { IResourceAllocationProps, IResourceAllocationState };
