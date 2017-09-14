import {
    Logger,
    LogLevel,
} from "sp-pnp-js";
import * as Util from "../../Util";
import { CopyFiles } from "./Files";
import { CopyItems } from "./Items";
import {
    RetrieveConfig,
    ListConfig,
} from "./Config";
import IProgressCallback from "../IProgressCallback";

/**
 * Copies list content (items or files) from source to destination for the specified list
 *
 * @param {string} destUrl Destination URL
 * @param {ListConfig} conf List configuration
 * @param {IProgressCallback} onUpdateProgress Progress callback to caller
 */
const Copy = (destUrl: string, conf: ListConfig, onUpdateProgress: IProgressCallback) => new Promise<any>((resolve, reject) => {
    Util.ensureTaxonomy().then(() => {
        if (conf.DestinationLibrary) {
            CopyFiles(conf, destUrl, onUpdateProgress)
                .then(resolve)
                .catch(reject);
        } else {
            CopyItems(conf, destUrl, onUpdateProgress)
                .then(resolve)
                .catch(reject);
        }
    });
});

/**
 * Copies default data from source to destination
 *
 * @param {string} destUrl Destination URL
 * @param {string[]} contentToInclude Content to copy
 * @param {IProgressCallback} onUpdateProgress Progress callback to caller
 */
export const CopyDefaultData = (destUrl: string, contentToInclude: string[], onUpdateProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    Logger.log({ message: "Starting copy of default data.", data: { contentToInclude }, level: LogLevel.Info });
    RetrieveConfig().then(listContentConfig => {
        Logger.log({ message: "List content config retrieved.", data: { listContentConfig }, level: LogLevel.Info });
        contentToInclude
            .filter(key => Array.contains(contentToInclude, key) && listContentConfig.hasOwnProperty(key))
            .reduce((chain, key) => chain.then(_ => Copy(destUrl, listContentConfig[key], onUpdateProgress)), Promise.resolve())
            .then(() => {
                Logger.write("Copy of default data done.", LogLevel.Info);
                resolve();
            })
            .catch(reason => {
                Logger.log({ message: "Copy of default data done with errors.", level: LogLevel.Warning });
                reject(reason);
            });
    });
});

