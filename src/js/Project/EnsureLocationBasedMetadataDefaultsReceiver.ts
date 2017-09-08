import { Logger, LogLevel } from "sp-pnp-js";
import * as Config from "./Config";

/**
 * Ensures LocationBasedMetadataDefaultsReceiver
 *
 * @param {string} type Type (default to ItemAdded)
 */
const EnsureLocationBasedMetadataDefaultsReceiver = (type = "ItemAdded"): Promise<any> => new Promise<any>((resolve, reject) => {
    const recName = `LocationBasedMetadataDefaultsReceiver ${type}`,
        ctx = SP.ClientContext.get_current(),
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
            Logger.log({ message: `ChangeProjectPhase: Event receiver ${type} ensured`, data: {}, level: LogLevel.Info });
            ctx.executeQueryAsync(resolve, reject);
        } else {
            Logger.log({ message: `ChangeProjectPhase: Event receiver ${type} already ensured`, data: {}, level: LogLevel.Info });
            resolve();
        }
    }, reject);
});

export default EnsureLocationBasedMetadataDefaultsReceiver;
