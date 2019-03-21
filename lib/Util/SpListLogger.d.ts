import { LogEntry, LogLevel } from "@pnp/logging";
export interface ISpListLoggerEntry extends LogEntry {
    id?: string;
    source?: string;
    errorTraceCorrelationId?: string;
    errorTypeName?: string;
    url?: string;
    created?: string;
}
/**
 * SharePoint List logger
 */
export default class SpListLogger {
    private _listName;
    private _siteUrl;
    private _pnpList;
    /**
     * Constructor
     *
     * @param {string} listName List name
     * @param {string} siteUrl Site URL (defaults to _spPageContextInfo.siteAbsoluteUrl)
     */
    constructor(listName?: string, siteUrl?: string);
    /**
     * Logs an entry to the SP list
     *
     * @param {ISpListLoggerEntry} entry Log entry
     */
    log(entry: ISpListLoggerEntry): Promise<void>;
    /**
     * Get log level string representation
     *
     * @param {entry} entry Log entry
     */
    private getLogLevelString;
}
export { LogLevel };
