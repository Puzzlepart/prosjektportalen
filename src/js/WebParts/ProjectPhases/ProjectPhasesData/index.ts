import RESOURCE_MANAGER from "../../../@localization";
import { sp } from "sp-pnp-js";
import {
    CreateJsomContext,
    ExecuteJsomQuery,
} from "jsom-ctx";
import * as Util from "../../../Util";
import * as Project from "../../../Project";
import { PhaseModel } from "../../../Model";
import IProjectPhasesData, { IChecklistDataMap } from "./IProjectPhasesData";

/**
 * Fetch phases from the term set associated with PROJECTPHASE_FIELD
 */
async function fetchPases(): Promise<PhaseModel[]> {
    try {
        const jsomCtx = await CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
        const phaseField = sp.site.rootWeb.fields.getByInternalNameOrTitle(Project.PROJECTPHASE_FIELD);
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
 * Fetch phase checklist data items with stats per status
 */
async function fetchPhaseChecklist(): Promise<{ data: IChecklistDataMap, defaultViewUrl: string }> {
    try {
        const phaseChecklist = sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title"));
        const [items, defaultView] = await Promise.all([
            phaseChecklist.items.get(),
            phaseChecklist.defaultView.get(),
        ]);
        const itemsWithPhase = items.filter(f => f.GtProjectPhase);
        const data = itemsWithPhase.reduce((obj, item) => {
            const phase = item.GtProjectPhase.TermGuid;
            if (!obj.hasOwnProperty(phase)) {
                obj[phase] = { stats: {}, items: [] };
                obj[phase].stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Closed")] = 0;
                obj[phase].stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_NotRelevant")] = 0;
                obj[phase].stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Open")] = 0;
            }
            switch (item.GtChecklistStatus) {
                case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Closed"):
                    obj[phase].stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Closed")] += 1;
                    break;
                case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_NotRelevant"):
                    obj[phase].stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_NotRelevant")] += 1;
                    break;
                default:
                    obj[phase].stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Open")] += 1;
            }
            obj[phase].items.push(item);
            return obj;
        }, {});
        const defaultViewUrl = defaultView.ServerRelativeUrl;
        return { data, defaultViewUrl };
    } catch (err) {
        throw err;
    }
}

/**
 * Fetch data using sp-pnp-js and sp.taxonomy.js
 */
export async function fetchData(): Promise<IProjectPhasesData> {
    await Util.ensureTaxonomy();
    try {
        const [currentPhase, phases, phaseChecklist] = await Promise.all([
            Project.GetCurrentProjectPhase(),
            fetchPases(),
            fetchPhaseChecklist(),
        ]);
        const [activePhase] = phases.filter(p => currentPhase.Id === p.Id);
        return {
            activePhase,
            phases,
            checkListData: phaseChecklist.data,
            checkListDefaultViewUrl: phaseChecklist.defaultViewUrl,
        };
    } catch (err) {
        throw err;
    }
}

export { IProjectPhasesData };

