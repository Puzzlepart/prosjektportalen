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
import IProvisionContext from "../IProvisionContext";

/**
 * Copies list content (items or files) from source to destination for the specified list
 *
 * @param {string} destUrl Destination URL
 * @param {ListConfig} conf List configuration
 * @param {IProgressCallback} onUpdateProgress Progress callback to caller
 */
async function Copy(destUrl: string, conf: ListConfig, onUpdateProgress: IProgressCallback): Promise<void> {
    await Util.ensureTaxonomy();
    try {
        if (conf.DestinationLibrary) {
            CopyFiles(conf, destUrl, onUpdateProgress);
            return;
        } else {
            await CopyItems(conf, destUrl, onUpdateProgress);
            return;
        }
    } catch (err) {
        throw err;
    }
}

/**
 * Copies default data from source to destination
 *
 * @param {IProvisionContext} context Provisioning context
 */
async function CopyDefaultData(context: IProvisionContext): Promise<void> {
    Logger.log({ message: "Starting copy of default data.", data: { contentToInclude: context.model.IncludeContent }, level: LogLevel.Info });
    try {
        const listContentConfig = await RetrieveConfig();
        Logger.log({ message: "List content config retrieved.", data: { listContentConfig }, level: LogLevel.Info });
        await context.model.IncludeContent
            .filter(key => Array.contains(context.model.IncludeContent, key) && listContentConfig.hasOwnProperty(key))
            .reduce((chain, key) => chain.then(_ => Copy(context.webCreationResult.url, listContentConfig[key], context.progressCallbackFunc)), Promise.resolve());
        return;
    } catch (err) {
        throw err;
    }
}

export { CopyDefaultData };
