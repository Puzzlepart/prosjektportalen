import { IFile } from "sp-pnp-provisioning/lib/schema";

export const Nofilter: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Nofilter.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: "Oppgaver",
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Oppgaver",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Lists/Oppgaver",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Lists/Oppgaver/AllItems.asp",
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: "Oppgaver",
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
            Title: "Dokumenter",
            Zone: "LeftColumn",
            Order: 1,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Dokumenter",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Delte dokumenter",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Delte dokumenter/Forms/AllItems.asp",
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: "Dokumenter",
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
            Title: "Områdefeed",
            Zone: "RightColumn",
            Order: 0,
            Contents: {
                FileSrc: "{wpgallery}/SiteFeed.dwp",
            },
        },
        {
            Title: "Usikkerhet",
            Zone: "RightColumn",
            Order: 1,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Usikkerhet",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Lists/Usikkerhet",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Lists/Usikkerhet/AllItems.asp",
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: "Usikkerhet",
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
