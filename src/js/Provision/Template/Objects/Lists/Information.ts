import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";

export default function Information(language: number): IList {
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_Information_Title", language),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070207",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProjectInfoDescription"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    };
}
