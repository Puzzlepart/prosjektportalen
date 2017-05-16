import { IFile } from "sp-pnp-provisioning/lib/schema";

export const ProjectHome: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "ProjectHome.aspx",
    Overwrite: true,
    Properties: {
        Title: "Hjemmeside",
        ContentTypeId: "0x010109010058561F86D956412B9DD7957BBCD67AAE01",
    },
    RemoveExistingWebParts: true,
    WebParts: [
        {
            Title: "Prosjektets faser",
            Zone: "LeftColumn",
            Order: 0,
            Contents: {
                Xml: require("./WebParts/Prosjektets faser"),
            },
        },
        {
            Title: "Oppgaver (gjeldende fase)",
            Zone: "LeftColumn",
            Order: 1,
            Contents: {
                Xml: require("./WebParts/Oppgaver (gjeldende fase)"),
            },
            ListView: {
                List: "Oppgaver",
                View: {
                    Title: "",
                    ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo"],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                    },
                },
            },
        },
        {
            Title: "Dokumenter (gjeldende fase)",
            Zone: "LeftColumn",
            Order: 2,
            Contents: {
                Xml: require("./WebParts/Dokumenter (gjeldende fase)"),
            },
            ListView: {
                List: "Dokumenter",
                View: {
                    Title: "",
                    ViewFields: ["DocIcon", "LinkFilename", "Modified", "Editor"],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                        Scope: 0,
                    },
                },
            },
        },
        {
            Title: "Gevinstanalyse og gevinstrealiseringsplan",
            Zone: "LeftColumn",
            Order: 3,
            Contents: {
                Xml: require("./WebParts/Gevinstanalyse og gevinstrealiseringsplan"),
            },
            ListView: {
                List: "Gevinstanalyse og gevinstrealiseringsplan",
                View: {
                    Title: "",
                    ViewFields: ["LinkTitle", "GtChangeLookup", "GtGainsType", "GtRealizationTime"],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                    },
                },
            },
        },
        {
            Title: "Om prosjektet",
            Zone: "RightColumn",
            Order: 0,
            Contents: {
                Xml: require("./WebParts/Om prosjektet"),
            },
        },
        {
            Title: "Områdefeed",
            Zone: "RightColumn",
            Order: 1,
            Contents: {
                Xml: require("./WebParts/Områdefeed"),
            },
        },
        {
            Title: "Usikkerhet (gjeldende fase)",
            Zone: "RightColumn",
            Order: 2,
            Contents: {
                Xml: require("./WebParts/Usikkerhet (gjeldende fase)"),
            },
            ListView: {
                List: "Usikkerhet",
                View: {
                    Title: "",
                    ViewFields: ["LinkTitle", "GtRiskProbability", "GtRiskConsequence", "GtRiskProximity"],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                    },
                },
            },
        },
    ],
};
