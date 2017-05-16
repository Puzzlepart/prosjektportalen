interface IScript {
    fileName: string;
    appendVersion?: boolean;
}

const SCRIPTS_PATH = "SiteAssets/pp/js";
const SCRIPTS: IScript[] = [
    {
        fileName: "fetch.min.js",
    },
    {
        fileName: "pp.main.js",
        appendVersion: true,
    },
];

namespace PP.Loader {
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

    export function loadBundle(siteUrl: string, version: string): void {
        injectScripts(siteUrl, version);
    }
}
