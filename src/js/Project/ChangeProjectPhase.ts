import { sp, Logger, LogLevel } from "sp-pnp-js";
import * as Util from "Util";
import * as Config from "./Config";

/**
 * Updates welcome page with a new phase
 *
 * @param phaseName Phase term name
 * @param phaseGuid Phase term GUID
 * @param phaseFieldName Phase field name
 */
const UpdateWelcomePage = (phaseName: string, phaseGuid: string, phaseFieldName: string): Promise<void> => new Promise<void>((resolve, reject) => {
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

/**
 * Get current proejct phase
 */
export const GetCurrentProjectPhase = () => new Promise<{ Id: string, Name: string, WssId: number }>((resolve, reject) => {
    let ctx = SP.ClientContext.get_current(),
        welcomePage = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId).getItemById(_spPageContextInfo.pageItemId);
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

/**
 * Set metadata defaults
 *
 * @param phaseName Phase term name
 */
const SetMetadataDefaults = (phaseName: string): Promise<any> => new Promise<any>((resolve, reject) => {
    GetCurrentProjectPhase().then(({ Id, WssId }) => {
        sp.web.lists.getByTitle(Config.DOCUMENT_LIBRARY).expand("RootFolder").get().then(({ RootFolder: { ServerRelativeUrl: rootFolderServerRelativeUrl } }) => {
            console.log(rootFolderServerRelativeUrl);
            const contents = [`<MetadataDefaults><a href="${Util.encodeSpaces(rootFolderServerRelativeUrl)}"><DefaultValue FieldName="${Config.PROJECTPHASE_FIELD}">${WssId};#${phaseName}|${Id}</DefaultValue></a></MetadataDefaults>`];
            const blob = new Blob(contents, {
                type: "text/plain",
            });
            sp.web.getFolderByServerRelativeUrl(`${rootFolderServerRelativeUrl}/Forms`).files.add("client_LocationBasedDefaults.html", blob, true).then(() => {
                Logger.log({ message: `ChangeProjectPhase: Updated client_LocationBasedDefaults.html for ${Config.DOCUMENT_LIBRARY}`, data: contents, level: LogLevel.Info });
                resolve();
            }, reject);
        });
    }, reject);
});

/**
 * Ensures LocationBasedMetadataDefaultsReceiver
 */
const EnsureLocationBasedMetadataDefaultsReceiverItemAdded = (type: string): Promise<any> => new Promise<any>((resolve, reject) => {
    const recName = `LocationBasedMetadataDefaultsReceiver ${type}`;
    let ctx = SP.ClientContext.get_current(),
        eventReceivers = ctx.get_web().get_lists().getByTitle(Config.DOCUMENT_LIBRARY).get_eventReceivers();
    ctx.load(eventReceivers);
    ctx.executeQueryAsync(() => {
        let eventReceiverExists = eventReceivers.get_data().filter(er => er.get_receiverName() === recName).length > 0;
        if (!eventReceiverExists) {
            let eventRecCreationInfo = new SP.EventReceiverDefinitionCreationInformation();
            eventRecCreationInfo.set_receiverName(recName);
            eventRecCreationInfo.set_synchronization(1);
            eventRecCreationInfo.set_sequenceNumber(1000);
            eventRecCreationInfo.set_receiverAssembly("Microsoft.Office.DocumentManagement, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c");
            eventRecCreationInfo.set_receiverClass("Microsoft.Office.DocumentManagement.LocationBasedMetadataDefaultsReceiver");
            eventRecCreationInfo.set_eventType(SP.EventReceiverType.itemAdded);
            eventReceivers.add(eventRecCreationInfo);
        }
        if (ctx.get_hasPendingRequest()) {
            Logger.log({ message: `ChangeProjectPhase: Event receiver ensured`, data: recName, level: LogLevel.Info });
            ctx.executeQueryAsync(resolve, reject);
        } else {
            Logger.log({ message: `ChangeProjectPhase: Event receiver already ensured`, data: recName, level: LogLevel.Info });
            resolve();
        }
    }, reject);
});

/**
 * Updates front page list views
 *
 * @param phaseName Phase term name
 */
const UpdateFrontpageListViews = (phaseName: string): Promise<any[]> => new Promise<any[]>((resolve, reject) => {
    const viewQuery = String.format(Config.FRONTPAGE_LISTS_VIEQUERY, Config.PROJECTPHASE_FIELD, phaseName);
    let getViewsPromises = Config.FRONTPAGE_LISTS.map(listTitle => sp.web.lists.getByTitle(listTitle).views.get());
    Promise.all(getViewsPromises).then(listViews => {
        let updateViewsPromises = [];
        listViews.forEach((views, i) => {
            let fViews = views.filter(v => v.ServerRelativeUrl.indexOf(__("Project_WelcomePage")) !== -1);
            updateViewsPromises = updateViewsPromises.concat(fViews.map(v => sp.web.lists.getByTitle(Config.FRONTPAGE_LISTS[i]).views.getById(v.Id).update({
                ViewQuery: viewQuery,
            })));
        });
        Promise.all(updateViewsPromises).then(() => {
            Logger.log({ message: `ChangeProjectPhase: Successfully updated front page list views`, data: { phaseName: phaseName, lists: Config.FRONTPAGE_LISTS }, level: LogLevel.Info });
            resolve();
        }, () => {
            Logger.log({ message: `ChangeProjectPhase: Failed to update front page list views`, data: { phaseName: phaseName, lists: Config.FRONTPAGE_LISTS }, level: LogLevel.Info });
            UpdateFrontpageListViews(phaseName).then(resolve, () => {
                UpdateFrontpageListViews(phaseName).then(resolve, reject);
            });
        });
    }, () => {
        Logger.log({ message: `ChangeProjectPhase: Failed to update front page list views`, data: { phaseName: phaseName, lists: Config.FRONTPAGE_LISTS }, level: LogLevel.Info });
        UpdateFrontpageListViews(phaseName).then(resolve, () => {
            UpdateFrontpageListViews(phaseName).then(resolve, reject);
        });
    });
});

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
        UpdateWelcomePage(newPhase.Name, newPhase.Id, Config.PROJECTPHASE_FIELD).then(() => {
            Promise.all([
                UpdateFrontpageListViews(newPhase.Name),
                SetMetadataDefaults(newPhase.Name),
                EnsureLocationBasedMetadataDefaultsReceiverItemAdded("ItemAdded"),
            ])
                .then(resolve)
                .catch(reject);
        }).catch(reject);
    });
};

export default ChangeProjectPhase;
