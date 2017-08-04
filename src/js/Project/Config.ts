/**
 * Document library
 */
export const DOCUMENT_LIBRARY = __("Lists_Documents_Title");

/**
 * Frontpage lists
 */
export const FRONTPAGE_LISTS = [__("Lists_Uncertainties_Title"), __("Lists_Documents_Title"), __("Lists_Tasks_Title"),];

/**
 * Frontpage lists view query
 */
export const FRONTPAGE_LISTS_VIEQUERY = `<Where><Or><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">{1}</Value></Eq><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">Flere faser</Value></Eq></Or></Where>`;

/**
 * Project phase field
 */
export const PROJECTPHASE_FIELD = "GtProjectPhase";
