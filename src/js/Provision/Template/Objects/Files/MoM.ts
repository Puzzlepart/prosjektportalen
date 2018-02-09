import RESOURCE_MANAGER from "../../../../@localization";
import { IFile } from "sp-pnp-provisioning/lib/schema";

export default function MoM(language: number): IFile {
    return {
        Folder: "SitePages",
        Src: "{sitecollection}/Resources/SitePage.txt",
        Url: "Mom.aspx",
        Overwrite: true,
        WebParts: [
            {
                Title: RESOURCE_MANAGER.getResource("WebPart_LatestsTasks_Title", language),
                Zone: "LeftColumn",
                Order: 0,
                PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: RESOURCE_MANAGER.getResource("WebPart_LatestsTasks_Title", language),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("Lists_Tasks_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("DefaultView_Tasks_Url")}`,
                }],
                Contents: {
                    FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                },
                ListView: {
                    List: RESOURCE_MANAGER.getResource("Lists_Tasks_Title", language),
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
                Title: RESOURCE_MANAGER.getResource("WebPart_LatestInformation_Title", language),
                Zone: "RightColumn",
                Order: 1,
                PropertyOverrides: [{
                    name: "Title",
                    type: "string",
                    value: RESOURCE_MANAGER.getResource("WebPart_LatestInformation_Title", language),
                },
                {
                    name: "ListUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("Lists_Information_Url")}`,
                },
                {
                    name: "TitleUrl",
                    type: "string",
                    value: `{site}/${RESOURCE_MANAGER.getResource("DefaultView_Information_Url")}`,
                }],
                Contents: {
                    FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                },
                ListView: {
                    List: RESOURCE_MANAGER.getResource("Lists_Information_Title", language),
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
}

