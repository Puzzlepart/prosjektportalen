import * as React from "react";
import Timeline from "react-calendar-timeline";
import __ from "../../Resources";
import pnp from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import IProjectResourcesProps, { ProjectResourcesDefaultProps } from "./IProjectResourcesProps";
import IProjectResourcesState from "./IProjectResourcesState";
import { ProjectResourceAllocation, ProjectUser } from "./ProjectResourcesModels";
import ResourceAllocationModal from "./ResourceAllocationModal";
import BaseWebPart from "../@BaseWebPart";
import * as moment from "moment";

/**
 * Project Resources
 */
export default class ProjectResources extends BaseWebPart<IProjectResourcesProps, IProjectResourcesState> {
    public static displayName = "ProjectResources";
    public static defaultProps = ProjectResourcesDefaultProps;

    /**
     * Constructor
     *
     * @param {IProjectResourcesProps} props Props
     */
    constructor(props: IProjectResourcesProps) {
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
            this.setState({ users, allocations, isLoading: false });
        } catch (err) {
            this.setState({ isLoading: false });
        }
    }

    /**
     * Renders the <ProjectResources /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return (
                <Spinner
                    type={SpinnerType.large}
                    label={__.getResource("ProjectResources_LoadingText")} />
            );
        }

        const groups = this.state.users.map(user => ({ id: user.id, title: user.name }));
        const items = this.state.allocations.map((alloc, idx) => {
            return {
                id: idx,
                group: alloc.userId,
                title: alloc.getTitle(),
                start_time: moment(alloc.start),
                end_time: moment(alloc.end),
                _: alloc,
            };
        });
        return (
            <div>
                <Timeline
                    groups={groups}
                    items={items}
                    itemRenderer={this._timelineItemRenderer}
                    stackItems={true}
                    canMove={false}
                    canChangeGroup={false}
                    minResizeWidth={150}
                    defaultTimeStart={moment()}
                    defaultTimeEnd={moment().add(1, "years")} />
                <ResourceAllocationModal allocation={this.state.selectedAllocation} onDismiss={this._onResourceAllocationModalDismiss} />
            </div>
        );
    }

    @autobind
    protected _timelineItemRenderer({ item, itemContext, getItemProps }) {
        const props = getItemProps(item.itemProps);
        return (
            <div
                key={props.key}
                className={props.className}
                style={props.style}
                title={itemContext.title}
                onClick={event => this._onItemClick(event, item, itemContext)}>
                <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
                    {itemContext.title}
                </div>
            </div>
        );
    }

    @autobind
    protected _onItemClick(event, item, itemContext) {
        this.setState({ selectedAllocation: item._ });
    }

    @autobind
    protected _onResourceAllocationModalDismiss() {
        this.setState({ selectedAllocation: null });
    }

    /**
     * Fetch data, parses the data, and creates arrays for [users] and [allocations]
     */
    protected async _fetchData() {
        const items = await this._searchItems();
        const itemsResources = items.filter(item => item.ctIndex === 9);
        const itemsAllocations = items.filter(item => item.ctIndex === 10 && item.resourceId);
        const allocations = itemsAllocations.map(allocation => new ProjectResourceAllocation(allocation.item, allocation.web.title, allocation.resourceId, allocation.start, allocation.end, allocation.load));
        let users: Array<ProjectUser> = [];
        let userId = 0;
        itemsResources.forEach(resource => {
            let [user] = users.filter(r => r.name === resource.name);
            if (!user) {
                user = new ProjectUser(userId, resource.name);
                users.push(user);
                userId++;
            }
            const allocationsForResource = allocations.filter(a => a.resourceId === resource.item.id && a.webId === resource.item.webId);
            allocationsForResource.forEach(allocation => {
                allocation.role = resource.role;
                allocation.userId = user.id;
                allocation.userName = user.name;
                user.allocations.push(allocation);
            });
        });
        return { users, allocations };
    }

    /**
     * Searches for items using {pnp.sp}
     */
    protected async _searchItems() {
        const { PrimarySearchResults } = await pnp.sp.search(this.props.searchConfiguration);
        const itemsParsed = PrimarySearchResults.map((result: any) => ({
            web: { title: result.SiteTitle },
            item: { webId: result.WebId, id: parseInt(result.ListItemID, 10) },
            ctIndex: parseInt(result.ContentTypeID.split("0x010088578E7470CC4AA68D56634648310702")[1].substring(0, 2), 10),
            start: moment(new Date(result.GtStartDateOWSDATE)),
            end: moment(new Date(result.GtEndDateOWSDATE)),
            load: parseFloat(result.GtResourceLoadOWSNMBR) * 100,
            name: result.RefinableString71,
            role: result.RefinableString72,
            resourceId: result.RefinableString73 && parseInt(result.RefinableString73, 10),
        }));
        return itemsParsed;
    }
}

export { IProjectResourcesProps, IProjectResourcesState };
