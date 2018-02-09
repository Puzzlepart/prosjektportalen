import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";

export default function Milestones(language: number): IList {
return {
    Title: RESOURCE_MANAGER.getResource("Lists_Milestones_Title", language),
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
<<<<<<< HEAD
        Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
        ViewFields: ["LinkTitle", "GtProjectPhase", "GtMilestonePlannedDate", "GtMilestoneActualDate", "GtMilestoneStatus", "GtMilestoneComment"],
=======
        Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
        ViewFields: ["LinkTitle", "GtMilestonePlannedDate", "GtMilestoneActualDate", "GtMilestoneStatus", "GtMilestoneComment"],
>>>>>>> master
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<OrderBy>
              <FieldRef Name="GtMilestonePlannedDate" Ascending="TRUE" />
            </OrderBy>`,
        },
    }],
};
}
