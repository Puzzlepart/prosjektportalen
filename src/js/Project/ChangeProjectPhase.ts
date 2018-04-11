import * as Util from "../Util";
import RESOURCE_MANAGER from "../Resources";
import {
    UpdatePhaseWelcomePage,
    UpdateFrontpageListViews,
    SetMetadataDefaultsForLibrary,
    EnsureLocationBasedMetadataDefaultsReceiverForLibrary,
    PROJECTPHASE_FIELD,
} from "./";


/**
 * Change project phase
 *
 * @param {any} newPhase New phase
 * @param {boolean} useWaitDialog Should a wait dialog be used
 */
async function ChangeProjectPhase(newPhase: any, useWaitDialog = true): Promise<void> {
    let [Title, Message] = RESOURCE_MANAGER.getResource("ProjectPhases_ChangingPhase").split(",");

    let waitDlg = null;
    if (useWaitDialog) {
        waitDlg = new Util.WaitDialog(Title, String.format(Message, newPhase.Name), 120, 600);
        waitDlg.start(300);
    }
    try {
        await UpdatePhaseWelcomePage(newPhase.Name, newPhase.Id, PROJECTPHASE_FIELD);
        await Promise.all([
            UpdateFrontpageListViews(newPhase.Name),
            SetMetadataDefaultsForLibrary([{
                fieldName: "GtProjectPhase",
                fieldType: "Taxonomy",
            },
            {
                fieldName: "GtProjectType",
                fieldType: "TaxonomyMulti",
            },
            {
                fieldName: "GtProjectServiceArea",
                fieldType: "TaxonomyMulti",
            },
            {
                fieldName: "GtProjectFinanceName",
                fieldType: "Text",
            },
            {
                fieldName: "GtProjectNumber",
                fieldType: "Text",
            },
            {
                fieldName: "GtArchiveReference",
                fieldType: "Text",
            }]),
            EnsureLocationBasedMetadataDefaultsReceiverForLibrary(),
        ]);
        if (waitDlg) {
            waitDlg.close(null);
        }
        return;
    } catch (err) {
        throw err;
    }
}

export default ChangeProjectPhase;
