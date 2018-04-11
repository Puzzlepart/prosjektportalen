import RESOURCE_MANAGER from "../Resources";

export const DOCUMENT_LIBRARY = RESOURCE_MANAGER.getResource("Lists_Documents_Title");
export const FRONTPAGE_LISTS = [
    {
        listTitle: RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title"),
        wpTitle: RESOURCE_MANAGER.getResource("WebPart_UncertaintiesCurrentPhase_Title"),
    },
    {
        listTitle: RESOURCE_MANAGER.getResource("Lists_Documents_Title"),
        wpTitle: RESOURCE_MANAGER.getResource("WebPart_DocumentsCurrentPhase_Title"),
    },
    {
        listTitle: RESOURCE_MANAGER.getResource("Lists_Tasks_Title"),
        wpTitle: RESOURCE_MANAGER.getResource("WebPart_TasksCurrentPhase_Title"),
    },
    {
        listTitle: RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title"),
        wpTitle: RESOURCE_MANAGER.getResource("WebPart_PhaseChecklistCurrentPhase_Title"),
    },
];
export const FRONTPAGE_LISTS_VIEQUERY = `<Where><Or><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">{1}</Value></Eq><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">Flere faser</Value></Eq></Or></Where>`;
export const PROJECTPHASE_FIELD = "GtProjectPhase";
export const REQUESTEDPROJECTPHASE_FIELD = "GtRequestedPhase";
