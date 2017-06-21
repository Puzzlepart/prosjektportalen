import {
    Logger,
    LogLevel,
} from "sp-pnp-js";
import * as Util from "../Util";
import * as Config from "./Config";

/**
 * Get current proejct phase
 */
const GetCurrentProjectPhase = () => new Promise<{ Id: string, Name: string, WssId: number }>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        let welcomePage = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId).getItemById(_spPageContextInfo.pageItemId);
        ctx.load(welcomePage);
        ctx.executeQueryAsync(() => {
            let phase = welcomePage.get_item(Config.PROJECTPHASE_FIELD);
            if (phase) {
                let safe = Util.getSafeTerm(phase);
                let currentPhase = {
                    Id: safe.get_termGuid(),
                    Name: safe.get_label(),
                    WssId: safe.get_wssId(),
                };
                Logger.log({ message: `ChangeProjectPhase: Retrieved current phase`, data: currentPhase, level: LogLevel.Info });
                resolve(currentPhase);
            } else {
                resolve(null);
            }
        }, reject);
    });
});

export default GetCurrentProjectPhase;

