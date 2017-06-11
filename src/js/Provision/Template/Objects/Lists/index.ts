import { IList } from "sp-pnp-provisioning/lib/schema";

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
            `<Field Type="LookupMulti" DisplayName="${__("SiteFields_GtCommunicationTarget_DisplayName")}" List="{listid:${__("Lists_Stakeholders_Title")}}" ShowField="Title" ID="{d685f33f-51b5-4e9f-a314-4b3d9467a7e4}" Name="GtCommunicationTarget" StaticName="GtCommunicationTarget" InternalName="GtCommunicationTarget" Mult="TRUE" />`,
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
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectLogEventLookup_DisplayName")}" List="{listid:${__("Lists_MeetingCalendar_Title")}}" ShowField="Title" ID="{20731fb1-e98e-4fdc-b3d6-941b41b8fd6e}" StaticName="GtProjectLogEventLookup" InternalName="GtProjectLogEventLookup" />`,
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectLogProductLookup_DisplayName")}" List="{listid:${__("Lists_ProjectProducts_Title")}}" ShowField="Title" ID="{022cc93f-13df-4420-bd47-55e4fdae5d18}" StaticName="GtProjectLogProductLookup" InternalName="GtProjectLogProductLookup" />`,
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
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProductInteressent_DisplayName")}" List="{listid:${__("Lists_Stakeholders_Title")}}" ShowField="Title" ID="{6d90e0b6-73e6-48fb-aa1e-b897b214f934}" StaticName="GtProductInteressent" InternalName="GtProductInteressent" />`,
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
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskComElement_DisplayName")}" List="{listid:${__("Lists_CommunicationPlan_Title")}}" ShowField="Title" ID="{087dae25-b007-4e58-91b4-347dde464840}" StaticName="GtProjectTaskComElement" InternalName="GtProjectTaskComElement" />`,
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskRisk_DisplayName")}" List="{listid:${__("Lists_Uncertainties_Title")}}" ShowField="Title" ID="{920b385c-756f-49eb-98e7-4c3ebf15b7f4}" StaticName="GtProjectTaskRisk" InternalName="GtProjectTaskRisk" />`,
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskProduct_DisplayName")}" List="{listid:${__("Lists_ProjectProducts_Title")}}" ShowField="Title" ID="{a3ab9d99-78da-436d-a299-5854340a504f}" StaticName="GtProjectTaskProduct" InternalName="GtProjectTaskProduct" />`,
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskChange_DisplayName")}" List="{listid:${__("Lists_ChangeAnalysis_Title")}}" ShowField="Title" ID="{2b55bfc2-44c5-4b67-92a7-9b43bffbceb4}" StaticName="GtProjectTaskChange" InternalName="GtProjectTaskChange" />`,
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskGain_DisplayName")}" List="{listid:${__("Lists_GainsAnalysis_Title")}}" ShowField="Title" ID="{1149ce1e-bb07-4d3c-afe0-3242708b3c8e}" StaticName="GtProjectTaskGain" InternalName="GtProjectTaskGain" />`,
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
            ViewFields: ["LinkTitle", "GtProjectTaskChange", "GtProjectTaskGain", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
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
        Title: __("Lists_GainsAnalysis_Title"),
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
            `<Field Type="LookupMulti" DisplayName="${__("SiteFields_GtChangeLookup_DisplayName")}" List="{listid:${__("Lists_ChangeAnalysis_Title")}}" ShowField="LinkTitleNoMenu" UnlimitedLengthInDocumentLibrary="FALSE" RelationshipDeleteBehavior="None" ID="{1d5752af-4d26-4aed-b20a-6229ac14ed5d}" StaticName="GtChangeLookup" InternalName="GtChangeLookup" Group="" Description="Foreslått endring fra endringsanalysen" Mult="TRUE" />`,
        ],
        FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: "Gevinst",
        }],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["GtChangeLookup", "Title", "GtGainsType", "GtGainsTurnover", "GtGainsResponsible", "GtMeasureIndicator", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: "Pr gevinsttype",
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
        Title: __("Lists_GainsFollowup_Title"),
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
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtGainLookup_DisplayName")}" List="{listid:${__("Lists_GainsAnalysis_Title")}}" ShowField="Title" ID="{8d70fa93-b547-46f1-84e7-4982f8c9c675}" StaticName="GtGainLookup" InternalName="GtGainLookup" SourceID="{{listid:Gevinstsoppfølging}}" />`,
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtMeasureIndicatorLookup_DisplayName")}" List="{listid:${__("Lists_GainsAnalysis_Title")}}" ShowField="GtMeasureIndicator" FieldRef="8d70fa93-b547-46f1-84e7-4982f8c9c675" ReadOnly="TRUE" UnlimitedLengthInDocumentLibrary="FALSE" ID="{92ae8541-f35e-4c05-8518-b9abce2d0860}" SourceID="{{listid:Gevinstsoppfølging}}" StaticName="GtMeasureIndicatorLookup" InternalName="GtMeasureIndicatorLookup" />`,
            `<Field Type="Lookup" DisplayName="${__("SiteFields_GtGainLookup_DisplayName")} ID" List="{listid:${__("Lists_GainsAnalysis_Title")}}" ShowField="ID" FieldRef="8d70fa93-b547-46f1-84e7-4982f8c9c675" ReadOnly="TRUE" UnlimitedLengthInDocumentLibrary="FALSE" ID="{c239539c-8672-46cc-be77-fb53322f71ae}" SourceID="{{listid:Gevinstsoppfølging}}" ShowInDisplayForm="FALSE" StaticName="GtGainLookup_ID" InternalName="GtGainLookup_ID" />`,
        ],
        Views: [{
            Title: __("View_AllItems_DisplayName"),
            ViewFields: ["GtMeasurementDate", "GtMeasurementValue", "GtMeasureIndicatorLookup", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                                <FieldRef Name="GtGainLookup" />
                            </GroupBy>
                            <OrderBy>
                                <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                            </OrderBy>`,
            },
        },
        {
            Title: "Flat visning",
            ViewFields: ["GtGainLookup", "GtMeasurementDate", "GtMeasurementValue", "GtMeasureIndicatorLookup", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                                <FieldRef Name="GtGainLookup" />
                                <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                            </OrderBy>`,
            },
        }],
    },
];

export default Lists;
