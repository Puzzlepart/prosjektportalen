import {
    Logger,
    LogLevel,
} from "sp-pnp-js";
import * as Util from "../Util";

/**
 * Updates welcome page with a new phase
 *
 * @param phaseName Phase term name
 * @param phaseGuid Phase term GUID
 * @param phaseFieldName Phase field name
 */
const UpdatePhaseWelcomePage = (phaseName: string, phaseGuid: string, phaseFieldName: string): Promise<void> => new Promise<void>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        let ctx = SP.ClientContext.get_current(),
            list = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId),
            listItem = list.getItemById(_spPageContextInfo.pageItemId);
        Util.setTaxonomySingleValue(ctx, list, listItem, phaseFieldName, phaseName, phaseGuid);
        ctx.executeQueryAsync(() => {
            Logger.log({ message: `ChangeProjectPhase: Updated welcome page with new project phase`, data: arguments, level: LogLevel.Info });
            resolve();
        }, _ => {
            Logger.log({ message: `ChangeProjectPhase: Failed to update welcome page with new project phase`, data: arguments, level: LogLevel.Info });
            reject();
        });
    });
});

export default UpdatePhaseWelcomePage;
