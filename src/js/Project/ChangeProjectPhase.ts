import * as Util from "../Util";
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
const ChangeProjectPhase = (newPhase: any, useWaitDialog = true) => new Promise<void>((resolve, reject) => {
    let [Title, Message] = __("ProjectPhases_ChangingPhase").split(",");

    let waitDlg = null;
    if (useWaitDialog) {
        waitDlg = new Util.WaitDialog(Title, String.format(Message, newPhase.Name), 120, 600);
        waitDlg.start(300);
    }
    UpdatePhaseWelcomePage(newPhase.Name, newPhase.Id, PROJECTPHASE_FIELD)
        .then(() => {
            Promise.all([
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
            ])
                .then(() => {
                    if (waitDlg) {
                        waitDlg.close(null);
                    }
                    resolve();
                })
                .catch(reject);
        })
        .catch(reject);
});

export default ChangeProjectPhase;
