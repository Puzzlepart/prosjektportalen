import * as objectGet from 'object-get'

/**
 * Get object value by expression
 *
 * @param {any} object Object
 * @param {string} expression Expression
 * @param {T} fallback Fallback (defaults to null)
 */
export function getObjectValue<T>(object: any, expression: string, fallback: T = null): T {
    return objectGet(object, expression) || fallback
}