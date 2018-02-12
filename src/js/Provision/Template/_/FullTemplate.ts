import { Schema } from "sp-pnp-provisioning/lib/schema";
import { Files, Lists, Navigation, WebSettings, ComposedLook } from "../Objects";

const FullTemplate: Schema = {
    Files,
    Lists,
    Navigation,
    WebSettings,
    ComposedLook,
    Features: [{
        id: "87294c72-f260-42f3-a41b-981a2ffce37a",
        deactivate: true,
        force: true,
    }],
};

export default FullTemplate;

