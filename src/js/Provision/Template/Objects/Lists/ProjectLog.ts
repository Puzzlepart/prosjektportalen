import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";
import { GtProjectLogProductLookup } from "./SiteFields";

const ProjectLog: IList = {
    Title: __.getResource("Lists_ProjectLog_Title"),
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
        Title: __.getResource("View_AllItems_DisplayName"),
        ViewFields: ["LinkTitle", "GtProjectLogType", "GtProjectLogReporter", "GtProjectLogResponsible", "GtProjectLogConsequence", "GtProjectLogRecommendation", "GtProjectLogExperience"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    }],
};

export default ProjectLog;
