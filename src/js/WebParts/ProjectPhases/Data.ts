import { sp } from "sp-pnp-js";
import * as Util from "Util/";
import { GetCurrentProjectPhase } from "../../Project/";

export interface IChecklistData {
    stats: { [key: string]: number };
    items: any[];
}

/**
 * Fetch phases
 */
const fetchPases = () => new Promise<any[]>((resolve, reject) => {
    Util.LoadTaxonomy().then(() => {
        let ctx = SP.ClientContext.get_current(),
            taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx),
            termStore = taxSession.getDefaultSiteCollectionTermStore(),
            termSet = termStore.getTermSet(new SP.Guid(__("TermSetID_ProjectPhase"))),
            terms = termSet.getAllTerms();
        ctx.load(terms);
        ctx.executeQueryAsync(() => {
            resolve(terms.get_data().filter(t => t.get_localCustomProperties().ShowOnFrontpage !== "false").map(t => ({
                Id: t.get_id().toString(),
                Name: t.get_name(),
                PhaseLevel: t.get_localCustomProperties().PhaseLevel,
            })));
        }, reject);
    });
});

const phaseChecklist = sp.web.lists.getByTitle(__("Lists_PhaseChecklist_Title"));

/**
 * Fetch phase checklist data items with stats per status
 */
const fetchChecklistData = () => new Promise<{ [phase: string]: IChecklistData }>((resolve, reject) => {
    phaseChecklist.items
        .select("Id", "Title", "GtProjectPhase", "GtChecklistStatus")
        .get().then(items => {
            let data: { [phase: string]: IChecklistData } = {};
            items
                .filter(f => f.GtProjectPhase)
                .forEach(item => {
                    let phase = item.GtProjectPhase.TermGuid;
                    if (!data.hasOwnProperty(phase)) {
                        data[phase] = {
                            stats: {},
                            items: [],
                        };
                        data[phase].stats[__("ProjectPhases_Stats_Closed")] = 0;
                        data[phase].stats[__("ProjectPhases_Stats_NotRelevant")] = 0;
                        data[phase].stats[__("ProjectPhases_Stats_Open")] = 0;
                    }
                    switch (item.GtChecklistStatus) {
                        case __("Choice_GtChecklistStatus_Closed"):
                            data[phase].stats[__("ProjectPhases_Stats_Closed")] += 1;
                            break;
                        case __("Choice_GtChecklistStatus_NotRelevant"):
                            data[phase].stats[__("ProjectPhases_Stats_NotRelevant")] += 1;
                            break;
                        default:
                            data[phase].stats[__("ProjectPhases_Stats_Open")] += 1;
                    }
                    data[phase].items.push(item);
                });
            resolve(data);
        }, reject);
});

/**
 * Fetch data using sp-pnp-js and sp.taxonomy.js
 */
export const fetch = () => new Promise<any>((resolve, reject) => {
    Promise.all([
        GetCurrentProjectPhase(),
        fetchPases(),
        fetchChecklistData(),
    ]).then(([currentPhase, phases, checkListData]) => {
        resolve({
            currentPhase: currentPhase,
            phases: phases,
            checkListData: checkListData,
        });
    });
});


