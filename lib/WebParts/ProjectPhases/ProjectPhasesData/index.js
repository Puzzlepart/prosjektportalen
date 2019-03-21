"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../Resources");
const sp_1 = require("@pnp/sp");
const jsom_ctx_1 = require("jsom-ctx");
const Util = require("../../../Util");
const Project_1 = require("../../../Project");
const PhaseModel_1 = require("./PhaseModel");
exports.PhaseModel = PhaseModel_1.default;
function getTaxonomyHiddenListItems(termSetId) {
    return __awaiter(this, void 0, void 0, function* () {
        const thlItems = yield sp_1.sp.site.rootWeb.lists.getByTitle("TaxonomyHiddenList").items.select("ID", "CatchAllDataLabel").filter(`IdForTermSet eq '${termSetId}'`).get();
        return thlItems;
    });
}
/**
 * Fetch available phases from the term set associated with PROJECTPHASE_FIELD
 *
 * @param {boolean} gatesEnabled Gates enabled
 */
function fetchAvailablePhases(gatesEnabled) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsomCtx = yield jsom_ctx_1.CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
            const phaseField = sp_1.sp.site.rootWeb.fields.getByInternalNameOrTitle(Project_1.PROJECTPHASE_FIELD);
            const { TermSetId } = yield phaseField.select("TermSetId").get();
            const taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(jsomCtx.clientContext);
            const termStore = taxSession.getDefaultSiteCollectionTermStore();
            const termSet = termStore.getTermSet(new SP.Guid(TermSetId));
            const terms = termSet.getAllTerms();
            const [thlItems] = yield Promise.all([getTaxonomyHiddenListItems(TermSetId), jsom_ctx_1.ExecuteJsomQuery(jsomCtx, [{ clientObject: terms }])]);
            const termsData = terms.get_data();
            const phases = termsData
                .map(term => {
                const model = new PhaseModel_1.default().initFromSpTaxonomyTerm(term, gatesEnabled);
                const [thlItem] = thlItems.filter(i => i.CatchAllDataLabel && i.CatchAllDataLabel.indexOf(model.Name) !== -1);
                if (thlItem) {
                    model.TaxonomyHiddenListId = thlItem.ID;
                }
                return model;
            })
                .filter(pm => {
                if (!pm.ShowOnFrontpage) {
                    return false;
                }
                if (pm.Type === "Gate" && !gatesEnabled) {
                    return false;
                }
                return true;
            })
                .map((pm, idx) => {
                pm.Index = idx;
                return pm;
            });
            return phases;
        }
        catch (err) {
            throw err;
        }
    });
}
/**
 * Fetch phase checklist items with phase
 */
function fetchChecklistItemsWithPhase(phaseChecklist) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield phaseChecklist
                .items
                .select("ID", "Title", "GtProjectPhase", "GtChecklistStatus", "GtComment")
                .filter(`GtChecklistStatus ne '${Resources_1.default.getResource("Choice_GtChecklistStatus_Archived")}'`)
                .get();
            const itemsWithPhase = items.filter(f => f.GtProjectPhase);
            return itemsWithPhase;
        }
        catch (err) {
            throw err;
        }
    });
}
/**
 * Merge phases with checklist items
 *
 * @param {PhaseModel[]} phases Phases
 * @param {IChecklistItem[]} checklistItemsWithPhase Checklist items that has phase set
 * @param {string} checkListDefaultViewUrl Checklist default view URL
 */
function mergePhasesWithChecklistItems(phases, checklistItemsWithPhase, checkListDefaultViewUrl) {
    let mergedPhases = phases.map(phase => {
        const checklistItemsForPhase = checklistItemsWithPhase.filter(item => item.GtProjectPhase.TermGuid === phase.Id);
        checklistItemsForPhase.forEach(({ GtChecklistStatus }) => {
            switch (GtChecklistStatus) {
                case Resources_1.default.getResource("Choice_GtChecklistStatus_Open"):
                    phase.Checklist.stats[Resources_1.default.getResource("ProjectPhases_Stats_Open")] += 1;
                    break;
                case Resources_1.default.getResource("Choice_GtChecklistStatus_Closed"):
                    phase.Checklist.stats[Resources_1.default.getResource("ProjectPhases_Stats_Closed")] += 1;
                    break;
                case Resources_1.default.getResource("Choice_GtChecklistStatus_NotRelevant"):
                    phase.Checklist.stats[Resources_1.default.getResource("ProjectPhases_Stats_NotRelevant")] += 1;
                    break;
            }
        });
        phase.Checklist.items = checklistItemsForPhase;
        phase.Checklist.defaultViewUrl = checkListDefaultViewUrl;
        return phase;
    });
    return mergedPhases;
}
/**
 * Fetch data using @pnp/sp and sp.taxonomy.js
 *
 * @param {List} phaseChecklist Phase checklist
 * @param {boolean} gatesEnabled Gates enabled
 */
function fetchData(phaseChecklist, gatesEnabled) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Util.ensureTaxonomy();
        try {
            const [checklistItemsWithPhase, checklistDefaultViewUrl, currentPhase, { GtRequestedPhase, GtPhaseIterations }, availablePhases,] = yield Promise.all([
                fetchChecklistItemsWithPhase(phaseChecklist),
                phaseChecklist.defaultView.select("ServerRelativeUrl").get(),
                Project_1.GetCurrentProjectPhase(),
                Project_1.GetWelcomePageFieldValues(),
                fetchAvailablePhases(gatesEnabled),
            ]);
            let phases = mergePhasesWithChecklistItems(availablePhases, checklistItemsWithPhase, checklistDefaultViewUrl.ServerRelativeUrl);
            let activePhase;
            if (currentPhase) {
                [activePhase] = availablePhases.filter(p => currentPhase.Id === p.Id);
            }
            return {
                activePhase,
                requestedPhase: GtRequestedPhase,
                phaseIterations: GtPhaseIterations,
                phases,
            };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.fetchData = fetchData;
