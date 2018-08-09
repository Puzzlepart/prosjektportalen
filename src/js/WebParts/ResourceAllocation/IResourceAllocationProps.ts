import { IBaseWebPartProps } from "../@BaseWebPart";
import {SearchQuery} from "sp-pnp-js";

export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
 }

export const ResourceAllocationDefaultProps: Partial<IResourceAllocationProps> = {
    searchConfiguration: {
        Querytext: "*",
        QueryTemplate: "(ContentTypeId:0x010088578E7470CC4AA68D5663464831070209* OR ContentTypeId:0x010088578E7470CC4AA68D5663464831070210*) Path:{SiteCollection.URL}",
        RowLimit: 500,
        TrimDuplicates: false,
        SelectProperties: [
            "Path",
            "ContentTypeID",
            "ListItemID",
            "SPWebUrl",
            "WebId",
            "GtResourceLoadOWSNMBR",
            "SiteTitle",
            "GtStartDateOWSDATE",
            "GtEndDateOWSDATE",
            "GtApprovedOWSBOOL",
            "RefinableString71",
            "RefinableString72",
            "RefinableString73",
            "RefinableString52",
        ],
    },
};
