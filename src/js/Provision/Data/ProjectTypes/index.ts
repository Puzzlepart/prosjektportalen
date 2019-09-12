import __ from "../../../Resources";
import { Site } from "@pnp/sp";
import ListProjectType from "./ListProjectType";

/**
 * Retrieve list content configuration fron list
 */
export async function RetrieveProjectTypes(): Promise<ListProjectType[]> {
    const list = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle("Prosjekttyper");
    const projectTypeItems = await list.items.get();
    return projectTypeItems.map(item => new ListProjectType(item, "Gt"));
}

export { ListProjectType };

