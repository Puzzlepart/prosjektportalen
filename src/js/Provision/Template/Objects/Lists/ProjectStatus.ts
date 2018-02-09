import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";

export default function BenefitsAnalysis(language: number): IList {
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title", language),
        Description: "",
        Template: 101,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C02",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllDocuments_DisplayName", language),
            ViewFields: ["DocIcon", "LinkFilename", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
              <FieldRef Name="ID" Ascending="FALSE" />
            </OrderBy>`,
            },
        }],
    };
}

