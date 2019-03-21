/// <reference types="sharepoint" />
import ListConfig from "../Config/ListConfig";
import IProvisionContext from "../../IProvisionContext";
import { CopyContext } from "./GetDataContext";
/**
 * Copy a single list item to the destination web
 *
 * @param {SP.ListItem} srcItem The source item
 * @param {string[]} fields Fields to copy
 * @param {CopyContext} dataCtx Copy context
 */
export declare function CopyItem(srcItem: SP.ListItem, fields: string[], dataCtx: CopyContext): Promise<void>;
/**
 * Copies list items to the destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 */
export declare function CopyItems(context: IProvisionContext, conf: ListConfig): Promise<void>;
