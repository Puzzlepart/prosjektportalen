import pnp, { LogLevel, ConsoleListener } from "sp-pnp-js";
import * as WebParts from "./WebParts";
import * as Forms from "./Forms";
import StampVersion from "./Util/StampVersion";

/** Set up pnp logging */
pnp.log.activeLogLevel = LogLevel.Info;
pnp.log.subscribe(new ConsoleListener());

/** PnP setup */
pnp.setup({
    headers: {
        "Accept": "application/json; odata=verbose",
    },
});

ExecuteOrDelayUntilBodyLoaded(() => {
    Forms.Initialize();
    WebParts.Render();
    StampVersion("startNavigation", "pp_version", ["pp-version-stamp"]);
});
