import __ from "../Resources";
import * as Util from "../Util";
import * as Config from "./Config";
import { CreateJsomContext, ExecuteJsomQuery } from "jsom-ctx";
import { PhaseModel } from "../WebParts/ProjectPhases/ProjectPhasesData";
/**
 * Get site pages library
 *
 * @param {SP.ClientContext} ctx Client context
 */
const GetProjectPropertiesList = (ctx: SP.ClientContext): SP.List<any> => {
    const projectPropertiesList = ctx.get_web().get_lists().getByTitle(__.getResource("Lists_ProjectProperties_Title"));
    return projectPropertiesList;
};

/**
 * Get welcome page list item
 *
 * @param {SP.ClientContext} ctx Client context
 * @param {boolean} loadClientObject Should the client object be loaded
 */
const GetProjectPropertiesItem = (ctx: SP.ClientContext, loadClientObject = false): SP.ListItem<any> => {
    const projectPropertiesList = ctx.get_web().get_lists().getByTitle(__.getResource("Lists_ProjectProperties_Title"));
    const welcomePage = projectPropertiesList.getItemById(1);
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
export const UpdateProjectPhase = (phaseName: string, phaseGuid: string, phaseFieldName: string): Promise<void> => new Promise<void>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const ctx = SP.ClientContext.get_current();
        const projectPropertiesList = GetProjectPropertiesList(ctx);
        const projectPropertiesItem = GetProjectPropertiesItem(ctx);
        Util.setTaxonomySingleValue(ctx, projectPropertiesList, projectPropertiesItem, phaseFieldName, phaseName, phaseGuid);
        ctx.executeQueryAsync(resolve, reject);
    });
});

/**
 * Get welcome page field values
 */
export const GetProjectPropertiesPageFieldValues = () => new Promise<any>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        const projectProperties = GetProjectPropertiesItem(ctx, true);
        ctx.executeQueryAsync(() => {
            resolve(projectProperties.get_fieldValues());
        }, reject);
    });
});

/**
 * Get current project phase
 */
export const GetCurrentProjectPhase = () => new Promise<PhaseModel>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        const projectPropertiesItem = GetProjectPropertiesItem(ctx, true);
        ctx.executeQueryAsync(() => {
            let phaseFieldValue = projectPropertiesItem.get_item(Config.PROJECTPHASE_FIELD);
            if (phaseFieldValue) {
                resolve(new PhaseModel().initSafe(phaseFieldValue));
            } else {
                resolve(null);
            }
        }, reject);
    });
});

/**
 * Get requested project phase
 */
export async function GetRequestedProjectPhase(): Promise<string> {
    try {
        const jsomCtx = await CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
        const projectPropertiesItem = GetProjectPropertiesItem(jsomCtx.clientContext, true);
        await ExecuteJsomQuery(jsomCtx, [{ clientObject: projectPropertiesItem }]);
        return projectPropertiesItem.get_item("GtRequestedPhase");
    } catch (err) {
        throw err;
    }
}

/**
 * Get phase iterations
 */
export async function GetPhaseIterations(): Promise<number> {
    try {
        const jsomCtx = await CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
        const projectPropertiesItem = GetProjectPropertiesItem(jsomCtx.clientContext, true);
        await ExecuteJsomQuery(jsomCtx, [{ clientObject: projectPropertiesItem }]);
        return projectPropertiesItem.get_item("GtPhaseIterations");
    } catch (err) {
        throw err;
    }
}

