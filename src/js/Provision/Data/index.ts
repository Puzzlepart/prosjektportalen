import { Logger, LogLevel } from "sp-pnp-js";
import * as Util from "../../Util";
import { CopyFiles } from "./Files";
import { CopyItems } from "./Items";
import { RetrieveConfig, IListConfig } from "./Config";
import IProgressCallback from "../IProgressCallback";

/**
 * Copies list content (items or files) from source to destination for the specified list
 *
 * @param destUrl Destination URL
 * @param conf List configuration
 * @param onProgress Progress callback to caller
 */
const Copy = (destUrl: string, conf: IListConfig, onProgress: IProgressCallback): Promise<any> => new Promise<any>((resolve, reject) => {
    Util.ensureTaxonomy().then(() => {
        if (conf.DestinationLibrary) {
            CopyFiles(conf, destUrl, onProgress)
                .then(resolve, resolve);
        } else {
            CopyItems(conf, destUrl, onProgress)
                .then(resolve, resolve);
        }
    });
});

/**
 * Copies list content from source to destination
 *
 * @param destUrl Destination URL
 * @param contentToInclude Content to copy
 * @param onProgress Progress callback to caller
 */
export const CopyListContents = (destUrl: string, contentToInclude: string[], onProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    Logger.write(`Starting copy of list contents and documents.`, LogLevel.Info);
    RetrieveConfig().then(config => {
        contentToInclude
            .filter(key => Array.contains(contentToInclude, key) && config.hasOwnProperty(key))
            .reduce((chain, key) => chain.then(_ => Copy(destUrl, config[key], onProgress)), Promise.resolve()).then(() => {
                Logger.write(`Copy of list contents and documents done.`, LogLevel.Info);
                resolve();
            }, reason => {
                Logger.write(`Copy of list contents and documents done with errors.`, LogLevel.Info);
                resolve();
            });
    });
});

