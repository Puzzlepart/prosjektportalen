import {
    Site,
    LogLevel,
} from "sp-pnp-js";

interface ILogEntry {
    Message: string;
    LogLevel: LogLevel;
}

/**
 * SharePoint List logger
 */
export default class SpListLogger {
    public List: string;
    private SiteUrl: string;

    /**
     * Constructor
     *
     * @param {string} list SP list title
     */
    constructor(list = __("Lists_Log_Title"), siteUrl = _spPageContextInfo.siteAbsoluteUrl) {
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
                return __("String_LogLevel_Error");
            }
            case LogLevel.Info: {
                return __("String_LogLevel_Info");
            }
            case LogLevel.Warning: {
                return __("String_LogLevel_Warning");
            }
            default: {
                return "";
            }
        }
    }
}

export { LogLevel };
