import { IFile } from "sp-pnp-provisioning/lib/schema";

export const ProjectStatus: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/ProjectStatus.txt",
    Url: "ProjectStatus.aspx",
    Overwrite: true,
    Properties: {
        Title: __("Navigation_ProjectStatus_Title"),
    },
};
