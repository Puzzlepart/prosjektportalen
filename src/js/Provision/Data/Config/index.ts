import pnp from "sp-pnp-js";
import ListConfig from "./ListConfig";

let __CONFIG: { [key: string]: ListConfig } = null;

/**
 * Retrieve configuration fron list
 *
 * @param configList Configuration list
 */
export const RetrieveConfig = (configList = __("Lists_ListContentConfig_Title")): Promise<{ [key: string]: ListConfig }> => new Promise((resolve, reject) => {
    if (__CONFIG) {
        resolve(__CONFIG);
    } else {
        pnp.sp.web.lists.getByTitle(configList).items.get().then(configItems => {
            let config: { [key: string]: ListConfig } = {};
            configItems.forEach(item => {
                config[`${item.ID}`] = new ListConfig(item, "GtLcc");
            });
            __CONFIG = config;
            resolve(config);
        }, reject);
    }
});

export { ListConfig };

