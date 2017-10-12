import pnp, { LogLevel, ConsoleListener } from "sp-pnp-js";
import { GetSetting } from "./Settings";
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
     */
    async function initLogging() {
        const logLevelString = await GetSetting("LOG_LEVEL");
        pnp.log.activeLogLevel = LogLevel[logLevelString];
        pnp.log.subscribe(new ConsoleListener());
    }

    /**
     * Sets up PnP settings
     */
    function initPnp() {
        pnp.setup({
            headers: {
                "Accept": "application/json; odata=verbose",
            },
            defaultCachingStore: "session",
            defaultCachingTimeoutSeconds: 30,
        });
    }

    export function initialize() {
        initLogging();
        initPnp();
        Forms.InitializeModifications();
        WebParts.RenderWebPartsOnPage();
        StampVersion("startNavigation", "pp_version");
    }
}

ExecuteOrDelayUntilBodyLoaded(PP.initialize);

