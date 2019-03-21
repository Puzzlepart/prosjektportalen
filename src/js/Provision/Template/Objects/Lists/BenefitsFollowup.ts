import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";
import { GtMeasureIndicatorLookup, GtMeasureIndicatorLookup_ID, GtMeasureIndicatorLookup_GtDesiredValue } from "./SiteFields";

const BenefitsFollowup: IList = {
    Title: __.getResource("Lists_BenefitsFollowup_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: "0x01007A831AC68204F04AAA022CFF06C7BAA2",
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    FieldRefs: [{
        ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
        Required: false,
        Hidden: true,
    }],
    Fields: [
        GtMeasureIndicatorLookup,
        GtMeasureIndicatorLookup_ID,
        GtMeasureIndicatorLookup_GtDesiredValue,
    ],
    Views: [{
        Title: __.getResource("View_AllItems_DisplayName"),
        ViewFields: ["GtMeasureIndicatorLookup", "GtMeasureIndicatorLookup_GtDesiredValue", "GtMeasurementDate", "GtMeasurementValue", "GtMeasurementComment"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                            <FieldRef Name="GtMeasureIndicatorLookup" />
                        </GroupBy>
                        <OrderBy>
                            <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                        </OrderBy>`,
        },
    },
    {
        Title: __.getResource("View_Flat_DisplayName"),
        ViewFields: ["GtMeasureIndicatorLookup", "GtMeasureIndicatorLookup_GtDesiredValue", "GtMeasurementDate", "GtMeasurementValue", "GtMeasurementComment"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<OrderBy>
                            <FieldRef Name="GtMeasureIndicatorLookup" />
                            <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                        </OrderBy>`,
        },
    }],
};

export default BenefitsFollowup;
