import * as Util from "../Util";
import * as Config from "./Config";
import { PhaseModel } from "../Model";

/**
 * Get current project phase
 */
const GetCurrentProjectPhase = () => new Promise<PhaseModel>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        let welcomePage = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId).getItemById(_spPageContextInfo.pageItemId);
        ctx.load(welcomePage);
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

export default GetCurrentProjectPhase;

