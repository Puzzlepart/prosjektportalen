/// <reference types="react" />
import IResourceAllocationProps from "./IResourceAllocationProps";
import IResourceAllocationState from "./IResourceAllocationState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Component: ResourceAllocation
 */
export default class ResourceAllocation extends BaseWebPart<IResourceAllocationProps, IResourceAllocationState> {
    static displayName: string;
    static defaultProps: Partial<IResourceAllocationProps>;
    /**
     * Constructor
     *
     * @param {IResourceAllocationProps} props Props
     */
    constructor(props: IResourceAllocationProps);
    /**
     * Component did mount
     *
     * Fetching required data, and updating state
     */
    componentDidMount(): Promise<void>;
    /**
     * Renders the <ResourceAllocation /> component
     */
    render(): JSX.Element;
    /**
     * Get data for the timeline
     */
    private getTimelineData;
    /**
     * Timeline item renderer
     */
    private timelineItemRenderer;
    /**
     * On timeline item click, sets {allocationDisplay} in component state
     *
     * @param {React.MouseEvent} event Event
     * @param {any} item Item
     */
    private onTimelineItemClick;
    /**
     * On dismiss ResourceAllocationDetailsModal, sets {allocationDisplay} to null in component state
     */
    private onResourceAllocationDetailsModalDismiss;
    private onSelectionUpdate;
    /**
     * Fetch data, parses the data, and creates arrays for [users] and [allocations]
     */
    private fetchData;
    /**
     * Searches for allocation items using sp.search
     */
    private searchAllocationItems;
    /**
     * Fetches availability items from list on root
     */
    private fetchAvailabilityItems;
}
export { IResourceAllocationProps, IResourceAllocationState };
