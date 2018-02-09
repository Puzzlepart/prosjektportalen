import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";
import SiteFields from "./SiteFields";

export default function BenefitsAnalysis(language: number): IList {
    const { GtChangeLookup } = SiteFields(language);
    return {
        Title: RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Title", language),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x0100B384774BA4EBB842A5E402EBF4707367",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [GtChangeLookup],
        FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName", language),
        }],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName", language),
            ViewFields: ["LinkTitle", "GtChangeLookup", "GtGainsType", "GtGainsTurnover", "GtGainsResponsible", "GtMeasureIndicator", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_GroupedBenefitType_DisplayName", language),
            ViewFields: ["GtChangeLookup", "Title", "GtGainsTurnover", "GtGainsResponsible", "GtMeasureIndicator", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
              <FieldRef Name="GtGainsType" Ascending="FALSE" />
            </GroupBy>
            <OrderBy>
              <FieldRef Name="ID" />
            </OrderBy>`,
            },
        }],
    };
}
