import __ from "../../../Resources";
import { Site } from "@pnp/sp";
import ProjectType from "./ProjectType";

/**
 * Retrieve project types from list
 */
export async function RetrieveProjectTypes(): Promise<ProjectType[]> {
    const list = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle("Prosjekttyper");
    const projectTypeItems = await list.items.select("Title", "GtTemplateLookupId", "GtExtensionsLookupId", "GtListContentsLookupId").get();
    return projectTypeItems.map(item => new ProjectType(item));
}

export { ProjectType };

