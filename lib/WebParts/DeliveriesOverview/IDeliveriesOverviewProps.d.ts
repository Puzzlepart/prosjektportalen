import { IBaseWebPartProps } from "../@BaseWebPart";
import { IListProps } from "../@Components/List";
import DataSource from "../DataSource";
export default interface IDeliveriesOverviewProps extends IBaseWebPartProps, IListProps {
    dataSourceName?: string;
    dataSource?: DataSource;
    queryTemplate?: string;
}
export declare const DeliveriesOverviewDefaultProps: Partial<IDeliveriesOverviewProps>;
