/**
 * Scripts path
 */
const SCRIPTS_PATH = "siteassets/pp/js";

export namespace PP.Loader {
    /**
     * Load SOD
     *
     * @param siteUrl Site URL
     * @param version Script version
     */
    function _loadBundle(siteUrl: string, version: string): void {
        let scriptSrc = `${siteUrl}/${SCRIPTS_PATH}/pp.main.js?version=${version}`;
        SP.SOD.registerSod("pp.main.js", scriptSrc);
        SP.SOD.executeFunc("pp.main.js", "__pp_initializeBundle", () => {
            ExecuteOrDelayUntilBodyLoaded(() => {
                window["__pp_initializeBundle"]();
            });
        });
    }

    /**
     * Loads the bundle
     *
     * @param siteUrl Site URL
     * @param version Script version
     */
    export function loadBundle(siteUrl: string, version: string): void {
        _loadBundle(siteUrl, version);
    }
}
