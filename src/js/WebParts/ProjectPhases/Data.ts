import { sp } from "sp-pnp-js";
import * as Util from "../../Util";
import {
    GetCurrentProjectPhase,
    PROJECTPHASE_FIELD,
} from "../../Project/";
import PhaseModel from "./PhaseModel";
import IChecklistData from "./IChecklistData";

/**
 * Fetch phases from the term set associated with PROJECTPHASE_FIELD
 */
const fetchPases = () => new Promise<PhaseModel[]>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        const rootWeb = sp.site.rootWeb;
        const phaseField = rootWeb.fields.getByInternalNameOrTitle(PROJECTPHASE_FIELD);
        phaseField.select("TermSetId").get().then(({ TermSetId }) => {
            let taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx),
                termStore = taxSession.getDefaultSiteCollectionTermStore(),
                termSet = termStore.getTermSet(new SP.Guid(TermSetId)),
                terms = termSet.getAllTerms();
            ctx.load(terms);
            ctx.executeQueryAsync(() => {
                const phases = terms.get_data().map(term => new PhaseModel(term));
                resolve(phases);
            }, reject);
        });
    });
});

/**
 * Fetch phase checklist data items with stats per status
 */
const fetchChecklistData = () => new Promise<{ [phase: string]: IChecklistData }>((resolve, reject) => {
    sp.web.lists.getByTitle(__("Lists_PhaseChecklist_Title")).items
        .select("Id", "Title", "GtProjectPhase", "GtChecklistStatus", "GtComment")
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
export const fetchData = () => new Promise<any>((resolve, reject) => {
    Util.ensureTaxonomy().then(() => {
        Promise.all([
            GetCurrentProjectPhase(),
            fetchPases(),
            fetchChecklistData(),
        ])
            .then(([activePhase, phases, checkListData]) => {
                resolve({
                    activePhase,
                    phases,
                    checkListData,
                });
            })
            .catch(reject);
    });
});


