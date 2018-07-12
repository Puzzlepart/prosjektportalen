import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";

const ProjectResources: IList = {
    Title: __.getResource("Lists_ProjectResources_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: "0x010088578E7470CC4AA68D5663464831070209",
    }],
    Views: [{
        Title: __.getResource("View_AllTasks_DisplayName"),
        ViewFields: ["GtResourceUser", "GtResourceRole", "GtStartDate", "GtEndDate", "GtProjectPhase", "Modified", "Editor"],
        AdditionalSettings: {
            RowLimit: 100,
            Paged: true,
            ViewQuery: "",
        },
    }],
};

export default ProjectResources;
