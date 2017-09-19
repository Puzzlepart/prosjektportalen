
import RESOURCE_MANAGER from "localization";
import { IFile } from "sp-pnp-provisioning/lib/schema";

const ProjectStatus: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/ProjectStatus.txt",
    Url: "ProjectStatus.aspx",
    Overwrite: true,
    Properties: {
        Title: RESOURCE_MANAGER.getResource("Navigation_ProjectStatus_Title"),
    },
};

export default ProjectStatus;
