//#region Imports
import __ from "../../Resources";
import * as React from "react";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import { sp, Web } from "@pnp/sp";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import IResourceAllocationProps, { ResourceAllocationDefaultProps } from "./IResourceAllocationProps";
import IResourceAllocationState from "./IResourceAllocationState";
import { ProjectUser, ProjectResourceAllocation, ProjectAllocationType } from "./ResourceAllocationModels";
import ResourceAllocationDetailsModal from "./ResourceAllocationDetailsModal";
import ResourceAllocationCommandBar from "./ResourceAllocationCommandBar";
import * as moment from "moment";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IFilterItemProps, IFilterProps } from "../@Components/FilterPanel";
import { HeaderLabelFormats } from "./HeaderLabelFormats";
import { SubHeaderLabelFormats } from "./SubHeaderLabelFormats";
import DataSourceService from "../../Services/DataSourceService";
import { getObjectValue } from "../../Helpers";
//#endregion


/**
 * Component: ResourceAllocation
 */
export default class ResourceAllocation extends React.Component<IResourceAllocationProps, IResourceAllocationState> {
    public static displayName = "ResourceAllocation";
    public static defaultProps = ResourceAllocationDefaultProps;

    /**
     * Constructor
     *
     * @param {IResourceAllocationProps} props Props
     */
    constructor(props: IResourceAllocationProps) {
        super(props);
        this.state = { isLoading: true, activeFilters: {} };
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
        } catch (error) {
            this.setState({ error, isLoading: false });
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
        if (this.state.error) {
            return <MessageBar>{__.getResource("ResourceAllocation_ErrorText")}</MessageBar>;
        }

        const data = this.getTimelineData(this.state);

        return (
            <div>
                <ResourceAllocationCommandBar filters={this.getFilters()} onFilterChange={this.onFilterChange} />
                <MessageBar>
                    <div dangerouslySetInnerHTML={{ __html: String.format(__.getResource("ResourceAllocation_LinkText"), `${_spPageContextInfo.siteAbsoluteUrl}/Lists/ResourceAllocation/AllItems.aspx?Source=${encodeURIComponent(window.location.href)}`) }}></div>
                </MessageBar>
                <Timeline
                    groups={data.groups}
                    items={data.items}
                    itemRenderer={this.timelineItemRenderer}
                    stickyHeader={true}
                    stackItems={true}
                    canMove={false}
                    canChangeGroup={false}
                    sidebarWidth={220}
                    headerLabelGroupHeight={0}
                    defaultTimeStart={moment().subtract(1, "months")}
                    defaultTimeEnd={moment().add(1, "years")}
                    headerLabelFormats={HeaderLabelFormats}
                    subHeaderLabelFormats={SubHeaderLabelFormats}>
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
     * On filter change
     *
     * @param {IColumn} column Column
     * @param {IFilterItemProps[]} selectedItems Selected items
     */
    @autobind
    private onFilterChange(column: IColumn, selectedItems: IFilterItemProps[]): void {
        const { activeFilters } = ({ ...this.state } as IResourceAllocationState);
        if (selectedItems.length > 0) {
            activeFilters[column.fieldName] = selectedItems.map(i => i.value);
        } else {
            delete activeFilters[column.fieldName];
        }
        this.setState({ activeFilters });
    }

    /**
     * Get filter items for column
     *
     * @param {IColumn} column Column
     */
    private getFilterItems(column: IColumn) {
        let values = this.state.allocations.map(alloc => getObjectValue<string>(alloc, column.fieldName, ""));
        let valuesUnique = values.filter((value, index, self) => value && self.indexOf(value) === index);
        let valuesSorted = valuesUnique.sort((a, b) => a < b ? -1 : (a > b ? 1 : 0));
        return valuesSorted.map(value => ({ name: value, value })) as IFilterItemProps[];
    }

    /**
     * Get filters
     */
    private getFilters(): IFilterProps[] {
        return this.props.filterColumns.map(column => ({ column, items: this.getFilterItems(column) }));
    }

    /**
    * Get filtered allocations
    *
    * @param {ProjectResourceAllocation[]} allocations Allocations
    * @param {Object} activeFilters Active filters
    */
    private getFilteredAllocations(allocations: ProjectResourceAllocation[], activeFilters: { [fieldName: string]: string[] }): ProjectResourceAllocation[] {
        allocations = Object.keys(activeFilters).reduce((_allocations, fieldName) => {
            return _allocations.filter(_alloc => {
                return activeFilters[fieldName].filter(_filterValue => {
                    return getObjectValue(_alloc, fieldName, "").indexOf(_filterValue) !== -1;
                }).length > 0;
            });
        }, allocations);
        return allocations;
    }

    /**
     * Get data for the timeline
     */
    private getTimelineData({ users, allocations, activeFilters }: IResourceAllocationState) {
        allocations = this.getFilteredAllocations(allocations, activeFilters);
        const items = allocations.map((alloc, idx) => ({
            id: idx,
            title: alloc.toString(),
            group: getObjectValue<number>(alloc, "user.id", -1),
            type: alloc.type,
            ...alloc,
        }));
        let groups = users.map(user => ({ id: user.id, title: user.name }));
        groups = groups.sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0));
        groups = groups.filter(grp => allocations.filter(alloc => getObjectValue<number>(alloc, "user.id", -1) === grp.id).length > 0);
        return { groups, items };
    }

