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
import IProvisionContext from "../IProvisionContext";

/**
 * Copies list content (items or files) from source to destination for the specified list
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 */
async function Copy(context: IProvisionContext, conf: ListConfig): Promise<void> {
    await Util.ensureTaxonomy();
    try {
        if (conf.DestinationLibrary) {
            await CopyFiles(context, conf);
        } else {
            await CopyItems(context, conf);
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
    const { IncludeContent } = context.model;
    Logger.log({ message: "Starting copy of default data.", data: { IncludeContent }, level: LogLevel.Info });
    try {
        const listContentConfig = await RetrieveConfig();
        Logger.log({ message: "List content config retrieved.", data: { listContentConfig }, level: LogLevel.Info });
        for (let i = 0; i < IncludeContent.length; i++) {
            const contentKey = IncludeContent[i];
            if (listContentConfig.hasOwnProperty(contentKey)) {
                await Copy(context, listContentConfig[contentKey]);
            }
        }
        return;
    } catch (err) {
        throw err;
    }
}

export { CopyDefaultData };
