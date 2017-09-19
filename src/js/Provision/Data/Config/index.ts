import { Site } from "sp-pnp-js";
import ListConfig from "./ListConfig";

let __CONFIG: { [key: string]: ListConfig } = null;

/**
 * Retrieve list content configuration fron list
 *
 * @param  {string} configList Configuration list
 */
export const RetrieveConfig = (configList = Localization.getResource("Lists_ListContentConfig_Title")): Promise<{ [key: string]: ListConfig }> => new Promise((resolve, reject) => {
    if (__CONFIG) {
        resolve(__CONFIG);
    } else {
        const list = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(configList);
        list.items.get()
            .then(configItems => {
                let config: { [key: string]: ListConfig } = {};
                configItems.forEach(item => {
                    config[`${item.ID}`] = new ListConfig(item, "GtLcc");
                });
                __CONFIG = config;
                resolve(config);
            })
            .catch(reject);
    }
});

export { ListConfig };

