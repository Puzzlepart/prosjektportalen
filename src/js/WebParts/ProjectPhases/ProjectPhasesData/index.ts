import RESOURCE_MANAGER from "../../../@localization";
import pnp, { List } from "sp-pnp-js";
import {
    CreateJsomContext,
    ExecuteJsomQuery,
} from "jsom-ctx";
import * as Util from "../../../Util";
import * as Project from "../../../Project";
import PhaseModel from "./PhaseModel";
import IChecklistItem from "./IChecklistItem";
import IProjectPhasesData from "./IProjectPhasesData";

/**
 * Fetch available phases from the term set associated with PROJECTPHASE_FIELD
 */
async function fetchAvailablePhases(): Promise<PhaseModel[]> {
    try {
        const jsomCtx = await CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
        const phaseField = pnp.sp.site.rootWeb.fields.getByInternalNameOrTitle(Project.PROJECTPHASE_FIELD);
        const { TermSetId } = await phaseField.select("TermSetId").get();
        let taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(jsomCtx.clientContext),
            termStore = taxSession.getDefaultSiteCollectionTermStore(),
            termSet = termStore.getTermSet(new SP.Guid(TermSetId)),
            terms = termSet.getAllTerms();
        await ExecuteJsomQuery(jsomCtx, [terms]);
        const phases = terms.get_data().map((term, index) => new PhaseModel(index, term)).filter(p => p.ShowOnFrontpage);
        return phases;
    } catch (err) {
        throw err;
    }
}

/**
 * Fetch phase checklist items with phase
 */
async function fetchChecklistItemsWithPhase(phaseChecklist): Promise<IChecklistItem[]> {
    try {
        const items = await phaseChecklist
            .items
            .select("ID", "Title", "GtProjectPhase", "GtChecklistStatus", "GtComment")
            .filter(`GtChecklistStatus ne '${RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Archived")}'`)
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
                case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Open"):
                    phase.Checklist.stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Open")] += 1;
                    break;
                case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Closed"):
                    phase.Checklist.stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Closed")] += 1;
                    break;
                case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_NotRelevant"):
                    phase.Checklist.stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_NotRelevant")] += 1;
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
 * Fetch data using sp-pnp-js and sp.taxonomy.js
 *
 * @param {List} phaseChecklist Phase checklist
 */
export async function fetchData(phaseChecklist: List): Promise<IProjectPhasesData> {
    await Util.ensureTaxonomy();
    try {
        const [checklistItemsWithPhase, checkListDefaultViewUrl] = await Promise.all([
            fetchChecklistItemsWithPhase(phaseChecklist),
            phaseChecklist.defaultView.get(),
        ]);
        const [currentPhase, availablePhases] = await Promise.all([
            Project.GetCurrentProjectPhase(),
            fetchAvailablePhases(),
        ]);
        let phases = mergePhasesWithChecklistItems(availablePhases, checklistItemsWithPhase, checkListDefaultViewUrl);
        let activePhase;
        if (currentPhase) {
            [activePhase] = availablePhases.filter(p => currentPhase.Id === p.Id);
        }
        return { activePhase, phases };
    } catch (err) {
        throw err;
    }
}

export { PhaseModel, IChecklistItem, IProjectPhasesData };

