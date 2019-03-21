import { IBaseWebPartProps } from "../@BaseWebPart";
import { IListProps } from "../@Components/List";
export default interface IDeliveriesOverviewProps extends IBaseWebPartProps, IListProps {
    dataSource?: string;
}
export declare const DeliveriesOverviewDefaultProps: Partial<IDeliveriesOverviewProps>;
