import * as Util from "../Util";
import * as Config from "./Config";
import UpdatePhaseWelcomePage from "./UpdatePhaseWelcomePage";
import UpdateFrontpageListViews from "./UpdateFrontpageListViews";
import SetMetadataDefaults from "./SetMetadataDefaults";
import EnsureLocationBasedMetadataDefaultsReceiver from "./EnsureLocationBasedMetadataDefaultsReceiver";

/**
 * Change project phase
 *
 * @param newPhase New phase
 */
const ChangeProjectPhase = (newPhase: { Name: string, Id: string }): Promise<any[]> => {
    let [Title, Message] = __("ProjectPhases_ChangingPhase").split(",");
    const waitDlg = new Util.WaitDialog(Title, String.format(Message, newPhase.Name), 120, 600);
    waitDlg.start(300);
    return new Promise<any[]>((resolve, reject) => {
        UpdatePhaseWelcomePage(newPhase.Name, newPhase.Id, Config.PROJECTPHASE_FIELD).then(() => {
            Promise.all([
                UpdateFrontpageListViews(newPhase.Name),
                SetMetadataDefaults(newPhase.Name),
                EnsureLocationBasedMetadataDefaultsReceiver("ItemAdded"),
            ])
                .then(resolve)
                .catch(reject);
        }).catch(reject);
    });
};

export default ChangeProjectPhase;