    /**
     * Timeline item renderer
     */
    @autobind
    private timelineItemRenderer({ item, itemContext, getItemProps }) {
        const itemOpacity = item.allocationPercentage < 30 ? 0.3 : (item.allocationPercentage / 100);
        const itemColor = item.allocationPercentage < 40 ? "#000" : "#fff";
        const props = getItemProps({
            style: {
                color: itemColor,
                border: "none",
                cursor: "pointer",
                outline: "none",
            },
        });
        switch (item.type) {
            case ProjectAllocationType.ProjectAllocation: {
                return (
                    <div
                        key={props.key}
                        className={props.className}
                        style={{
                            ...props.style,
                            background: "rgb(51,153,51)",
                            backgroundColor: `rgba(51,153,51,${itemOpacity})`,
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
                const isLeave = item.absence === __.getResource("Choice_GtResourceAbsence_Leave");
                const portfolioColorRGB = isLeave ? "205, 92, 92" : "26,111,179"; // Use red color if type=leave, else use blue portfolio color
                return (
                    <div
                        key={props.key}
                        className={props.className}
                        style={{
                            ...props.style,
                            background: `rgb(${portfolioColorRGB})`,
                            backgroundColor: `rgba(${portfolioColorRGB},${itemOpacity})`,
                        }}
                        title={itemContext.title}
                        onClick={event => this.onTimelineItemClick(event, item)}>
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

    /**
     * Fetch data, parses the data, and creates arrays for [users] and [allocations]
     */
    private async fetchData() {
        const [searchResult, itemsAvailability] = await Promise.all([
            this.searchAllocationItems(),
            this.fetchAvailabilityItems(),
        ]);

        const portfolioAbsenceItems = itemsAvailability.map(item => {
            const portfolioAbsence = new ProjectResourceAllocation(
                item.GtResourceUser.Title,
                item.GtStartDate,
                item.GtEndDate,
                item.GtResourceLoad,
                ProjectAllocationType.Absence,
                item.Title,
                item.GtResourceAbsenceComment,
            );
            portfolioAbsence.absence = item.GtResourceAbsence;
            return portfolioAbsence;
        });
        const projectAllocations = searchResult.map(res => {
            const projectAllocation = new ProjectResourceAllocation(
                res.RefinableString71, res.GtStartDateOWSDATE,
                res.GtEndDateOWSDATE,
                res.GtResourceLoadOWSNMBR,
                ProjectAllocationType.ProjectAllocation,
                res.Title,
                res.GtResourceAbsenceCommentOWSTEXT,
            );
            projectAllocation.project = { name: res.SiteTitle, url: res.SPWebUrl };
            projectAllocation.role = res.RefinableString72;
            return projectAllocation;
        });

        const allocations = [].concat(portfolioAbsenceItems, projectAllocations);

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
    private async searchAllocationItems(): Promise<any[]> {
        let queryTemplate: string;
        if (this.props.queryTemplate) {
            queryTemplate = this.props.queryTemplate;
        } else {
            queryTemplate = await DataSourceService.getSourceByName(this.props.dataSourceName);
        }
        if (queryTemplate) {
            try {
                const searchSettings = { QueryTemplate: queryTemplate, ...this.props.searchConfiguration };
                const { PrimarySearchResults } = await sp.search(searchSettings);
                return PrimarySearchResults;
            } catch (err) {
                throw err;
            }
        } else {
            throw null;
        }
    }

    /**
     * Fetches availability items from list on root
     */
    private async fetchAvailabilityItems(): Promise<Array<any>> {
        const web = new Web(_spPageContextInfo.siteAbsoluteUrl);
        const itemsAvailabilityList = web.lists.getByTitle(__.getResource("Lists_ResourceAllocation_Title"));
        const itemsAvailability = await itemsAvailabilityList
            .items
            .select("Title", "GtResourceUser/Title", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsence")
            .expand("GtResourceUser")
            .get();
        return itemsAvailability;
    }
}

export { IResourceAllocationProps, IResourceAllocationState };
