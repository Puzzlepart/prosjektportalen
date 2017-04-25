import { default as pnp } from "sp-pnp-js";

const FIELD_PREFIX = "GtLcc";

export interface IListConfig {
    SourceUrl?: string;
    SourceList: string;
    DestinationList?: string;
    DestinationLibrary?: string;
    Fields: string[];
    Label: string;
    Default: boolean;
}

let __CONFIG: { [key: string]: IListConfig } = null;

export const RetrieveConfig = (): Promise<{ [key: string]: IListConfig }> => new Promise((resolve, reject) => {
    if (__CONFIG) {
        resolve(__CONFIG);
    } else {
        pnp.sp.web.lists.getByTitle("ListContentConfig").items.get().then(configItems => {
            let config: { [key: string]: IListConfig } = {};
            configItems.forEach(item => {
                config[item.Title] = {
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

