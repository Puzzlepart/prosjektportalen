import { default as pnp, Util, Logger, LogLevel } from "sp-pnp-js";
import * as object_omit from "object.omit";

/**
 * Loads extension JSON
 *
 * @param file The extension file
 */
const LoadExtension = (file): Promise<any> => new Promise<any>((resolve, reject) => {
    pnp.sp.web.getFileByServerRelativeUrl(file.FileRef).getText().then(textContent => {
        let json = null;
        try {
            json = JSON.parse(textContent);
        } catch (e) {
            Logger.log({ message: `Extensions in file '${file.LinkFilename}' contains invalid JSON.`, data: Object.assign(obj, { Text: textContent }), level: LogLevel.Warning });
        }
        resolve(Object.assign(file, { JSON: json }));
    }, reject);
});

/**
 * Merge extensions with the template
 *
 * @param template The template
 */
export const MergeExtensions = (template) => new Promise<any>((resolve, reject) => {
    pnp.sp.web.lists.getByTitle(__("Lists_Extensions_Title")).items.select("Title", "LinkFilename", "FileRef").filter("ExtensionEnabled eq 1").get().then(items => {
        Promise.all(items.map(item => LoadExtension(item))).then((extensions: any[]) => {
            extensions
                .filter(({ JSON }) => JSON !== null)
                .forEach(({ LinkFilename, JSON }) => {
                    Object.keys(JSON).forEach(name => {
                        let _ = JSON[name];
                        Logger.log({ message: `Adding extensions from file '${LinkFilename}'.`, data: _, level: LogLevel.Info });
                        switch (name) {
                            case "PropertyBagEntries":
                            case "ComposedLook":
                            case "WebSettings": {
                                template[name] = Object.assign(template[name], _);
                            }
                                break;
                            case "Lists": {
                                template[name] = template[name] || [];
                                _.forEach(extList => {
                                    let index = template[name].map(list => list.Title).indexOf(extList.Title);
                                    if (index !== -1) {
                                        template[name][index] = Object.assign(template[name][index], extList);
                                    } else {
                                        template[name].push(extList);
                                    }
                                });
                            }
                                break;
                            case "Files": {
                                template[name] = template[name] || [];
                                _.forEach(extFile => {
                                    let index = template[name].map(file => file.Url).indexOf(extFile.Url);
                                    if (index !== -1) {
                                        template[name][index] = Object.assign(template[name][index], object_omit(extFile, "WebParts"));
                                        if (Util.isArray(extFile.WebParts)) {
                                            template[name][index].WebParts = template[name][index].WebParts.concat(extFile.WebParts);
                                        }
                                    } else {
                                        template[name].push(extFile);
                                    }
                                });
                            }
                                break;
                            case "Navigation": {
                                template[name] = template[name] || {};
                                template[name].TopNavigationBar = template[name].TopNavigationBar || [];
                                template[name].QuickLaunch = template[name].QuickLaunch || [];
                                if (Util.isArray(_.TopNavigationBar)) {
                                    template[name].TopNavigationBar = template[name].TopNavigationBar.concat(_.TopNavigationBar);
                                }
                                if (Util.isArray(_.QuickLaunch)) {
                                    template[name].QuickLaunch = template[name].QuickLaunch.concat(_.QuickLaunch);
                                }
                            }
                                break;
                        }
                    });
                });
            resolve(template);
        }, reject);
    });
});
