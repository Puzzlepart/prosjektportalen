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
            Contents: {
                Xml: require("./WebParts/Mine oppgaver"),
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
            Contents: {
                Xml: require("./WebParts/Mine kommunikasjonselementer"),
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
            Contents: {
                Xml: require("./WebParts/Prosjektleveranser jeg har ansvar for"),
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
