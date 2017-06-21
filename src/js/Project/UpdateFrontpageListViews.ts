import { sp, Logger, LogLevel } from "sp-pnp-js";
import * as Config from "./Config";

/**
 * Updates front page list views
 *
 * @param phaseName Phase term name
 */
const UpdateFrontpageListViews = (phaseName: string): Promise<any[]> => new Promise<any[]>((resolve, reject) => {
    const viewQuery = String.format(Config.FRONTPAGE_LISTS_VIEQUERY, Config.PROJECTPHASE_FIELD, phaseName);
    let getViewsPromises = Config.FRONTPAGE_LISTS.map(listTitle => sp.web.lists.getByTitle(listTitle).views.get());
    Promise.all(getViewsPromises).then(listViews => {
        let updateViewsPromises = [];
        listViews.forEach((views, i) => {
            let fViews = views.filter(v => v.ServerRelativeUrl.indexOf(__("Project_WelcomePage")) !== -1);
            updateViewsPromises = updateViewsPromises.concat(fViews.map(v => sp.web.lists.getByTitle(Config.FRONTPAGE_LISTS[i]).views.getById(v.Id).update({
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
