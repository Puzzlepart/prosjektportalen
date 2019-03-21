import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery } from "@pnp/sp";
import DataSource from "../DataSource";
export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
    dataSource?: DataSource;
    dataSourceName?: string;
    projectRoot?: string;
    queryTemplate?: string;
}
export declare const ResourceAllocationDefaultProps: Partial<IResourceAllocationProps>;
