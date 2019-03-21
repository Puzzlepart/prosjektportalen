"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources");
exports.DOCUMENT_LIBRARY = Resources_1.default.getResource("Lists_Documents_Title");
exports.FRONTPAGE_LISTS = [
    {
        listTitle: Resources_1.default.getResource("Lists_Uncertainties_Title"),
        wpTitle: Resources_1.default.getResource("WebPart_UncertaintiesCurrentPhase_Title"),
    },
    {
        listTitle: Resources_1.default.getResource("Lists_Documents_Title"),
        wpTitle: Resources_1.default.getResource("WebPart_DocumentsCurrentPhase_Title"),
    },
    {
        listTitle: Resources_1.default.getResource("Lists_Tasks_Title"),
        wpTitle: Resources_1.default.getResource("WebPart_TasksCurrentPhase_Title"),
    },
    {
        listTitle: Resources_1.default.getResource("Lists_PhaseChecklist_Title"),
        wpTitle: Resources_1.default.getResource("WebPart_PhaseChecklistCurrentPhase_Title"),
    },
];
exports.FRONTPAGE_LISTS_VIEQUERY = `<Where><Or><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">{1}</Value></Eq><Eq><FieldRef Name="{0}" /><Value Type="TaxonomyFieldType">Flere faser</Value></Eq></Or></Where>`;
exports.PROJECTPHASE_FIELD = "GtProjectPhase";
exports.REQUESTEDPROJECTPHASE_FIELD = "GtRequestedPhase";
