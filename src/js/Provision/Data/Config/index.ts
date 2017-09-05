import pnp from "sp-pnp-js";
import IListConfig from "./IListConfig";

const FIELD_PREFIX = "GtLcc";

let __CONFIG: { [key: string]: IListConfig } = null;

/**
 * Retrieve configuration fron list
 *
 * @param configList Configuration list
 */
export const RetrieveConfig = (configList = __("Lists_ListContentConfig_Title")): Promise<{ [key: string]: IListConfig }> => new Promise((resolve, reject) => {
    if (__CONFIG) {
        resolve(__CONFIG);
    } else {
        pnp.sp.web.lists.getByTitle(configList).items.get().then(configItems => {
            let config: { [key: string]: IListConfig } = {};
            configItems.forEach(item => {
                config[`${item.ID}`] = {
                    SourceUrl: item[`${FIELD_PREFIX}SourceUrl`],
                    SourceList: item[`${FIELD_PREFIX}SourceList`],
                    DestinationList: item[`${FIELD_PREFIX}DestinationList`],
                    DestinationLibrary: item[`${FIELD_PREFIX}DestinationLibrary`],
                    Fields: item[`${FIELD_PREFIX}Fields`].split(","),
                    Label: item[`${FIELD_PREFIX}Label`],
                    Default: item[`${FIELD_PREFIX}Default`],
                };
            });
            __CONFIG = config;
            resolve(config);
        }, reject);
    }
});

