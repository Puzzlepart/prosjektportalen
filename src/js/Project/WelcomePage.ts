import * as Util from "../Util";
import * as Config from "./Config";
import { PhaseModel } from "../Model";
/**
 * Get site pages library
 *
 * @param {SP.ClientContext} ctx Client context
 */
const GetSitePagesLibrary = (ctx: SP.ClientContext): SP.List<any> => {
    const sitePagesLib = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId);
    return sitePagesLib;
};

/**
 * Get welcome page list item
 *
 * @param {SP.ClientContext} ctx Client context
 * @param {boolean} loadClientObject Should the client object be loaded
 */
const GetWelcomePage = (ctx: SP.ClientContext, loadClientObject = false): SP.ListItem<any> => {
    const sitePages = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId);
    const welcomePage = sitePages.getItemById(3);
    if (loadClientObject) {
        ctx.load(welcomePage);
    }
    return welcomePage;
};

/**
 * Updates welcome page with a new phase
 *
 * @param {string} phaseName Phase term name
 * @param {string} phaseGuid Phase term GUID
 * @param {string} phaseFieldName Phase field name
 */
export const UpdatePhaseWelcomePage = (phaseName: string, phaseGuid: string, phaseFieldName: string): Promise<void> => new Promise<void>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const ctx = SP.ClientContext.get_current();
        const sitePagesLib = GetSitePagesLibrary(ctx);
        const welcomePage = GetWelcomePage(ctx);
        Util.setTaxonomySingleValue(ctx, sitePagesLib, welcomePage, phaseFieldName, phaseName, phaseGuid);
        ctx.executeQueryAsync(resolve, reject);
    });
});

/**
 * Get welcome page field values
 */
export const GetWelcomePageFieldValues = () => new Promise<any>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        const welcomePage = GetWelcomePage(ctx, true);
        ctx.executeQueryAsync(() => {
            resolve(welcomePage.get_fieldValues());
        }, reject);
    });
});

/**
 * Get current project phase
 */
export const GetCurrentProjectPhase = () => new Promise<PhaseModel>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        const welcomePage = GetWelcomePage(ctx, true);
        ctx.executeQueryAsync(() => {
            let phaseFieldValue = welcomePage.get_item(Config.PROJECTPHASE_FIELD);
            if (phaseFieldValue) {
                resolve(new PhaseModel(null).initSafe(phaseFieldValue));
            } else {
                resolve(null);
            }
        }, reject);
    });
});


