import RESOURCE_MANAGER from "../../../../@localization";
import { IFile } from "sp-pnp-provisioning/lib/schema";

export default function ProjectStatus(language: number): IFile {
    return {
        Folder: "SitePages",
        Src: "{sitecollection}/Resources/ProjectStatus.txt",
        Url: "ProjectStatus.aspx",
        Overwrite: true,
        Properties: {
            Title: RESOURCE_MANAGER.getResource("Navigation_ProjectStatus_Title", language),
        },
    };
}
