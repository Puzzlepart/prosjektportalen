import { Logger, LogLevel } from "sp-pnp-js";
import * as Util from "../../Util";
import { CopyFiles } from "./Files";
import { CopyItems } from "./Items";
import { RetrieveConfig, IListConfig } from "./Config";

/**
 * Copies list content (items or files) from source to destination for the specified list
 *
 * @param destUrl Destination URL
 * @param conf List configuration
 * @param progressCb Progress callback to caller
 */
const Copy = (destUrl: string, conf: IListConfig, progressCb: Function): Promise<any> => new Promise<any>((resolve, reject) => {
    Util.ensureTaxonomy().then(() => {
        progressCb(conf.SourceList);
        if (conf.DestinationLibrary) {
            CopyFiles(conf, destUrl).then(resolve, resolve);
        } else {
            CopyItems(conf, destUrl).then(resolve, resolve);
        }
    }, reject);
});

/**
 * Copies list content from source to destination
 *
 * @param destUrl Destination URL
 * @param content Content to copy
 * @param progressCb Progress callback to caller
 */
export const CopyListContents = (destUrl: string, content: { [key: string]: boolean }, progressCb: Function = () => null): Promise<void> => new Promise<void>((resolve, reject) => {
    Logger.write(`Starting copy of list contents and documents.`, LogLevel.Info);
    RetrieveConfig().then(config => {
        Object.keys(content).filter(key => content[key] && config.hasOwnProperty(key)).reduce((chain, key) => chain.then(_ => Copy(destUrl, config[key], progressCb)), Promise.resolve()).then(() => {
            Logger.write(`Copy of list contents and documents done.`, LogLevel.Info);
            resolve();
        }, reason => {
            Logger.write(`Copy of list contents and documents done with errors.`, LogLevel.Info);
            resolve();
        });
    });
});

