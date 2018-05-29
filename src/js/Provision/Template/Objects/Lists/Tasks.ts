import RESOURCE_MANAGER from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";
import { GtProjectTaskComElement, GtProjectTaskRisk, GtProjectTaskProduct, GtProjectTaskChange, GtProjectTaskGain } from "./SiteFields";

const Tasks: IList = {
    Title: RESOURCE_MANAGER.getResource("Lists_Tasks_Title"),
    Description: "",
    Template: 171,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: "0x010800233B015F95174C9A8EB505493841DE8D",
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [
        GtProjectTaskComElement,
        GtProjectTaskRisk,
        GtProjectTaskProduct,
        GtProjectTaskChange,
        GtProjectTaskGain,
    ],
    Views: [{
        Title: RESOURCE_MANAGER.getResource("View_AllTasks_DisplayName"),
        ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    },
    {
        Title: RESOURCE_MANAGER.getResource("View_RelevantLinks_DisplayName"),
        ViewFields: ["LinkTitle", "GtProjectTaskChange", "GtProjectTaskGain", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    },
    {
        Title: RESOURCE_MANAGER.getResource("View_BenefitTasks_DisplayName"),
        ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor", "GtProjectTaskGain"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<Where><IsNotNull><FieldRef Name="GtProjectTaskGain" /></IsNotNull></Where>`,
        },
    }],
};

export default Tasks;
