interface IScript {
    fileName: string;
    appendVersion?: boolean;
}
/**
 * Scripts path
 */
const SCRIPTS_PATH = "SiteAssets/pp/js";

/**
 * Scripts to load
 */
const SCRIPTS: IScript[] = [
    {
        fileName: "fetch.min.js",
    },
    {
        fileName: "pp.main.js",
        appendVersion: true,
    },
];

export namespace PP.Loader {
    /**
     * Injects scripts into document.head
     *
     * @param siteUrl Site URL
     * @param version Script version
     */
    function injectScripts(siteUrl: string, version: string): void {
        const scriptElements: HTMLScriptElement[] = SCRIPTS.map(({ fileName, appendVersion }) => {
            let element = document.createElement("script");
            let scriptSrc = `${siteUrl}/${SCRIPTS_PATH}/${fileName}`;
            if (appendVersion === true) {
                scriptSrc += `?version=${version}`;
            }
            element.setAttribute("src", scriptSrc);
            return element;
        });
        scriptElements.forEach(element => document.head.appendChild(element));
    }

    /**
     * Loads the bundle
     *
     * @param siteUrl Site URL
     * @param version Script version
     */
    export function loadBundle(siteUrl: string, version: string): void {
        injectScripts(siteUrl, version);
    }
}
