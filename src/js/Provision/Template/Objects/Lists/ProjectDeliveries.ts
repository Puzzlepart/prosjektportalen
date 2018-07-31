import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";
import { GtProductInteressent } from "./SiteFields";

const ProjectDeliveries: IList = {
    Title: __.getResource("Lists_ProjectDeliveries_Title"),
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
    Fields: [GtProductInteressent],
    Views: [{
        Title: __.getResource("View_AllItems_DisplayName"),
        ViewFields: ["LinkTitle", "GtProductDescription", "GtProductStartTime", "GtProductEndTime", "GtProductStatus", "GtProductStatusComment", "GtProductPhase"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    },
    {
        Title: __.getResource("View_ProductionPhase_DisplayName"),
        ViewFields: ["LinkTitle", "GtProductDescription", "GtProductStartTime", "GtProductEndTime", "GtProductStatus", "GtProductStatusComment"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<GroupBy Collapse="FALSE" GroupLimit="30">
            <FieldRef Name="GtProductPhase" />
          </GroupBy>`,
        },
    }],
};

export default ProjectDeliveries;
