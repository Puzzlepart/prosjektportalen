import RESOURCE_MANAGER from "localization";
import {
    Site,
    LogLevel,
} from "sp-pnp-js";

interface ILogEntry {
    ID?: string;
    Message: string;
    Source?: string;
    LogLevel: LogLevel;
    ErrorTraceCorrelationId?: string;
    ErrorTypeName?: string;
    LogURL?: string;
    Created?: string;
}

/**
 * SharePoint List logger
 */
export default class SpListLogger {
    private List: string;
    private SiteUrl: string;

    /**
     * Constructor
     *
     * @param {string} list SP list title
     */
    constructor(list = RESOURCE_MANAGER.getResource("Lists_Log_Title"), siteUrl = _spPageContextInfo.siteAbsoluteUrl) {
        this.List = list;
        this.SiteUrl = siteUrl;
    }

    /**
     * Logs an entry to the SP list
     *
     * @param {ILogEntry} entry Log entry
     */
    public log(entry: ILogEntry): void {
        const spList = new Site(this.SiteUrl).rootWeb.lists.getByTitle(this.List);
        spList.items.add({
            ...entry,
            LogLevel: this.getLogLevelString(entry),
        });
    }

    /**
     * Get log level string representation
     *
     * @param {entry} entry Log entry
     */
    private getLogLevelString(entry: ILogEntry): string {
        switch (entry.LogLevel) {
            case LogLevel.Error: {
                return RESOURCE_MANAGER.getResource("String_LogLevel_Error");
            }
            case LogLevel.Info: {
                return RESOURCE_MANAGER.getResource("String_LogLevel_Info");
            }
            case LogLevel.Warning: {
                return RESOURCE_MANAGER.getResource("String_LogLevel_Warning");
            }
            default: {
                return "";
            }
        }
    }
}

export {
    LogLevel,
    ILogEntry,
};
