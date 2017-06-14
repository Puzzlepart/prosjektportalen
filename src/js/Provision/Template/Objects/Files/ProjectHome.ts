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
                FileSrc: "{wpgallery}/ProjectPhases.webpart",
            },
        },
        {
            Title: "Tidslinje",
            Zone: "LeftColumn",
            Order: 1,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Tidslinje",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Lists/Oppgaver",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Lists/Oppgaver/AllItems.aspx",
            },
            {
                name: "CurrentTaskListWebAddress",
                type: "string",
                value: "{site}",
            },
            {
                name: "PageAddress",
                type: "string",
                value: "{site}",
            },
            {
                name: "ViewName",
                type: "string",
                value: "Tidslinje",
            },
            {
                name: "TimelineType",
                type: "string",
                value: "TaskListTimeline",
            }],
            Contents: {
                FileSrc: "{wpgallery}/Timeline.webpart",
            },
        },
        {
            Title: "Dokumenter (gjeldende fase)",
            Zone: "LeftColumn",
            Order: 2,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Dokumenter (gjeldende fase)",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Delte dokumenter",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Delte dokumenter/Forms/AllItems.aspx",
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
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Gevinstanalyse og gevinstrealiseringsplan",
            },
            {
                name: "ListUrl",
                type: "string",
                value: "{site}/Lists/Gevinstanalyse og gevinstrealiseringsplan",
            },
            {
                name: "TitleUrl",
                type: "string",
                value: "{site}/Lists/Gevinstanalyse og gevinstrealiseringsplan/AllItems.asp",
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
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
                FileSrc: "{wpgallery}/ProjectInfo.webpart",
            },
        },
        {
            Title: "Områdefeed",
            Zone: "RightColumn",
            Order: 1,
            Contents: {
                FileSrc: "{wpgallery}/SiteFeed.dwp",
            },
        },
        {
            Title: "Usikkerhet (gjeldende fase)",
            Zone: "RightColumn",
            Order: 2,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: "Usikkerhet (gjeldende fase",
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
