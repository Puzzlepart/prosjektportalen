import { FileAddResult } from "@pnp/sp";
import ListConfig from "../Config/ListConfig";
import IProvisionContext from "../../IProvisionContext";
/**
 * Copy files and folders to a destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 * @param {number} top Number of files to fetch
 */
export declare function CopyFiles(context: IProvisionContext, conf: ListConfig, top?: number): Promise<FileAddResult[]>;
