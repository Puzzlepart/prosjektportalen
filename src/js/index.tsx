import pnp, { Logger, LogLevel, ConsoleListener } from "sp-pnp-js";
import * as WebParts from "./WebParts";
import * as Forms from "./Forms";
import StampVersion from "./Util/StampVersion";

/** Set up pnp logging */
pnp.log.activeLogLevel = process.env.NODE_ENV === "production" ? LogLevel.Error : LogLevel.Info;
pnp.log.subscribe(new ConsoleListener());

/** Pnp setup */
pnp.setup({
    headers: {
        "Accept": "application/json; odata=verbose",
    },
});

SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
    ExecuteOrDelayUntilBodyLoaded(() => {
        Logger.log({ message: `pp.main.js: Body loaded. Initializing.`, level: LogLevel.Info });
        Forms.Initialize();
        WebParts.Render();
        new StampVersion().stamp("startNavigation", "pp_version", ["pp-version-stamp"]);
    });
});
