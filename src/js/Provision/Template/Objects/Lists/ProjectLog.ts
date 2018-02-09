import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";
import SiteFields from "./SiteFields";

export default function ProjectLog(language: number): IList {
    const { GtProjectLogProductLookup } = SiteFields(language);
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_ProjectLog_Title", language),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070206",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [GtProjectLogProductLookup],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProjectLogType", "GtProjectLogReporter", "GtProjectLogResponsible", "GtProjectLogConsequence", "GtProjectLogRecommendation", "GtProjectLogExperience"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    };
}
