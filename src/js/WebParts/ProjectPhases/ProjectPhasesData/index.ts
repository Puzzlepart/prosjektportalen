import __ from "../../../Resources";
import { sp, List } from "@pnp/sp";
import { CreateJsomContext, ExecuteJsomQuery } from "jsom-ctx";
import * as Util from "../../../Util";
import { PROJECTPHASE_FIELD, GetCurrentProjectPhase, GetWelcomePageFieldValues } from "../../../Project";
import PhaseModel from "./PhaseModel";
import IChecklistItem from "./IChecklistItem";
import IProjectPhasesData from "./IProjectPhasesData";

async function getTaxonomyHiddenListItems(termSetId: string) {
    const thlItems = await sp.site.rootWeb.lists.getByTitle("TaxonomyHiddenList").items.select("ID", "CatchAllDataLabel").filter(`IdForTermSet eq '${termSetId}'`).get();
    return thlItems;
}

/**
 * Fetch available phases from the term set associated with PROJECTPHASE_FIELD
 *
 * @param {boolean} gatesEnabled Gates enabled
 */
async function fetchAvailablePhases(gatesEnabled: boolean): Promise<PhaseModel[]> {
    try {
        const jsomCtx = await CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
        const phaseField = sp.site.rootWeb.fields.getByInternalNameOrTitle(Project.PROJECTPHASE_FIELD);
        const { TermSetId } = await phaseField.select("TermSetId").get();
        const taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(jsomCtx.clientContext);
        const termStore = taxSession.getDefaultSiteCollectionTermStore();
        const termSet = termStore.getTermSet(new SP.Guid(TermSetId));
        const terms = termSet.getAllTerms();
        const [thlItems] = await Promise.all([getTaxonomyHiddenListItems(TermSetId), ExecuteJsomQuery(jsomCtx, [{ clientObject: terms }])]);
        const termsData = terms.get_data();
        const phases = termsData
            .map(term => {
                const model = new PhaseModel().initFromSpTaxonomyTerm(term, gatesEnabled);
                const [thlItem] = thlItems.filter(i => i.CatchAllDataLabel.indexOf(model.Name) !== -1);
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
    } catch (err) {
        throw err;
    }
}

/**
 * Fetch phase checklist items with phase
 */
async function fetchChecklistItemsWithPhase(phaseChecklist: List): Promise<IChecklistItem[]> {
    try {
        const items = await phaseChecklist
            .items
            .select("ID", "Title", "GtProjectPhase", "GtChecklistStatus", "GtComment")
            .filter(`GtChecklistStatus ne '${__.getResource("Choice_GtChecklistStatus_Archived")}'`)
            .get();
        const itemsWithPhase = items.filter(f => f.GtProjectPhase);
        return itemsWithPhase;
    } catch (err) {
        throw err;
    }
}

/**
 * Merge phases with checklist items
 *
 * @param {PhaseModel[]} phases Phases
 * @param {IChecklistItem[]} checklistItemsWithPhase Checklist items that has phase set
 * @param {string} checkListDefaultViewUrl Checklist default view URL
 */
function mergePhasesWithChecklistItems(phases: PhaseModel[], checklistItemsWithPhase: IChecklistItem[], checkListDefaultViewUrl: string) {
    let mergedPhases = phases.map(phase => {
        const checklistItemsForPhase = checklistItemsWithPhase.filter(item => item.GtProjectPhase.TermGuid === phase.Id);
        checklistItemsForPhase.forEach(({ GtChecklistStatus }) => {
            switch (GtChecklistStatus) {
                case __.getResource("Choice_GtChecklistStatus_Open"):
                    phase.Checklist.stats[__.getResource("ProjectPhases_Stats_Open")] += 1;
                    break;
                case __.getResource("Choice_GtChecklistStatus_Closed"):
                    phase.Checklist.stats[__.getResource("ProjectPhases_Stats_Closed")] += 1;
                    break;
                case __.getResource("Choice_GtChecklistStatus_NotRelevant"):
                    phase.Checklist.stats[__.getResource("ProjectPhases_Stats_NotRelevant")] += 1;
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
export async function fetchData(phaseChecklist: List, gatesEnabled: boolean): Promise<IProjectPhasesData> {
    await Util.ensureTaxonomy();
    try {
        const [
            checklistItemsWithPhase,
            checklistDefaultViewUrl,
            currentPhase,
            { GtRequestedPhase, GtPhaseIterations },
            availablePhases,
        ] = await Promise.all([
            fetchChecklistItemsWithPhase(phaseChecklist),
            phaseChecklist.defaultView.select("ServerRelativeUrl").get(),
            GetCurrentProjectPhase(),
            GetWelcomePageFieldValues(),
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
    } catch (err) {
        throw err;
    }
}

export { PhaseModel, IChecklistItem, IProjectPhasesData };

