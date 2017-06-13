import { IFile } from "sp-pnp-provisioning/lib/schema";

export const MoM: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Mom.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: "Siste oppgaver",
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Siste oppgaver",
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
                        RowLimit: 30,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                    },
                },
            },
        },
        {
            Title: "Siste informasjonselementer",
            Zone: "RightColumn",
            Order: 1,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Siste informasjonselementer",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Lists/Informasjon",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Lists/Informasjon/AllItems.asp",
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: "Informasjon",
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
