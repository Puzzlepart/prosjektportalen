import RESOURCE_MANAGER from "../../../../@localization";
import { IFile } from "sp-pnp-provisioning/lib/schema";

export default function Assigned(language: number): IFile {
    return {
        Folder: "SitePages",
        Src: "{sitecollection}/Resources/SitePage.txt",
        Url: "Assigned.aspx",
        Overwrite: true,
        WebParts: [
            {
                Title: RESOURCE_MANAGER.getResource("WebPart_MyTasks_Title", language),
                Zone: "LeftColumn",
                Order: 0,
                PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: RESOURCE_MANAGER.getResource("WebPart_MyTasks_Title", language),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("Lists_Tasks_Url", language)}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("DefaultView_Tasks_Url", language)}`,
                }],
                Contents: {
                    FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                },
                ListView: {
                    List: RESOURCE_MANAGER.getResource("Lists_Tasks_Title", language),
                    View: {
                        Title: "",
                        ViewFields: ["Checkmark", "LinkTitle", "GtProjectPhase", "StartDate", "DueDate"],
                        AdditionalSettings: {
                            RowLimit: 10,
                            Paged: true,
                            ViewQuery: "<Where><Eq><FieldRef Name='AssignedTo' /><Value Type='Integer'><UserID/></Value></Eq></Where><OrderBy><FieldRef Name='DueDate' /></OrderBy>",
                        },
                    },
                },
            },
            {
                Title: RESOURCE_MANAGER.getResource("WebPart_MyCommunicationElements_Title", language),
                Zone: "RightColumn",
                Order: 0,
                PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: RESOURCE_MANAGER.getResource("WebPart_MyCommunicationElements_Title", language),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("Lists_CommunicationPlan_Url", language)}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("DefaultView_CommunicationPlan_Url", language)}`,
                }],
                Contents: {
                    FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                },
                ListView: {
                    List: RESOURCE_MANAGER.getResource("Lists_CommunicationPlan_Title", language),
                    View: {
                        Title: "",
                        ViewFields: ["LinkTitle", "GtProjectPhase", "GtActionDate", "GtCommunicationTarget"],
                        AdditionalSettings: {
                            RowLimit: 30,
                            Paged: true,
                            ViewQuery: "<Where><Eq><FieldRef Name='GtActionResponsible' /><Value Type='Integer'><UserID Type='Integer' /></Value></Eq></Where>",
                        },
                    },
                },
            },
            {
                Title: RESOURCE_MANAGER.getResource("WebPart_MyProjectDeliveries_Title", language),
                Zone: "RightColumn",
                Order: 0,
                PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: RESOURCE_MANAGER.getResource("WebPart_MyProjectDeliveries_Title", language),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("Lists_ProjectDeliveries_Url", language)}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("DefaultView_ProjectDeliveries_Url", language)}`,
                }],
                Contents: {
                    FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                },
                ListView: {
                    List: RESOURCE_MANAGER.getResource("Lists_ProjectDeliveries_Title", language),
                    View: {
                        Title: "",
                        ViewFields: ["LinkTitle", "GtProductPhase", "GtProductInteressent", "GtProductAcceptanceMethod", "GtProductAcceptanceDate"],
                        AdditionalSettings: {
                            RowLimit: 30,
                            Paged: true,
                            ViewQuery: "<Where><Or><Eq><FieldRef Name='GtProductQualityResponsible' /><Value Type='Integer'><UserID Type='Integer' /></Value></Eq><Eq><FieldRef Name='GtProductAcceptanceResponsible' /><Value Type='Integer'><UserID Type='Integer' /></Value></Eq></Or></Where>",
                        },
                    },
                },
            },
        ],
    };
}

