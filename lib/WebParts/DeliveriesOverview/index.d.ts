/// <reference types="react" />
import BaseWebPart from "../@BaseWebPart";
import IDeliveriesOverviewProps from "./IDeliveriesOverviewProps";
import IDeliveriesOverviewState from "./IDeliveriesOverviewState";
import DeliveryElement from "./DeliveryElement";
/**
 * Deliveries Overview SPA
 */
export default class DeliveriesOverview extends BaseWebPart<IDeliveriesOverviewProps, IDeliveriesOverviewState> {
    static displayName: string;
    static defaultProps: Partial<IDeliveriesOverviewProps>;
    /**
     * Constructor
     *
     * @param {IDeliveriesOverviewProps} props Props
     */
    constructor(props: IDeliveriesOverviewProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the <ProjectResources /> component
     */
    render(): JSX.Element;
    /**
     * Fetch items
     */
    protected _fetchItems(): Promise<DeliveryElement[]>;
}
export { IDeliveriesOverviewProps, IDeliveriesOverviewState, };
