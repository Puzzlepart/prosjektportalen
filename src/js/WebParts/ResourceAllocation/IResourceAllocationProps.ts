import __ from "../../Resources";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery } from "@pnp/sp";

export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
    dataSourceName?: string;
    queryTemplate?: string;
    filterColumns?: IColumn[];
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
    filterColumns: [
        {
            key: "Project",
            fieldName: "Project",
            name: __.getResource("String_Project"),
            minWidth: 0,
        },
        {
            key: "Resource",
            fieldName: "Resource",
            name: __.getResource("String_Resource"),
            minWidth: 0,
        },
        {
            key: "Role",
            fieldName: "Role",
            name: __.getResource("String_Role"),
            minWidth: 0,
        },
    ],
};
