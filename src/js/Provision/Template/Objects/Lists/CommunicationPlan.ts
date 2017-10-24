import RESOURCE_MANAGER from "../../../../@localization";
import { GtCommunicationTarget } from "./SiteFields";
import { IList } from "sp-pnp-provisioning/lib/schema";

const CommunicationPlan: IList = {
    Title: RESOURCE_MANAGER.getResource("Lists_CommunicationPlan_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: "0x010088578E7470CC4AA68D5663464831070203",
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [GtCommunicationTarget],
    Views: [{
        Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
        ViewFields: ["LinkTitle", "GtProjectPhase", "GtActionDate", "GtActionResponsible"],
        AdditionalSettings: {
            RowLimit: 10,
            Paged: true,
            ViewQuery: "",
        },
    }],
};

export default CommunicationPlan;
