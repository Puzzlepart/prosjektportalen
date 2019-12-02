import __ from "../../Resources";
import { Site } from "@pnp/sp";
import ITemplateFile from "./ITemplateFile";

/**
 * Get selectable template from templates library
 */
export default async function GetSelectableTemplates(): Promise<ITemplateFile[]> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const templatesLib = rootWeb.lists.getByTitle(__.getResource("Lists_SiteTemplates_Title"));
    try {
        const selectableTemplates = await templatesLib
            .items
            .select("Id", "Title", "Comments", "FileRef", "GtIsDefault")
            .filter("GtIsEnabled eq 1")
            .orderBy("GtOrder")
            .get();
        return selectableTemplates;
    } catch (err) {
        throw err;
    }
}
