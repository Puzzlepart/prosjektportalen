import { sp, Logger, LogLevel } from "sp-pnp-js";
import * as Util from "../Util";
import * as CONFIGURATION from "./Config";
import { GetWelcomePageFieldValues } from "./WelcomePage";

export interface IIMetadataDefaultsField {
    fieldName: string;
    fieldType: "Text" | "Taxonomy" | "TaxonomyMulti";
}

export interface IMetadataDefaultsDefaultValue {
    fieldName: string;
    fieldValue: string;
}

/**
 * Update client_LocationBasedDefaults.html
 *
 * @param {string} folderServerRelativeUrl Folder server relative URL
 * @param {string[]} contents File content
 */
const UpdateClientLocationBasedDefaults = (folderServerRelativeUrl: string, contents: string[]) => new Promise<void>((resolve, reject) => {
    const folder = sp.web.getFolderByServerRelativeUrl(`${folderServerRelativeUrl}/Forms`);
    folder.files.add("client_LocationBasedDefaults.html", new Blob(contents, { type: "text/plain" }), true)
        .then(() => {
            Logger.log({ message: `Updated client_LocationBasedDefaults.html for ${CONFIGURATION.DOCUMENT_LIBRARY}`, data: { contents }, level: LogLevel.Info });
            resolve();
        })
        .catch(reason => {
            Logger.log({ message: `Failed to update client_LocationBasedDefaults.html for ${CONFIGURATION.DOCUMENT_LIBRARY}`, data: { contents }, level: LogLevel.Error });
            reject();
        });
});

/**
 * Generate metadata defaults
 *
 * @param {string} folderServerRelativeUrl Folder server relative URL
 * @param {IMetadataDefaultsDefaultValue[]} defaultValues Default values
 */
const GenerateMetadataDefaults = (folderServerRelativeUrl: string, defaultValues: IMetadataDefaultsDefaultValue[]): string[] => {
    let parts = ["<MetadataDefaults>", `<a href="${folderServerRelativeUrl}">`];
    parts = parts.concat(defaultValues.filter(({ fieldValue }) => fieldValue !== "").map(({ fieldName, fieldValue }) => `<DefaultValue FieldName="${fieldName}">${fieldValue}</DefaultValue>`));
    parts.push("</a>", "</MetadataDefaults>");
    return parts;
};

/**
 * Set metadata defaults
 *
 * @param {IIMetadataDefaultsField[]} fields Fields to configure default values for
 * @param {string} libTitle Library title
 */
export async function SetMetadataDefaultsForLibrary(fields: IIMetadataDefaultsField[], libTitle = CONFIGURATION.DOCUMENT_LIBRARY): Promise<void> {
    const docLib = sp.web.lists.getByTitle(libTitle);
    const [wpFieldValues, { RootFolder }, docLibFields] = await Promise.all([GetWelcomePageFieldValues(), docLib.expand("RootFolder").get(), docLib.fields.select("InternalName").get()]);
    const docLibFieldsInternalNames = docLibFields.map(f => f.InternalName);
    const folderServerRelativeUrl = Util.encodeSpaces(RootFolder.ServerRelativeUrl);
    const defaultValues: IMetadataDefaultsDefaultValue[] = fields
        .filter(({ fieldName, fieldType }) => {
            const docLibHasField = Array.contains(docLibFieldsInternalNames, fieldName);
            return docLibHasField;
        })
        .map(({ fieldName, fieldType }) => {
            let fieldValue = "";
            switch (fieldType) {
                case "Text": {
                    if (wpFieldValues[fieldName]) {
                        fieldValue = wpFieldValues[fieldName];
                    }
                }
                    break;
                case "Taxonomy": {
                    if (wpFieldValues[fieldName]) {
                        const safeTermValue = Util.getSafeTerm(wpFieldValues[fieldName]);
                        fieldValue = `${safeTermValue.WssId};#${safeTermValue.Label}|${safeTermValue.TermGuid}`;
                    }
                }
                    break;
                case "TaxonomyMulti": {
                    let termValues = [];
                    if (wpFieldValues[fieldName].getEnumerator) {
                        const termEnumerator = wpFieldValues[fieldName].getEnumerator();
                        while (termEnumerator.moveNext()) {
                            let currentTerm = Util.getSafeTerm(termEnumerator.get_current());
                            termValues.push(`${currentTerm.WssId};#${currentTerm.Label}|${currentTerm.TermGuid}`);
                        }
                    }
                    if (wpFieldValues[fieldName]._Child_Items_) {
                        wpFieldValues[fieldName]._Child_Items_.forEach(term => {
                            let safeTerm = Util.getSafeTerm(term);
                            termValues.push(`${safeTerm.WssId};#${safeTerm.Label}|${safeTerm.TermGuid}`);
                        });
                    }
                    fieldValue = termValues.join(";#");
                }
                    break;
            }
            return { fieldName, fieldValue };
        });

    let metadataDefaults = GenerateMetadataDefaults(folderServerRelativeUrl, defaultValues);
    await UpdateClientLocationBasedDefaults(folderServerRelativeUrl, metadataDefaults);
    return;
}

/**
 * Ensures LocationBasedMetadataDefaultsReceiver
 *
 * @param {string} type Type (default to ItemAdded)
 * @param {string} libTitle Library title
 */
export const EnsureLocationBasedMetadataDefaultsReceiverForLibrary = (type = "ItemAdded", libTitle = CONFIGURATION.DOCUMENT_LIBRARY): Promise<any> => new Promise<any>((resolve, reject) => {
    const recName = `LocationBasedMetadataDefaultsReceiver ${type}`;
    const ctx = SP.ClientContext.get_current();
    const docLib = ctx.get_web().get_lists().getByTitle(libTitle);
    const eventReceivers = docLib.get_eventReceivers();
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
