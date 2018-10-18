import { sp } from "@pnp/sp";
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";
import { initializeIcons } from "@uifabric/icons";
import { GetSettings } from "./Settings";
import * as WebParts from "./WebParts";
import * as Forms from "./Forms";
import StampVersion from "./Util/StampVersion";

/** If the script was loaded using SP.SOD, we'll set the SOD to loaded */
if (window["_v_dictSod"]) {
    window["_v_dictSod"]["pp.main.js"].loaded = true;
}

namespace PP {
    /**
     * Sets up PnP logging
     *
     * @param {string} logLevelStr Log level string
     */
    async function initLogging(logLevelStr: string) {
        let logLevel = LogLevel.Off;
        switch (logLevelStr.toLowerCase()) {
            case "Info": {
                logLevel = LogLevel.Info;
            }
                break;
            case "Warning": {
                logLevel = LogLevel.Warning;
            }
                break;
            case "Error": {
                logLevel = LogLevel.Error;
            }
                break;
        }
        Logger.activeLogLevel = logLevel;
        Logger.subscribe(new ConsoleListener());
    }

    /**
     * Sets up PnP settings
     *
     * @param {string} defaultCachingTimeoutSecondsStr Default caching timeout (seconds)
     */
    function initPnp(defaultCachingTimeoutSecondsStr: string) {
        let defaultCachingTimeoutSeconds = 30;
        if (defaultCachingTimeoutSecondsStr) {
            defaultCachingTimeoutSeconds = parseInt(defaultCachingTimeoutSecondsStr, 10);
        }
        sp.setup({
            sp: { headers: { Accept: "application/json; odata=verbose" } },
            defaultCachingStore: "session",
            defaultCachingTimeoutSeconds,
        });
    }

    export async function initialize() {
        const settings = await GetSettings();
        initializeIcons();
        initLogging(settings.LOG_LEVEL);
        initPnp(settings.DEFAULT_CACHING_TIMEOUT_SECONDS);
        Forms.InitializeModifications();
        WebParts.RenderWebPartsOnPage();
        StampVersion("startNavigation", "pp_version", "v", 40);
    }
}

ExecuteOrDelayUntilBodyLoaded(PP.initialize);

