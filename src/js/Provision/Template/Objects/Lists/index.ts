import { IList } from "sp-pnp-provisioning/lib/schema";
import * as SiteFields from "./SiteFields";

const Lists: IList[] = [
    {
        Title: __("Lists_SitePages_Title"),
        Description: "",
        Template: 119,
        ContentTypesEnabled: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010109010058561F86D956412B9DD7957BBCD67AAE01",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
    },
    {
        Title: __("Lists_PhaseChecklist_Title"),
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
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtChecklistStatus", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<OrderBy>
                  <FieldRef Name="GtSortOrder" />
                </OrderBy>`,
            },
        },
        {
            Title: "Per status",
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                  <FieldRef Name="GtChecklistStatus" Ascending="FALSE" />
                </GroupBy>
                <OrderBy>
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: __("Lists_Information_Title"),
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
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectInfoDescription"],
            AdditionalSettings: {
                RowLimit: 0,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: __("Lists_Stakeholders_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070202",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtStakeholderGroup", "GtStakeholderContext", "GtStakeholderStrategy", "GtStakeholderInterest", "GtStakeholderInfluence", "GtStakeholderInfluencePossibilty", "GtStakeholderActions"],
            AdditionalSettings: {
                RowLimit: 0,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: __("Lists_CommunicationPlan_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070203",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtCommunicationTarget,
        ],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtActionDate", "GtActionResponsible"],
            AdditionalSettings: {
                RowLimit: 10,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: __("Lists_ProjectLog_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070206",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtProjectLogEventLookup,
            SiteFields.GtProjectLogProductLookup,
        ],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectLogType", "GtProjectLogReporter", "GtProjectLogResponsible", "GtProjectLogConsequence", "GtProjectLogRecommendation", "GtProjectLogExperience"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: __("Lists_ProjectProducts_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070205",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtProductInteressent,
        ],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProductPhase", "GtProductQualityResponsible", "GtProductAcceptanceMethod", "GtProductAcceptanceResponsible", "GtProductAcceptanceDate"],
            AdditionalSettings: {
                RowLimit: 0,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: "Prosjektstatus",
            ViewFields: ["LinkTitle", "GtProductAcceptanceDate", "GtProductStatus", "GtProductStatusComment", "GtProductQualityExpectations"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: __("Lists_Uncertainties_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D566346483107020101",
        },
        {
            ContentTypeID: "0x010088578E7470CC4AA68D566346483107020102",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProximity",
                "GtRiskProbability",
                "GtRiskConsequence",
                "GtRiskFactor",
                "GtRiskProbabilityPostAction",
                "GtRiskConsequencePostAction",
                "GtRiskFactorPostAction",
                "GtRiskStrategy",
            ],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: "Prosjektstatus",
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProximity",
                "GtRiskAction",
                "GtRiskStrategy",
                "GtRiskFactor",
                "GtRiskFactorPostAction",
            ],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<Where>
                    <And>
                        <Neq>
                            <FieldRef Name="GtRiskStatus" />
                            <Value Type="Text">Tiltak gjennomført</Value>
                        </Neq>
                        <Neq>
                            <FieldRef Name="GtRiskStatus" />
                            <Value Type="Text">Ikke lenger aktuell</Value>
                        </Neq>
                    </And>
                </Where>`,
            },
        }],
    },
    {
        Title: __("Lists_Tasks_Title"),
        Description: "",
        Template: 171,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010800233B015F95174C9A8EB505493841DE8D",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtProjectTaskComElement,
            SiteFields.GtProjectTaskRisk,
            SiteFields.GtProjectTaskProduct,
            SiteFields.GtProjectTaskChange,
            SiteFields.GtProjectTaskBenefit,
        ],
        Views: [{
            Title: __("View_AllTasks_DisplayName"),
            ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: "Relevante koblinger",
            ViewFields: ["LinkTitle", "GtProjectTaskChange", "GtProjectTaskBenefit", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: __("Lists_MeetingCalendar_Title"),
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
    },
    {
        Title: __("Lists_Documents_Title"),
        Description: "",
        Template: 101,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C01",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: __("View_AllDocuments_DisplayName"),
            ViewFields: ["DocIcon", "LinkFilename", "GtProjectPhase", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: __("Lists_ProjectStatus_Title"),
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
            Title: __("View_AllDocuments_DisplayName"),
            ViewFields: ["DocIcon", "LinkFilename", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                  <FieldRef Name="ID" Ascending="FALSE" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: __("Lists_BenefitsAnalysis_Title"),
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
        Fields: [
            SiteFields.GtChangeLookup,
        ],
        FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: "Gevinst",
        }],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["GtChangeLookup", "Title", "GtBenefitsType", "GtBenefitsTurnover", "GtBenefitsResponsible", "GtMeasureIndicator", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: "Pr gevinsttype",
            ViewFields: ["GtChangeLookup", "Title", "GtBenefitsTurnover", "GtBenefitsResponsible", "GtMeasureIndicator", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                  <FieldRef Name="GtBenefitsType" Ascending="FALSE" />
                </GroupBy>
                <OrderBy>
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: __("Lists_ChangeAnalysis_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x01004D8897A0212F9A40A4C2209D89E5AD4C",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: "Endring",
        }],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["GtProcess", "GtChallengeDescription", "LinkTitle"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        },
        {
            Title: "Pr prosess",
            ViewFields: ["GtChallengeDescription", "LinkTitle"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                  <FieldRef Name="GtProcess" Ascending="FALSE" />
                </GroupBy>
                <OrderBy>
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: __("Lists_BenefitsFollowup_Title"),
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
            SiteFields.GtBenefitLookup,
            SiteFields.GtMeasureIndicatorLookup,
            SiteFields.GtBenefitLookup_ID,
        ],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["GtMeasurementDate", "GtMeasurementValue", "GtMeasureIndicatorLookup", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                                <FieldRef Name="GtBenefitLookup" />
                            </GroupBy>
                            <OrderBy>
                                <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                            </OrderBy>`,
            },
        },
        {
            Title: "Flat visning",
            ViewFields: ["GtBenefitLookup", "GtMeasurementDate", "GtMeasurementValue", "GtMeasureIndicatorLookup", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                                <FieldRef Name="GtBenefitLookup" />
                                <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                            </OrderBy>`,
            },
        }],
    },
];

export default Lists;
