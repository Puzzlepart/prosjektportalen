import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery } from "@pnp/sp";

export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
    dataSourceName?: string;
    queryTemplate?: string;
 }

export const ResourceAllocationDefaultProps: Partial<IResourceAllocationProps> = {
    searchConfiguration: {
        Querytext: "*",
        RowLimit: 500,
        TrimDuplicates: false,
        SelectProperties: [
            "Title",
            "Path",
            "SPWebUrl",
            "WebId",
            "GtResourceLoadOWSNMBR",
            "GtResourceAbsenceCommentOWSTEXT",
            "SiteTitle",
            "GtStartDateOWSDATE",
            "GtEndDateOWSDATE",
            "RefinableString71",
            "RefinableString72",
            "RefinableString52",
        ],
    },
    dataSourceName: "RESOURCEALLOCATION",
};
