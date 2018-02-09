import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";
import SiteFields from "./SiteFields";

export default function ProjectDeliveries(language: number): IList {
    const { GtProductInteressent } = SiteFields(language);
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_ProjectDeliveries_Title", language),
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
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProductPhase", "GtProductQualityResponsible", "GtProductAcceptanceMethod", "GtProductAcceptanceResponsible", "GtProductAcceptanceDate"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_ProductionPhase_DisplayName", language),
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
}

