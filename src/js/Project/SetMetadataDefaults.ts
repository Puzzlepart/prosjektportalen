import { sp, Logger, LogLevel } from "sp-pnp-js";
import * as Util from "../Util";
import * as CONFIGURATION from "./Config";
import { GetWelcomePageFieldValues } from "./WelcomePage";

interface IIMetadataDefaultsField {
    fieldName: string;
    fieldType: "Text" | "Taxonomy" | "TaxonomyMulti";
}

interface IMetadataDefaultsDefaultValue {
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
 */
const SetMetadataDefaults = (fields: IIMetadataDefaultsField[]): Promise<any> => new Promise<any>((resolve, reject) => {
    const docLib = sp.web.lists.getByTitle(CONFIGURATION.DOCUMENT_LIBRARY);

    Promise.all([
        GetWelcomePageFieldValues(),
        docLib.expand("RootFolder").get(),
        docLib.fields.select("InternalName").get(),
    ])
        .then(([wpFieldValues, { RootFolder }, docLibFields]) => {
            docLibFields = docLibFields.map(f => f.InternalName);
            let folderServerRelativeUrl = Util.encodeSpaces(RootFolder.ServerRelativeUrl);
            let defaultValues: IMetadataDefaultsDefaultValue[] = fields
                .filter(({ fieldName, fieldType }) => {
                    const docLibHasField = Array.contains(docLibFields, fieldName);
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
                            const termEnumerator = wpFieldValues[fieldName].getEnumerator();
                            while (termEnumerator.moveNext()) {
                                let currentTerm = Util.getSafeTerm(termEnumerator.get_current());
                                termValues.push(`${currentTerm.WssId};#${currentTerm.Label}|${currentTerm.TermGuid}`);
                            }
                            fieldValue = termValues.join(";#");
                        }
                            break;
                    }
                    return { fieldName, fieldValue };
                });

            let metadataDefaults = GenerateMetadataDefaults(folderServerRelativeUrl, defaultValues);
            UpdateClientLocationBasedDefaults(folderServerRelativeUrl, metadataDefaults)
                .then(resolve)
                .catch(reject);
        });
});

export default SetMetadataDefaults;
