import RESOURCE_MANAGER from "../../../../@localization";
import SiteFields from "./SiteFields";
import { IList } from "sp-pnp-provisioning/lib/schema";

export default function BenefitsAnalysis(language: number): IList {
    const { GtCommunicationTarget } = SiteFields(language);
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_CommunicationPlan_Title", language),
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
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtActionDate", "GtActionResponsible"],
            AdditionalSettings: {
                RowLimit: 10,
                Paged: true,
                ViewQuery: "",
            },
        }],
    };
}

