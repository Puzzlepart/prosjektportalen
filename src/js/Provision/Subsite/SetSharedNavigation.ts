import {
    CreateJsomContext,
    ExecuteJsomQuery,
} from 'jsom-ctx'

/**
 * Sets shared navigation for the specified web
 *
 * @param {string} url Url
 */
export default async function SetSharedNavigation(url: string): Promise<void> {
    try {
        const jsomCtx = await CreateJsomContext(url)
        jsomCtx.web.get_navigation().set_useShared(true)
        await ExecuteJsomQuery(jsomCtx)
        return
    } catch (err) {
        throw err
    }
}

