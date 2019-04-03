import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery, Web } from "@pnp/sp";
import DataSource from "../DataSource";

export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
    dataSource?: DataSource;
    dataSourceName?: string;
    queryTemplate?: string;
    rootWeb?: Web;
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
