import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";
import SiteFields from "./SiteFields";

export default function Tasks(language: number): IList {
    const { GtProjectTaskComElement, GtProjectTaskRisk, GtProjectTaskProduct, GtProjectTaskChange, GtProjectTaskGain } = SiteFields(language);
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_Tasks_Title", language),
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
            Title: RESOURCE_MANAGER.getResource("View_AllTasks_DisplayName", language),
            ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_RelevantLinks_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProjectTaskChange", "GtProjectTaskGain", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_BenefitTasks_DisplayName", language),
            ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor", "GtProjectTaskGain"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<Where><IsNotNull><FieldRef Name="GtProjectTaskGain" /></IsNotNull></Where>`,
            },
        }],
    };
}
