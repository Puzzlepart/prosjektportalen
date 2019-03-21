"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const MoM = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Mom.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: Resources_1.default.getResource("WebPart_LatestsTasks_Title"),
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_LatestsTasks_Title"),
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
                    ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo"],
                    AdditionalSettings: {
                        RowLimit: 30,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                    },
                },
            },
        },
        {
            Title: Resources_1.default.getResource("WebPart_LatestInformation_Title"),
            Zone: "RightColumn",
            Order: 1,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_LatestInformation_Title"),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("Lists_Information_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("DefaultView_Information_Url")}`,
                }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Resources_1.default.getResource("Lists_Information_Title"),
                View: {
                    Title: "",
                    ViewFields: ["LinkTitle", "GtProjectInfoDescription"],
                    AdditionalSettings: {
                        RowLimit: 30,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                    },
                },
            },
        },
    ],
};
exports.default = MoM;
