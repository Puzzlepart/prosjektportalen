import { IFile } from "sp-pnp-provisioning/lib/schema";

const MoM: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage.txt",
    Url: "Mom.aspx",
    Overwrite: true,
    WebParts: [
        {
            Title: __("WebPart_LatestsTasks_Title"),
            Zone: "LeftColumn",
            Order: 0,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: __("WebPart_LatestsTasks_Title"),
            },
            {
                name: "ListUrl",
                type: "string",
                value: `{site}/${__("Lists_Tasks_Url")}`,
            },
            {
                name: "TitleUrl",
                type: "string",
                value: `{site}/${__("DefaultView_Tasks_Url")}`,
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: __("Lists_Tasks_Title"),
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
            Title: __("WebPart_LatestInformation_Title"),
            Zone: "RightColumn",
            Order: 1,
            PropertyOverrides: [{
                name: "Title",
                type: "string",
                value: __("WebPart_LatestInformation_Title"),
            },
            {
                name: "ListUrl",
                type: "string",
                value: `{site}/${__("Lists_Information_Url")}`,
            },
            {
                name: "TitleUrl",
                type: "string",
                value: `{site}/${__("DefaultView_Information_Url")}`,
            }],
            Contents: {
                FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
            },
            ListView: {
                List: __("Lists_Information_Title"),
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

export default MoM;
