"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const Assigned = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Assigned.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: Resources_1.default.getResource("WebPart_MyTasks_Title"),
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_MyTasks_Title"),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("Lists_Tasks_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("DefaultView_Tasks_Url")}`,
                }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Resources_1.default.getResource("Lists_Tasks_Title"),
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
            Title: Resources_1.default.getResource("WebPart_MyCommunicationElements_Title"),
            Zone: "RightColumn",
            Order: 0,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_MyCommunicationElements_Title"),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("Lists_CommunicationPlan_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("DefaultView_CommunicationPlan_Url")}`,
                }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Resources_1.default.getResource("Lists_CommunicationPlan_Title"),
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
            Title: Resources_1.default.getResource("WebPart_MyProjectDeliveries_Title"),
            Zone: "RightColumn",
            Order: 0,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_MyProjectDeliveries_Title"),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("Lists_ProjectDeliveries_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("DefaultView_ProjectDeliveries_Url")}`,
                }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Resources_1.default.getResource("Lists_ProjectDeliveries_Title"),
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
exports.default = Assigned;
