export interface IIMetadataDefaultsField {
    fieldName: string;
    fieldType: "Text" | "Taxonomy" | "TaxonomyMulti";
}
export interface IMetadataDefaultsDefaultValue {
    fieldName: string;
    fieldValue: string;
}
/**
 * Set metadata defaults
 *
 * @param {IIMetadataDefaultsField[]} fields Fields to configure default values for
 * @param {string} libTitle Library title
 */
export declare function SetMetadataDefaultsForLibrary(fields: IIMetadataDefaultsField[], libTitle?: string): Promise<void>;
/**
 * Ensures LocationBasedMetadataDefaultsReceiver
 *
 * @param {string} type Type (default to ItemAdded)
 * @param {string} libTitle Library title
 */
export declare function EnsureLocationBasedMetadataDefaultsReceiverForLibrary(type?: string, libTitle?: string): Promise<void>;
