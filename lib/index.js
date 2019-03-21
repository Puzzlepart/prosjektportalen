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
const icons_1 = require("@uifabric/icons");
const Settings_1 = require("./Settings");
const WebParts = require("./WebParts");
const Forms = require("./Forms");
const StampVersion_1 = require("./Util/StampVersion");
/** If the script was loaded using SP.SOD, we'll set the SOD to loaded */
if (window["_v_dictSod"]) {
    window["_v_dictSod"]["pp.main.js"].loaded = true;
}
var PP;
(function (PP) {
    /**
     * Sets up PnP logging
     *
     * @param {string} logLevelStr Log level string
     */
    function initLogging(logLevelStr) {
        return __awaiter(this, void 0, void 0, function* () {
            let logLevel = 99 /* Off */;
            switch (logLevelStr.toLowerCase()) {
                case "info":
                    {
                        logLevel = 1 /* Info */;
                    }
                    break;
                case "warning":
                    {
                        logLevel = 2 /* Warning */;
                    }
                    break;
                case "error":
                    {
                        logLevel = 3 /* Error */;
                    }
                    break;
            }
            logging_1.Logger.activeLogLevel = logLevel;
            logging_1.Logger.subscribe(new logging_1.ConsoleListener());
        });
    }
    /**
     * Sets up PnP settings
     *
     * @param {string} defaultCachingTimeoutSecondsStr Default caching timeout (seconds)
     */
    function initPnp(defaultCachingTimeoutSecondsStr) {
        let defaultCachingTimeoutSeconds = 30;
        if (defaultCachingTimeoutSecondsStr) {
            defaultCachingTimeoutSeconds = parseInt(defaultCachingTimeoutSecondsStr, 10);
        }
        sp_1.sp.setup({
            sp: { headers: { Accept: "application/json; odata=verbose" } },
            defaultCachingStore: "session",
            defaultCachingTimeoutSeconds,
        });
    }
    function initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield Settings_1.GetSettings();
            icons_1.initializeIcons();
            initLogging(settings.LOG_LEVEL);
            initPnp(settings.DEFAULT_CACHING_TIMEOUT_SECONDS);
            Forms.InitializeModifications();
            WebParts.RenderWebPartsOnPage();
            StampVersion_1.default("startNavigation", "pp_version", "v", 40);
        });
    }
    PP.initialize = initialize;
})(PP || (PP = {}));
ExecuteOrDelayUntilBodyLoaded(PP.initialize);
