"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sp_1 = require("@pnp/sp");
const logging_1 = require("@pnp/logging");
const Util = require("../Util");
const CONFIGURATION = require("./Config");
const ProjectProperties_1 = require("./ProjectProperties");
/**
 * Update client_LocationBasedDefaults.html
 *
 * @param {string} folderServerRelativeUrl Folder server relative URL
 * @param {string[]} contents File content
 */
const UpdateClientLocationBasedDefaults = (folderServerRelativeUrl, contents) => new Promise((resolve, reject) => {
    const folder = sp_1.sp.web.getFolderByServerRelativeUrl(`${folderServerRelativeUrl}/Forms`);
    folder.files.add("client_LocationBasedDefaults.html", new Blob(contents, { type: "text/plain" }), true)
        .then(() => {
        logging_1.Logger.log({ message: `(UpdateClientLocationBasedDefaults) Updated client_LocationBasedDefaults.html for ${CONFIGURATION.DOCUMENT_LIBRARY}`, data: { contents }, level: 1 /* Info */ });
        resolve();
    })
        .catch(reason => {
        logging_1.Logger.log({ message: `(UpdateClientLocationBasedDefaults) Failed to update client_LocationBasedDefaults.html for ${CONFIGURATION.DOCUMENT_LIBRARY}`, data: { contents }, level: 3 /* Error */ });
        reject();
    });
});
/**
 * Generate metadata defaults
 *
 * @param {string} folderServerRelativeUrl Folder server relative URL
 * @param {IMetadataDefaultsDefaultValue[]} defaultValues Default values
 */
const GenerateMetadataDefaults = (folderServerRelativeUrl, defaultValues) => {
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
function getFieldValueForType(value, fieldType) {
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
function SetMetadataDefaultsForLibrary(fields, libTitle = CONFIGURATION.DOCUMENT_LIBRARY) {
    return __awaiter(this, void 0, void 0, function* () {
        const docLib = sp_1.sp.web.lists.getByTitle(libTitle);
        const [wpFieldValues, { RootFolder }, docLibFields] = yield Promise.all([ProjectProperties_1.GetProjectPropertiesPageFieldValues(), docLib.expand("RootFolder").get(), docLib.fields.select("InternalName").get()]);
        const docLibFieldsInternalNames = docLibFields.map(f => f.InternalName);
        const folderServerRelativeUrl = Util.encodeSpaces(RootFolder.ServerRelativeUrl);
        const defaultValues = fields
            .filter(({ fieldName, fieldType }) => {
            const docLibHasField = Array.contains(docLibFieldsInternalNames, fieldName);
            return docLibHasField;
        })
            .map(({ fieldName, fieldType }) => {
            let fieldValue = getFieldValueForType(wpFieldValues[fieldName], fieldType);
            return { fieldName, fieldValue };
        });
        let metadataDefaults = GenerateMetadataDefaults(folderServerRelativeUrl, defaultValues);
        yield UpdateClientLocationBasedDefaults(folderServerRelativeUrl, metadataDefaults);
        return;
    });
}
exports.SetMetadataDefaultsForLibrary = SetMetadataDefaultsForLibrary;
/**
 * Ensures LocationBasedMetadataDefaultsReceiver
 *
 * @param {string} type Type (default to ItemAdded)
 * @param {string} libTitle Library title
 */
function EnsureLocationBasedMetadataDefaultsReceiverForLibrary(type = "ItemAdded", libTitle = CONFIGURATION.DOCUMENT_LIBRARY) {
    return __awaiter(this, void 0, void 0, function* () {
        const recName = `LocationBasedMetadataDefaultsReceiver ${type}`;
        const { ctx, lists } = yield Util.getJsomContext(_spPageContextInfo.webAbsoluteUrl);
        const docLib = lists.getByTitle(libTitle);
        const eventReceivers = docLib.get_eventReceivers();
        yield Util.executeJsom(ctx, [eventReceivers]);
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
            yield Util.executeJsom(ctx, [eventReceivers]);
            logging_1.Logger.log({ message: `(EnsureLocationBasedMetadataDefaultsReceiverForLibrary) Event receiver ${type} ensured`, data: {}, level: 1 /* Info */ });
        }
        return;
    });
}
exports.EnsureLocationBasedMetadataDefaultsReceiverForLibrary = EnsureLocationBasedMetadataDefaultsReceiverForLibrary;
