import RESOURCE_MANAGER from "localization";
import {
    Logger,
    LogLevel,
} from "sp-pnp-js";
import ListConfig from "../Config/ListConfig";
import IProvisionContext from "../../IProvisionContext";
import ProvisionError from "../../ProvisionError";
import * as Util from "../../../Util";
import GetDataContext, { CopyContext } from "./GetDataContext";

interface IRecord {
    SourceId: number;
    DestId: number;
    DestItem: SP.ListItem<any>;
    ParentID?: number;
}

let __RECORDS: IRecord[] = [];

/**
 * Copy a single list item to the destination web
 *
 * @param {SP.ListItem} srcItem The source item
 * @param {string[]} fields Fields to copy
 * @param {CopyContext} dataCtx Copy context
 */
export async function CopyItem(srcItem: SP.ListItem, fields: string[], dataCtx: CopyContext): Promise<void> {
    const sourceItemId = srcItem.get_fieldValues()["ID"];
    Logger.log({ message: `Copy of list item #${sourceItemId} starting.`, data: { fields }, level: LogLevel.Info });
    const destItem = dataCtx.Destination.list.addItem(new SP.ListItemCreationInformation());
    fields.forEach(fieldName => {
        const fieldValue = srcItem.get_item(fieldName);
        Logger.log({ message: `Setting value for field ${fieldName}`, data: {}, level: LogLevel.Info });
        Util.setItemFieldValue(fieldName, destItem, fieldValue, dataCtx.Destination._, dataCtx.Destination.list);
    });
    try {
        destItem.update();
        await dataCtx.loadAndExecuteQuery(dataCtx.Destination._, [destItem]);
        const record: IRecord = {
            SourceId: sourceItemId,
            DestId: destItem.get_fieldValues()["ID"],
            DestItem: destItem,
        };
        if (srcItem.get_fieldValues()["ParentID"]) {
            record.ParentID = parseInt(srcItem.get_fieldValues()["ParentID"].get_lookupValue(), 10);
        }
        __RECORDS.push(record);
        Logger.log({ message: `Copy of list item #${sourceItemId} done.`, data: {}, level: LogLevel.Info });
        return;
    } catch (err) {
        throw new ProvisionError(err, "CopyItem");
    }
}

/**
 * Copies list items to the destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 */
export async function CopyItems(context: IProvisionContext, conf: ListConfig): Promise<void> {
    Logger.log({ message: "Copy of list items started.", data: { conf }, level: LogLevel.Info });
    try {
        const dataCtx = await GetDataContext(conf, context.url);
        const items = dataCtx.Source.list.getItems(dataCtx.CamlQuery);
        await dataCtx.loadAndExecuteQuery(dataCtx.Source._, [items]);
        context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_CopyListContent"), String.format(RESOURCE_MANAGER.getResource("ProvisionWeb_CopyItems"), items.get_count(), conf.SourceList, conf.DestinationList));
        await items.get_data().reduce((chain, srcItem) => chain.then(_ => CopyItem(srcItem, conf.Fields, dataCtx)), Promise.resolve());
        await HandleItemsWithParent(dataCtx);
        Logger.log({ message: "Copy of list items done.", data: { conf }, level: LogLevel.Info });
        return;
    } catch (err) {
        throw err;
    }
}

/**
 * Handle list items with parent
 *
 * @param {CopyContext} dataCtx Data context
 */
async function HandleItemsWithParent(dataCtx: CopyContext): Promise<void> {
    const itemsWithParent = __RECORDS.filter(item => item.hasOwnProperty("ParentID"));
    itemsWithParent.forEach(item => {
        let [parent] = __RECORDS.filter(({ SourceId }) => SourceId === item.ParentID);
        if (parent) {
            item.DestItem.set_item("ParentID", parent.DestId);
            item.DestItem.update();
        }
    });
    try {
        await dataCtx.loadAndExecuteQuery(dataCtx.Destination._);
        return;
    } catch (err) {
        throw new ProvisionError(err, "HandleItemsWithParent");
    }
}
