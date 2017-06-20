
/**
 * Sets shared navigation for the specified web
 *
 * @param url Url
 * @param useShared Use shared navigation
 */
const SetSharedNavigation = (url: string, useShared = true): Promise<void> => new Promise<void>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const ctx = new SP.ClientContext(url);
        ctx.get_web().get_navigation().set_useShared(true);
        ctx.executeQueryAsync(resolve, reject);
    });
});

export default SetSharedNavigation;
