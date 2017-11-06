import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";
import { GtProductInteressent } from "./SiteFields";

const ProjectDeliveries: IList = {
    Title: RESOURCE_MANAGER.getResource("Lists_ProjectDeliveries_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: "0x010088578E7470CC4AA68D5663464831070205",
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [GtProductInteressent],
    Views: [{
        Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
        ViewFields: ["LinkTitle", "GtProductPhase", "GtProductQualityResponsible", "GtProductAcceptanceMethod", "GtProductAcceptanceResponsible", "GtProductAcceptanceDate"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    },
    {
        Title: RESOURCE_MANAGER.getResource("View_ProductionPhase_DisplayName"),
        ViewFields: ["LinkTitle", "GtProductQualityResponsible", "GtProductAcceptanceMethod", "GtProductAcceptanceResponsible", "GtProductAcceptanceDate"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
            <FieldRef Name="GtProductPhase" />
          </GroupBy>`,
        },
    }],
};

export default ProjectDeliveries;
