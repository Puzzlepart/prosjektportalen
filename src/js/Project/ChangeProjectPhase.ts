import * as Util from "../Util";
import * as Config from "./Config";
import {
    UpdatePhaseWelcomePage,
    UpdateFrontpageListViews,
    SetMetadataDefaults,
    EnsureLocationBasedMetadataDefaultsReceiver,
} from "./";

/**
 * Change project phase
 *
 * @param {any} newPhase New phase
 * @param {boolean} useWaitDialog Should a wait dialog be used
 */
const ChangeProjectPhase = (newPhase: any, useWaitDialog = true) => new Promise<void>((resolve, reject) => {
    let [Title, Message] = __("ProjectPhases_ChangingPhase").split(",");

    let waitDlg = null;
    if (useWaitDialog) {
        waitDlg = new Util.WaitDialog(Title, String.format(Message, newPhase.Name), 120, 600);
        waitDlg.start(300);
    }
    UpdatePhaseWelcomePage(newPhase.Name, newPhase.Id, Config.PROJECTPHASE_FIELD)
        .then(() => {
            Promise.all([
                UpdateFrontpageListViews(newPhase.Name),
                SetMetadataDefaults(newPhase.Name),
                EnsureLocationBasedMetadataDefaultsReceiver(),
            ])
                .then(() => {
                    waitDlg.close(null);
                    resolve();
                })
                .catch(reject);
        })
        .catch(reject);
});

export default ChangeProjectPhase;
