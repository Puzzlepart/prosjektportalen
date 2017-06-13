import { IFile } from "sp-pnp-provisioning/lib/schema";

export const Assigned: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Assigned.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: "Mine oppgaver",
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Mine oppgaver",
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
            Title: "Mine kommunikasjonselementer",
            Zone: "RightColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Mine kommunikasjonselementer",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Lists/Kommunikasjonsplan",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Lists/Kommunikasjonsplan/AllItems.asp",
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: "Kommunikasjonsplan",
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
            Title: "Prosjektleveranser jeg har ansvar for",
            Zone: "RightColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Prosjektleveranser jeg har ansvar for",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Lists/Prosjektleveranser",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Lists/Prosjektleveranser/AllItems.asp",
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: "Prosjektleveranser",
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
