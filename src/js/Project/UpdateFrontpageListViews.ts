import RESOURCE_MANAGER from "localization";
import { sp, Logger, LogLevel } from "sp-pnp-js";
import * as Config from "./Config";

/**
 * Updates front page list views
 *
 * @param {string} phaseName Phase term name
 */
async function UpdateFrontpageListViews(phaseName: string): Promise<void> {
    const newViewQuery = String.format(Config.FRONTPAGE_LISTS_VIEQUERY, Config.PROJECTPHASE_FIELD, phaseName);
    const listsOnFrontpage = Config.FRONTPAGE_LISTS.filter(({ wpTitle }) => document.querySelector(`.ms-webpart-chrome-title .js-webpart-titleCell[title='${wpTitle}']`) !== null);
    try {
        const listViews = await Promise.all(listsOnFrontpage.map(({ listTitle }) => sp.web.lists.getByTitle(listTitle).views.get()));
        let updateViewsPromises = [];
        listViews.forEach((views, index) => {
            const list = sp.web.lists.getByTitle(listsOnFrontpage[index].listTitle);
            const frontpageViews = views.filter(v => v.ServerRelativeUrl.indexOf(RESOURCE_MANAGER.getResource("Project_WelcomePage")) !== -1);
            updateViewsPromises = [
                ...updateViewsPromises,
                frontpageViews.map(v => list.views.getById(v.Id).update({ ViewQuery: newViewQuery })),
            ];
        });
        await Promise.all(updateViewsPromises);
        Logger.log({ message: "Successfully updated front page list views", data: { phaseName, lists: Config.FRONTPAGE_LISTS }, level: LogLevel.Info });
        return;
    } catch (err) {
        Logger.log({ message: "Failed to update front page list views", data: { phaseName, lists: Config.FRONTPAGE_LISTS, err }, level: LogLevel.Info });
        throw err;
    }

}

export default UpdateFrontpageListViews;
