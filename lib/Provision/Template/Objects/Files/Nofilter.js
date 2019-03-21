"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const Nofilter = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Nofilter.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: Resources_1.default.getResource("WebPart_Tasks_Title"),
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_Tasks_Title"),
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
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy><GroupBy Collapse='TRUE'><FieldRef Name='GtProjectPhase' /></GroupBy>",
                    },
                },
            },
        },
        {
            Title: Resources_1.default.getResource("WebPart_Documents_Title"),
            Zone: "LeftColumn",
            Order: 1,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_Documents_Title"),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("Lists_Documents_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("DefaultView_Documents_Url")}`,
                }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Resources_1.default.getResource("Lists_Documents_Title"),
                View: {
                    Title: "",
                    ViewFields: ["DocIcon", "LinkFilename", "Modified", "Editor"],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy><GroupBy Collapse='TRUE'><FieldRef Name='GtProjectPhase' /></GroupBy>",
                    },
                },
            },
        },
        {
            Title: Resources_1.default.getResource("WebPart_SiteFeed_Title"),
            Zone: "RightColumn",
            Order: 0,
            Contents: {
                FileSrc: "{wpgallery}/SiteFeed.dwp",
            },
        },
        {
            Title: Resources_1.default.getResource("WebPart_Uncertainties_Title"),
            Zone: "RightColumn",
            Order: 1,
            PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: Resources_1.default.getResource("WebPart_Uncertainties_Title"),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("Lists_Uncertainties_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${Resources_1.default.getResource("DefaultView_Uncertainties_Url")}`,
                }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: Resources_1.default.getResource("Lists_Uncertainties_Title"),
                View: {
                    Title: "",
                    ViewFields: ["LinkTitle", "GtRiskProbability", "GtRiskConsequence", "GtRiskProximity", "GtRiskFactor"],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy><GroupBy Collapse='TRUE'><FieldRef Name='GtProjectPhase' /></GroupBy>",
                    },
                },
            },
        },
    ],
};
exports.default = Nofilter;
