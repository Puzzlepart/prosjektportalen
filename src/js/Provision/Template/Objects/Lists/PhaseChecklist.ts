import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";

export default function PhaseChecklist(language: number): IList {
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title", language),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070204",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtChecklistStatus", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<OrderBy>
              <FieldRef Name="GtSortOrder" />
              <FieldRef Name="ID" />
            </OrderBy>
            <Where>
                <Neq>
                    <FieldRef Name="GtChecklistStatus" />
                    <Value Type="Text">${RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Archived")}</Value>
                </Neq>
            </Where>`,
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_Archived_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<OrderBy>
              <FieldRef Name="GtSortOrder" />
              <FieldRef Name="ID" />
            </OrderBy>
            <Where>
                <Eq>
                    <FieldRef Name="GtChecklistStatus" />
                    <Value Type="Text">${RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Archived")}</Value>
                </Eq>
            </Where>`,
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_GroupedStatus_DisplayName", language),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
              <FieldRef Name="GtChecklistStatus" Ascending="FALSE" />
            </GroupBy>
            <OrderBy>
                <FieldRef Name="GtSortOrder" />
                <FieldRef Name="ID" />
            </OrderBy>`,
            },
        }],
    };
}
