import { sp } from "@pnp/sp";
import {  Logger, LogLevel } from "@pnp/logging";
import * as Util from "../Util";
import * as CONFIGURATION from "./Config";
import { GetProjectPropertiesPageFieldValues } from "./ProjectProperties";

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
            Logger.log({ message: `(UpdateClientLocationBasedDefaults) Updated client_LocationBasedDefaults.html for ${CONFIGURATION.DOCUMENT_LIBRARY}`, data: { contents }, level: LogLevel.Info });
            resolve();
        })
        .catch(reason => {
            Logger.log({ message: `(UpdateClientLocationBasedDefaults) Failed to update client_LocationBasedDefaults.html for ${CONFIGURATION.DOCUMENT_LIBRARY}`, data: { contents }, level: LogLevel.Error });
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
 * Get field value for type
 *
 * @param {any} value The raw value
 * @param {string} fieldType Text, Taxonomy or TaxonomyMulti
 */
function getFieldValueForType(value, fieldType): string {
    switch (fieldType) {
        case "Text": {
            if (value) {
                return value;
            }
            return "";
        }
        case "Taxonomy": {
            if (value) {
                const safeTermValue = Util.getSafeTerm(value);
                return `${safeTermValue.WssId};#${safeTermValue.Label}|${safeTermValue.TermGuid}`;
            }
            return "";
        }
        case "TaxonomyMulti": {
            let termValues = [];
            if (value.getEnumerator) {
                const termEnumerator = value.getEnumerator();
                while (termEnumerator.moveNext()) {
                    let currentTerm = Util.getSafeTerm(termEnumerator.get_current());
                    termValues.push(`${currentTerm.WssId};#${currentTerm.Label}|${currentTerm.TermGuid}`);
                }
            }
            if (value._Child_Items_) {
                value._Child_Items_.forEach(term => {
                    let safeTerm = Util.getSafeTerm(term);
                    termValues.push(`${safeTerm.WssId};#${safeTerm.Label}|${safeTerm.TermGuid}`);
                });
            }
            return termValues.join(";#");
        }
    }
}

/**
 * Set metadata defaults
 *
 * @param {IIMetadataDefaultsField[]} fields Fields to configure default values for
 * @param {string} libTitle Library title
 */
export async function SetMetadataDefaultsForLibrary(fields: IIMetadataDefaultsField[], libTitle = CONFIGURATION.DOCUMENT_LIBRARY): Promise<void> {
    const docLib = sp.web.lists.getByTitle(libTitle);
    const [wpFieldValues, { RootFolder }, docLibFields] = await Promise.all([GetProjectPropertiesPageFieldValues(), docLib.expand("RootFolder").get(), docLib.fields.select("InternalName").get()]);
    const docLibFieldsInternalNames = docLibFields.map(f => f.InternalName);
    const folderServerRelativeUrl = Util.encodeSpaces(RootFolder.ServerRelativeUrl);
    const defaultValues: IMetadataDefaultsDefaultValue[] = fields
        .filter(({ fieldName, fieldType }) => {
            const docLibHasField = Array.contains(docLibFieldsInternalNames, fieldName);
            return docLibHasField;
        })
        .map(({ fieldName, fieldType }) => {
            let fieldValue = getFieldValueForType(wpFieldValues[fieldName], fieldType);
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
export async function EnsureLocationBasedMetadataDefaultsReceiverForLibrary(type = "ItemAdded", libTitle = CONFIGURATION.DOCUMENT_LIBRARY): Promise<void> {
    const recName = `LocationBasedMetadataDefaultsReceiver ${type}`;
    const { ctx, lists } = await Util.getJsomContext(_spPageContextInfo.webAbsoluteUrl);
    const docLib = lists.getByTitle(libTitle);
    const eventReceivers = docLib.get_eventReceivers();
    await Util.executeJsom(ctx, [eventReceivers]);
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
        await Util.executeJsom(ctx, [eventReceivers]);
        Logger.log({ message: `(EnsureLocationBasedMetadataDefaultsReceiverForLibrary) Event receiver ${type} ensured`, data: {}, level: LogLevel.Info });
    }
    return;
}

