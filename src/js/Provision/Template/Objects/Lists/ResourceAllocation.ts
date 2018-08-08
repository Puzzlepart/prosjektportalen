import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";
import { GtProjectResourceLookup } from "./SiteFields";

const ResourceAllocation: IList = {
    Title: __.getResource("Lists_ResourceAllocation_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    Fields: [GtProjectResourceLookup],
    FieldRefs: [{
        ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
        Required: false,
        Hidden: true,
    }],
    ContentTypeBindings: [{
        ContentTypeID: "0x010088578E7470CC4AA68D5663464831070210",
    }],
    Views: [{
        Title: __.getResource("View_AllItems_DisplayName"),
        ViewFields: ["ID", "GtProjectResourceLookup", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtApproved"],
        AdditionalSettings: {
            RowLimit: 100,
            Paged: true,
            ViewQuery: "",
        },
    }],
};

export default ResourceAllocation;
