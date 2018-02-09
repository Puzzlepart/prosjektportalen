import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";

export default function Uncertainties(language: number): IList {
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title", language),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D566346483107020101",
        },
        {
            ContentTypeID: "0x010088578E7470CC4AA68D566346483107020102",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProximity",
                "GtRiskProbability",
                "GtRiskConsequence",
                "GtRiskFactor",
                "GtRiskProbabilityPostAction",
                "GtRiskConsequencePostAction",
                "GtRiskFactorPostAction",
                "GtRiskStrategy",
            ],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    };
}
