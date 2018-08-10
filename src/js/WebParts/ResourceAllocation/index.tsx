//#region Imports
import * as React from "react";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import __ from "../../Resources";
import pnp, { SearchQuery } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import IResourceAllocationProps, { ResourceAllocationDefaultProps } from "./IResourceAllocationProps";
import IResourceAllocationState from "./IResourceAllocationState";
import { IParsedSearchResult, ProjectResource, ProjectResourceAllocation, ProjectResourceAvailability, ProjectUser } from "./ResourceAllocationModels";
import ResourceAllocationDetailsModal from "./ResourceAllocationDetailsModal";
import ResourceAllocationCommandBar from "./ResourceAllocationCommandBar";
import IResourceAllocationCommandBarState from "./ResourceAllocationCommandBar/IResourceAllocationCommandBarState";
import BaseWebPart from "../@BaseWebPart";
import TimelineItemType from "./TimelineItemType";
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
        super(props, { isLoading: true, selected: {} });
        moment.locale(__.getResource("MomentDate_Locale"));
    }

    /**
     * Component did mount
     *
     * Fetching required data, and updating state
     */
    public async componentDidMount(): Promise<void> {
        try {
            const data = await this._fetchData();
            this.setState({
                ...data,
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
                <ResourceAllocationCommandBar
                    users={this.state.users}
                    allocations={this.state.allocations}
                    selected={this.state.selected}
                    onSelectionUpdate={this._onSelectionUpdate} />
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
                <ResourceAllocationDetailsModal allocation={this.state.allocationDisplay} onDismiss={this._onResourceAllocationDetailsModalDismiss} />
            </div>
        );
    }

    /**
     * Get data for the timeline
     */
    protected _getTimelineData() {
        const groups = this.state.users
            .map(user => ({ id: user.id, title: user.name }))
            .sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0))
            .filter(grp => {
                if (this.state.selected.user) {
                    return grp.id === this.state.selected.user.id;
                }
                return true;
            });
        const itemsAllocations = this.state.allocations
            .filter(alloc => {
                if (!(alloc.user && alloc.resource)) {
                    return false;
                }
                if (this.state.selected.project) {
                    return (alloc.project.name === this.state.selected.project);
                }
                return true;
            })
            .map((alloc, idx) => {
                return {
                    id: idx,
                    title: alloc.toString(),
                    group: alloc.user.id,
                    type: TimelineItemType.ALLOCATION,
                    ...alloc,
                };
            });
        const itemsAvailability = this.state.availability
            .map((ava, idx) => {
                return {
                    id: (idx + itemsAllocations.length),
                    title: ava.toString(),
                    group: ava.user.id,
                    type: TimelineItemType.AVAILABILITY,
                    ...ava,
                };
            });
        return {
            groups,
            items: [...itemsAllocations, ...itemsAvailability],
        };
    }

    @autobind
    protected _timelineItemRenderer({ item, itemContext, getItemProps }) {
        const props = getItemProps(item.itemProps);
        switch (item.type) {
            case TimelineItemType.ALLOCATION: {
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
            case TimelineItemType.AVAILABILITY: {
                return (
                    <div
                        key={props.key}
                        className={props.className}
                        style={{
                            ...props.style,
                            backgroundColor: "#ff0000",
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
    protected _onTimelineItemClick(event: React.MouseEvent<HTMLDivElement>, item: any) {
        event.preventDefault();
        this.setState({ allocationDisplay: item });
    }

    /**
     * On dismiss ResourceAllocationDetailsModal, sets {allocationDisplay} to null in component state
     */
    @autobind
    protected _onResourceAllocationDetailsModalDismiss() {
        this.setState({ allocationDisplay: null });
    }

    @autobind
    protected _onSelectionUpdate(selected: IResourceAllocationCommandBarState) {
        event.preventDefault();
        this.setState({ selected: selected });
    }

    /**
     * Fetch data, parses the data, and creates arrays for [users] and [allocations]
     */
    protected async _fetchData() {
        const { itemsAllocations, itemsResources } = await this._searchItems(this.props.searchConfiguration);
        const itemsAvailability = await this._fetchAvailabilityItems();
        const allocations = itemsAllocations.map(itemAlc => new ProjectResourceAllocation(itemAlc));
        const resources = itemsResources.map(itemRes => new ProjectResource(itemRes));
        const availability = itemsAvailability.map(itemAva => new ProjectResourceAvailability(itemAva));
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
            const allocationsForResource = allocations.filter(alc => alc.resourceId === resource.itemId && alc.webId === resource.webId);
            allocationsForResource.forEach(allocation => {
                allocation.resource = resource;
                allocation.user = user;
                user.allocations.push(allocation);
            });
        });
        users.forEach(user => {
            const availabilityForUser = availability.filter(ava => ava.name === user.name);
            availabilityForUser.forEach(ava => {
                ava.user = user;
                user.availability.push(ava);
            });
        });
        return { users, allocations, availability };
    }

    /**
     * Searches for items using pnp.sp.search
     *
     * Calculates content type index
     *
     * 9 = Project Resource
     * 10 = Resource Allocation
     *
     * @param {SearchQuery} searchConfiguration Search configuration
     */
    protected async _searchItems(searchConfiguration: SearchQuery): Promise<{ itemsResources: Array<IParsedSearchResult>, itemsAllocations: Array<IParsedSearchResult> }> {
        const { PrimarySearchResults } = await pnp.sp.search(searchConfiguration);
        const itemsParsed = PrimarySearchResults.map((result: any) => ({
            url: result.Path,
            webId: result.WebId,
            itemId: parseInt(result.ListItemID, 10),
            contentTypeId: result.ContentTypeID,
            webTitle: result.SiteTitle,
            webUrl: result.SPWebUrl,
            start: moment(new Date(result.GtStartDateOWSDATE)),
            end: moment(new Date(result.GtEndDateOWSDATE)),
            load: parseFloat(result.GtResourceLoadOWSNMBR) * 100,
            name: result.RefinableString71,
            role: result.RefinableString72,
            approved: result.GtApprovedOWSBOOL === "1",
            resourceId: result.RefinableString73 && parseInt(result.RefinableString73, 10),
        }));
        const itemsResources = itemsParsed.filter(item => item.contentTypeId.indexOf("0x010088578E7470CC4AA68D5663464831070209") !== -1);
        const itemsAllocations = itemsParsed.filter(item => item.contentTypeId.indexOf("0x010088578E7470CC4AA68D5663464831070210") !== -1 && item.resourceId);
        return { itemsResources, itemsAllocations };
    }

    /**
     * Fetches availability items from list on root
     */
    protected async _fetchAvailabilityItems(): Promise<Array<any>> {
        const itemsAvailability = await pnp.sp.web.lists.getByTitle(__.getResource("Lists_ResourceAllocation_Title"))
            .items
            .select("GtResourceUser/Title", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsence")
            .expand("GtResourceUser")
            .get();
        return itemsAvailability;
    }
}

export { IResourceAllocationProps, IResourceAllocationState };
