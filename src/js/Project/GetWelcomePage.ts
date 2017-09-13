import * as Util from "../Util";
/**
 * Get welcome page
 */
const GetWelcomePage = () => new Promise<any>((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        let welcomePage = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId).getItemById(3);
        ctx.load(welcomePage);
        ctx.executeQueryAsync(() => {
            resolve(welcomePage.get_fieldValues());
        }, reject);
    });
});

export default GetWelcomePage;

