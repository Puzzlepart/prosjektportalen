require("es6-promise").polyfill();
require("babel-polyfill");
import { default as pnp, LogLevel, ConsoleListener } from "sp-pnp-js";
import * as WebParts from "./WebParts";
import * as Forms from "./Forms";
import { StampVersion } from "./Util";

/** Set up pnp logging */
pnp.log.activeLogLevel = (process.env.NODE_ENV === "development") ? LogLevel.Info : LogLevel.Warning;
pnp.log.subscribe(new ConsoleListener());

/** Pnp setup */
pnp.setup({
    headers: {
        "Accept": "application/json; odata=verbose",
    },
});

ExecuteOrDelayUntilBodyLoaded(() => {
    ExecuteOrDelayUntilScriptLoaded(() => {
        Forms.Initialize();
        WebParts.Render();
        StampVersion.stamp("startNavigation", "pp_version", ["pp-version-stamp"]);
    }, "sp.js");
});
