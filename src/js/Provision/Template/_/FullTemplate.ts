import { Schema } from "sp-pnp-provisioning/lib/schema";
import { Files, Lists, Navigation, WebSettings, ComposedLook } from "../Objects";

export default function FullTemplate(language: number): Schema {
    return {
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
}
