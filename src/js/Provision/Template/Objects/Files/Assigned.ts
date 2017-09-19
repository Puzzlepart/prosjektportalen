import { IFile } from "sp-pnp-provisioning/lib/schema";

const Assigned: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Assigned.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: Localization.getResource("WebPart_MyTasks_Title"),
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: Localization.getResource("WebPart_MyTasks_Title"),
            },
            {
                name: "ListUrl",
                type: "string",
                value: `{site}/${Localization.getResource("Lists_Tasks_Url")}`,
            },
            {
                name: "TitleUrl",
                type: "string",
                value: `{site}/${Localization.getResource("DefaultView_Tasks_Url")}`,
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Localization.getResource("Lists_Tasks_Title"),
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
            Title: Localization.getResource("WebPart_MyCommunicationElements_Title"),
            Zone: "RightColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: Localization.getResource("WebPart_MyCommunicationElements_Title"),
            },
            {
                name: "ListUrl",
                type: "string",
                value: `{site}/${Localization.getResource("Lists_CommunicationPlan_Url")}`,
            },
            {
                name: "TitleUrl",
                type: "string",
                value: `{site}/${Localization.getResource("DefaultView_CommunicationPlan_Url")}`,
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Localization.getResource("Lists_CommunicationPlan_Title"),
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
            Title: Localization.getResource("WebPart_MyProjectDeliveries_Title"),
            Zone: "RightColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: Localization.getResource("WebPart_MyProjectDeliveries_Title"),
            },
            {
                name: "ListUrl",
                type: "string",
                value: `{site}/${Localization.getResource("Lists_ProjectDeliveries_Url")}`,
            },
            {
                name: "TitleUrl",
                type: "string",
                value: `{site}/${Localization.getResource("DefaultView_ProjectDeliveries_Url")}`,
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Localization.getResource("Lists_ProjectDeliveries_Title"),
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

export default Assigned;
