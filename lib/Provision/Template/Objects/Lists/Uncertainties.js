"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const Uncertainties = {
    Title: Resources_1.default.getResource("Lists_Uncertainties_Title"),
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
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProbability",
                "GtRiskConsequence",
                "GtRiskFactor",
                "GtRiskStatus",
                "GtRiskStrategy",
                "GtRiskAction",
                "GtRiskProbabilityPostAction",
                "GtRiskConsequencePostAction",
                "GtRiskFactorPostAction",
                "Modified",
            ],
            AdditionalSettings: {
                RowLimit: 100,
                Paged: true,
                ViewQuery: `<FieldRef Name="GtRiskFactor" Ascending="FALSE" />`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_CurrentRisk_DisplayName"),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProbability",
                "GtRiskConsequence",
                "GtRiskFactor",
                "GtRiskStatus",
                "GtRiskStrategy",
                "GtRiskAction",
                "Modified",
            ],
            AdditionalSettings: {
                RowLimit: 100,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
            <FieldRef Name="GtRiskStatus" Ascending="FALSE" />
          </GroupBy>
          <OrderBy>
            <FieldRef Name="GtRiskFactor" Ascending="FALSE" />
          </OrderBy>
          <Where>
            <Neq>
              <FieldRef Name="GtRiskStatus" />
              <Value Type="Text">Ikke lenger aktuell</Value>
            </Neq>
          </Where>`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_UnacceptableRisk_DisplayName"),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProbability",
                "GtRiskConsequence",
                "GtRiskFactor",
                "GtRiskStatus",
                "GtRiskStrategy",
                "GtRiskAction",
                "Modified",
            ],
            AdditionalSettings: {
                RowLimit: 100,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
            <FieldRef Name="GtRiskStatus" Ascending="FALSE" />
          </GroupBy>
          <OrderBy>
            <FieldRef Name="GtRiskFactor" Ascending="FALSE" />
          </OrderBy>
          <Where>
            <And>
              <Neq>
                <FieldRef Name="GtRiskStatus" />
                <Value Type="Text">Ikke lenger aktuell</Value>
              </Neq>
              <Gt>
                <FieldRef Name="GtRiskFactor" />
                <Value Type="Number">10</Value>
              </Gt>
            </And>
          </Where>`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_ClarifiedRisks_DisplayName"),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProbability",
                "GtRiskConsequence",
                "GtRiskFactor",
                "GtRiskStatus",
                "GtRiskStrategy",
                "GtRiskAction",
                "GtRiskProbabilityPostAction",
                "GtRiskConsequencePostAction",
                "GtRiskFactorPostAction",
                "Modified",
            ],
            AdditionalSettings: {
                RowLimit: 100,
                Paged: true,
                ViewQuery: `<OrderBy>
            <FieldRef Name="GtRiskFactor" Ascending="FALSE" />
          </OrderBy>
          <Where>
            <Eq>
              <FieldRef Name="GtRiskStatus" />
              <Value Type="Text">Ikke lenger aktuell</Value>
            </Eq>
          </Where>`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_WithoutResponsible_DisplayName"),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskFactor",
                "GtRiskStatus",
                "GtRiskAction",
                "GtActionResponsible",
                "Modified",
            ],
            AdditionalSettings: {
                RowLimit: 100,
                Paged: true,
                ViewQuery: ` <OrderBy>
            <FieldRef Name="GtRiskFactor" Ascending="FALSE" />
          </OrderBy>
          <Where>
            <IsNull>
              <FieldRef Name="GtActionResponsible" />
            </IsNull>
          </Where>`,
            },
        }],
};
exports.default = Uncertainties;
