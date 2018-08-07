import * as React from "react";
import Timeline from "react-calendar-timeline";
import __ from "../../Resources";
import pnp from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import IProjectResourcesProps, { ProjectResourcesDefaultProps } from "./IProjectResourcesProps";
import IProjectResourcesState from "./IProjectResourcesState";
import { ProjectResourceAllocation, ProjectUser } from "./ProjectResourcesModels";
import BaseWebPart from "../@BaseWebPart";
import * as moment from "moment";

/**
 * Experience Log
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

    public async componentDidMount(): Promise<void> {
        try {
            const { users, allocations } = await this._fetchItems();
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
            };
        });
        return (
            <Timeline
                groups={groups}
                items={items}
                stackItems={true}
                canMove={false}
                canChangeGroup={false}
                minResizeWidth={150}
                defaultTimeStart={moment()}
                defaultTimeEnd={moment().add(1, "years")}/>
        );
    }

    /**
     * Fetch items
     */
    protected async _fetchItems() {
        const { PrimarySearchResults } = await pnp.sp.search(this.props.searchConfiguration);
        const itemsParsed = PrimarySearchResults.map((i: any) => ({
            web: { title: i.SiteTitle },
            item: { webId: i.WebId, id: parseInt(i.ListItemID, 10) },
            ctIndex: parseInt(i.ContentTypeID.split("0x010088578E7470CC4AA68D56634648310702")[1].substring(0, 2), 10),
            start: new Date(i.GtStartDateOWSDATE),
            end: new Date(i.GtEndDateOWSDATE),
            load: parseFloat(i.GtResourceLoadOWSNMBR) * 100,
            name: i.RefinableString71,
            role: i.RefinableString72,
            resourceId: i.RefinableString73 && parseInt(i.RefinableString73, 10),
        }));
        const itemsResources = itemsParsed.filter(item => item.ctIndex === 9);
        const itemsAllocations = itemsParsed.filter(item => item.ctIndex === 10 && item.resourceId);
        const allocations = itemsAllocations.map(alc => new ProjectResourceAllocation(alc.item, alc.web.title, alc.resourceId, alc.start, alc.end, alc.load));
        let users: Array<ProjectUser> = [];
        let idx = 0;
        itemsResources.forEach(res => {
            let [user] = users.filter(r => r.name === res.name);
            if (!user) {
                user = new ProjectUser(idx, res.name);
                users.push(user);
                idx++;
            }
            const [allocation] = allocations.filter(a => a.resourceId === res.item.id && a.webId === res.item.webId);
            if (allocation) {
                allocation.role = res.role;
                allocation.userId = user.id;
                user.allocations.push(allocation);
            }
        });
        return { users, allocations };
    }
}

export { IProjectResourcesProps, IProjectResourcesState };
