import __ from '../Resources'
import { Site, List } from '@pnp/sp'
import { LogEntry, LogLevel } from '@pnp/logging'

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
    private _listName: string;
    private _siteUrl: string;
    private _pnpList: List;

    /**
     * Constructor
     *
     * @param {string} listName List name
     * @param {string} siteUrl Site URL (defaults to _spPageContextInfo.siteAbsoluteUrl)
     */
    constructor(listName = __.getResource('Lists_Log_Title'), siteUrl = _spPageContextInfo.siteAbsoluteUrl) {
        this._listName = listName
        this._siteUrl = siteUrl
        this._pnpList = new Site(this._siteUrl).rootWeb.lists.getByTitle(this._listName)
    }

    /**
     * Logs an entry to the SP list
     *
     * @param {ISpListLoggerEntry} entry Log entry
     */
    public async log(entry: ISpListLoggerEntry): Promise<void> {
        await this._pnpList.items.add({
            Message: entry.message,
            Source: entry.source,
            ErrorTraceCorrelationId: entry.errorTraceCorrelationId,
            ErrorTypeName: entry.errorTypeName,
            LogURL: entry.url,
            Created: entry.created,
            LogLevel: this.getLogLevelString(entry),
        })
    }

    /**
     * Get log level string representation
     *
     * @param {entry} entry Log entry
     */
    private getLogLevelString(entry: ISpListLoggerEntry): string {
        switch (entry.level) {
            case LogLevel.Error: {
                return __.getResource('String_LogLevel_Error')
            }
            case LogLevel.Info: {
                return __.getResource('String_LogLevel_Info')
            }
            case LogLevel.Warning: {
                return __.getResource('String_LogLevel_Warning')
            }
            default: {
                return ''
            }
        }
    }
}

export { LogLevel }
