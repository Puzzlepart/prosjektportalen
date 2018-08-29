import { IBaseWebPartProps } from "../@BaseWebPart";
import {SearchQuery} from "sp-pnp-js";

export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
 }

export const ResourceAllocationDefaultProps: Partial<IResourceAllocationProps> = {
    searchConfiguration: {
        Querytext: "*",
        QueryTemplate: "(ContentTypeId:0x010088578E7470CC4AA68D5663464831070209*) Path:{SiteCollection.URL} LastModifiedTime>{Today-7}",
        RowLimit: 500,
        TrimDuplicates: false,
        SelectProperties: [
            "Path",
            "SPWebUrl",
            "WebId",
            "GtResourceLoadOWSNMBR",
            "SiteTitle",
            "GtStartDateOWSDATE",
            "GtEndDateOWSDATE",
            "RefinableString71",
            "RefinableString72",
            "RefinableString52",
        ],
    },
};
