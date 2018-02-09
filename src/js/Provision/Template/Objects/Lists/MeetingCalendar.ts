import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";

export default function MeetingCalendar(language: number): IList {
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_MeetingCalendar_Title", language),
        Description: "",
        Template: 106,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010200A2B2AC17A2244B8590398A9D1E7E3E3701",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
    };
}

