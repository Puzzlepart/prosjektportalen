/**
 * Get query parameters using querystring
 */
export declare function getQueryParams(): any;
/**
 * Hides field in form
 *
 * @param {string} fieldName Field name
 */
export declare function hideFormField(fieldName: string): void;
/**
 * Hides content type choice
 */
export declare function hideContentTypeChoice(): void;
/**
 * Inserts form container with the specified ID
 *
 * @param {string} id ID of form container
 * @param {string} refNodeId Reference node ID
 */
export declare function insertFormContainer(id: string, refNodeId?: string): HTMLElement;
/**
 * Overrides pre save action with the specified function
 *
 * @param {Function} func Override function
 */
export declare function overridePreSaveAction(func: any): void;
