import {
    CreateJsomContext,
    ExecuteJsomQuery,
} from "jsom-ctx";

/**
 * Sets shared navigation for the specified web
 *
 * @param {string} url Url
 * @param {boolean} useShared Use shared navigation
 */
export default async function SetSharedNavigation(url: string, useShared = true): Promise<void> {
    try {
        let jsomCtx = await CreateJsomContext(url);
        console.log(jsomCtx);
        jsomCtx.web.get_navigation().set_useShared(true);
        await ExecuteJsomQuery(jsomCtx);
        return;
    } catch (err) {
        throw err;
    }
}

