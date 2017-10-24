import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";
import { GtProjectLogProductLookup } from "./SiteFields";

const ProjectLog: IList = {
    Title: RESOURCE_MANAGER.getResource("Lists_ProjectLog_Title"),
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
        Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
        ViewFields: ["LinkTitle", "GtProjectLogType", "GtProjectLogReporter", "GtProjectLogResponsible", "GtProjectLogConsequence", "GtProjectLogRecommendation", "GtProjectLogExperience"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    }],
};

export default ProjectLog;
