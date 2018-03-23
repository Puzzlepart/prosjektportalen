import RESOURCE_MANAGER from "../../../../Resources";
import { IList } from "sp-pnp-provisioning/lib/schema";

const Uncertainties: IList =  {
    Title: RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title"),
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
        Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
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

export default Uncertainties;
