import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery } from "@pnp/sp";
export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
    dataSource?: string;
}
export declare const ResourceAllocationDefaultProps: Partial<IResourceAllocationProps>;
