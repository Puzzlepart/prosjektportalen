import __ from '../Resources'

export const DOCUMENT_LIBRARY = __.getResource('Lists_Documents_Title')
export const FRONTPAGE_LISTS = [
    {
        listTitle: __.getResource('Lists_Uncertainties_Title'),
        wpTitle: __.getResource('WebPart_UncertaintiesCurrentPhase_Title'),
    },
    {
        listTitle: __.getResource('Lists_Documents_Title'),
        wpTitle: __.getResource('WebPart_DocumentsCurrentPhase_Title'),
    },
    {
        listTitle: __.getResource('Lists_Tasks_Title'),
        wpTitle: __.getResource('WebPart_TasksCurrentPhase_Title'),
    },
    {
        listTitle: __.getResource('Lists_PhaseChecklist_Title'),
        wpTitle: __.getResource('WebPart_PhaseChecklistCurrentPhase_Title'),
    },
]
export const FRONTPAGE_LISTS_VIEQUERY = '<Where><Or><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">{1}</Value></Eq><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">Flere faser</Value></Eq></Or></Where>'
export const PROJECTPHASE_FIELD = 'GtProjectPhase'
export const REQUESTEDPROJECTPHASE_FIELD = 'GtRequestedPhase'
