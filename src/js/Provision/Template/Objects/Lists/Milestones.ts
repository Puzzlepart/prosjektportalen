import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";

const Milestones: IList = {
    Title: __.getResource("Lists_Milestones_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: "0x01006E5BC3A4008144DC8ACEC0107AFC999A",
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Views: [{
        Title: __.getResource("View_AllItems_DisplayName"),
        ViewFields: ["LinkTitle", "GtMilestonePlannedDate", "GtMilestoneActualDate", "GtMilestoneStatus", "GtMilestoneComment"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<OrderBy>
              <FieldRef Name="GtMilestonePlannedDate" Ascending="TRUE" />
            </OrderBy>`,
        },
    }],
};

export default Milestones;
