import Localization from "localization";

/**
 * Document library
 */
export const DOCUMENT_LIBRARY = Localization.getResource("Lists_Documents_Title");

/**
 * Frontpage lists
 */
export const FRONTPAGE_LISTS = [
    {
        listTitle: Localization.getResource("Lists_Uncertainties_Title"),
        wpTitle: Localization.getResource("WebPart_UncertaintiesCurrentPhase_Title"),
    },
    {
        listTitle: Localization.getResource("Lists_Documents_Title"),
        wpTitle: Localization.getResource("WebPart_DocumentsCurrentPhase_Title"),
    },
    {
        listTitle: Localization.getResource("Lists_Tasks_Title"),
        wpTitle: Localization.getResource("WebPart_TasksCurrentPhase_Title"),
    },
];

/**
 * Frontpage lists view query
 */
export const FRONTPAGE_LISTS_VIEQUERY = `<Where><Or><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">{1}</Value></Eq><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">Flere faser</Value></Eq></Or></Where>`;

/**
 * Project phase field
 */
export const PROJECTPHASE_FIELD = "GtProjectPhase";
