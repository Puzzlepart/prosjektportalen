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
const Resources_1 = require("../Resources");
const sp_1 = require("@pnp/sp");
/**
 * SharePoint List logger
 */
class SpListLogger {
    /**
     * Constructor
     *
     * @param {string} listName List name
     * @param {string} siteUrl Site URL (defaults to _spPageContextInfo.siteAbsoluteUrl)
     */
    constructor(listName = Resources_1.default.getResource("Lists_Log_Title"), siteUrl = _spPageContextInfo.siteAbsoluteUrl) {
        this._listName = listName;
        this._siteUrl = siteUrl;
        this._pnpList = new sp_1.Site(this._siteUrl).rootWeb.lists.getByTitle(this._listName);
    }
    /**
     * Logs an entry to the SP list
     *
     * @param {ISpListLoggerEntry} entry Log entry
     */
    log(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._pnpList.items.add({
                Message: entry.message,
                Source: entry.source,
                ErrorTraceCorrelationId: entry.errorTraceCorrelationId,
                ErrorTypeName: entry.errorTypeName,
                LogURL: entry.url,
                Created: entry.created,
                LogLevel: this.getLogLevelString(entry),
            });
        });
    }
    /**
     * Get log level string representation
     *
     * @param {entry} entry Log entry
     */
    getLogLevelString(entry) {
        switch (entry.level) {
            case 3 /* Error */: {
                return Resources_1.default.getResource("String_LogLevel_Error");
            }
            case 1 /* Info */: {
                return Resources_1.default.getResource("String_LogLevel_Info");
            }
            case 2 /* Warning */: {
                return Resources_1.default.getResource("String_LogLevel_Warning");
            }
            default: {
                return "";
            }
        }
    }
}
exports.default = SpListLogger;
