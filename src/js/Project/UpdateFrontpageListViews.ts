import RESOURCE_MANAGER from "localization";
import { sp, Logger, LogLevel } from "sp-pnp-js";
import * as Config from "./Config";

/**
 * Updates front page list views
 *
 * @param {string} phaseName Phase term name
 */
const UpdateFrontpageListViews = (phaseName: string) => new Promise<void>((resolve, reject) => {
    const viewQuery = String.format(Config.FRONTPAGE_LISTS_VIEQUERY, Config.PROJECTPHASE_FIELD, phaseName);
    const lists = Config.FRONTPAGE_LISTS.filter(({ wpTitle }) => document.querySelector(`.ms-webpart-chrome-title .js-webpart-titleCell[title='${wpTitle}']`) !== null);
    const getViewsPromises = lists.map(({ listTitle }) => sp.web.lists.getByTitle(listTitle).views.get());
    Promise.all(getViewsPromises).then(listViews => {
        let updateViewsPromises = [];
        listViews.forEach((views, i) => {
            let { listTitle, wpTitle } = lists[i];
            let fViews = views.filter(v => v.ServerRelativeUrl.indexOf(RESOURCE_MANAGER.getResource("Project_WelcomePage")) !== -1);
            Logger.log({ message: `ChangeProjectPhase: Updating list view for webpart '${wpTitle}' for list ${listTitle}`, level: LogLevel.Info });
            updateViewsPromises = updateViewsPromises.concat(fViews.map(v => sp.web.lists.getByTitle(listTitle).views.getById(v.Id).update({
                ViewQuery: viewQuery,
            })));
        });
        Promise.all(updateViewsPromises).then(() => {
            Logger.log({ message: `ChangeProjectPhase: Successfully updated front page list views`, data: { phaseName: phaseName, lists: Config.FRONTPAGE_LISTS }, level: LogLevel.Info });
            resolve();
        }, () => {
            Logger.log({ message: `ChangeProjectPhase: Failed to update front page list views`, data: { phaseName: phaseName, lists: Config.FRONTPAGE_LISTS }, level: LogLevel.Info });
            UpdateFrontpageListViews(phaseName).then(resolve, () => {
                UpdateFrontpageListViews(phaseName).then(resolve, reject);
            });
        });
    }, () => {
        Logger.log({ message: `ChangeProjectPhase: Failed to update front page list views`, data: { phaseName: phaseName, lists: Config.FRONTPAGE_LISTS }, level: LogLevel.Info });
        UpdateFrontpageListViews(phaseName).then(resolve, () => {
            UpdateFrontpageListViews(phaseName).then(resolve, reject);
        });
    });
});

export default UpdateFrontpageListViews;
