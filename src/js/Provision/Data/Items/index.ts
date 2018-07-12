import __ from "../../../Resources";
import { Logger, LogLevel } from "sp-pnp-js";
import ListConfig from "../Config/ListConfig";
import IProvisionContext from "../../IProvisionContext";
import ProvisionError from "../../ProvisionError";
import { setItemFieldValue, SetItemFieldValueResult } from "../../../Util";
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
    try {
        const sourceItemId = srcItem.get_fieldValues()["ID"];
        Logger.log({ message: `(CopyItem) Copy of list item #${sourceItemId} starting.`, data: { fields }, level: LogLevel.Info });
        const destItem = dataCtx.Destination.list.addItem(new SP.ListItemCreationInformation());
        fields.forEach(fieldName => {
            const fieldValue = srcItem.get_item(fieldName);
            const fieldType = dataCtx.listFieldsMap[fieldName];
            Logger.log({ message: `(CopyItem) Setting value for field ${fieldName} (${fieldType})`, level: LogLevel.Info });
            const result = setItemFieldValue(fieldName, destItem, fieldValue, fieldType, dataCtx.Destination._, dataCtx.Destination.list);
            switch (result) {
                case SetItemFieldValueResult.FieldTypeNotSupported: {
                    Logger.log({ message: `(CopyItem) Field type ${fieldType} is not supported`, data: {}, level: LogLevel.Warning });
                }
            }
        });
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
        Logger.log({ message: `(CopyItem) Copy of list item #${sourceItemId} done.`, data: {}, level: LogLevel.Info });
        return;
    } catch (err) {
        throw err;
    }
}

/**
 * Copies list items to the destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 */
export async function CopyItems(context: IProvisionContext, conf: ListConfig): Promise<void> {
    Logger.log({ message: "(CopyItem) Copy of list items started.", data: { conf }, level: LogLevel.Info });
    let dataCtx: CopyContext;
    let listItems: SP.ListItem<any>[];

    try {
        dataCtx = await GetDataContext(conf, context.url);
        const listItemCollection = dataCtx.Source.list.getItems(dataCtx.CamlQuery);
        const listFieldCollection = dataCtx.Source.list.get_fields();
        await dataCtx.loadAndExecuteQuery(dataCtx.Source._, [listItemCollection, listFieldCollection]);
        listItems = listItemCollection.get_data();
        dataCtx.listFieldsMap = listFieldCollection.get_data().reduce((obj, field) => {
            const fieldName = field.get_internalName();
            obj[fieldName] = field.get_typeAsString();
            return obj;
        }, {});
    } catch (err) {
        throw err;
    }
    try {
        context.progressCallbackFunc(__.getResource("ProvisionWeb_CopyListContent"), String.format(__.getResource("ProvisionWeb_CopyItems"), listItems.length, conf.SourceList, conf.DestinationList));
        await listItems.reduce((chain: Promise<any>, srcItem) => chain.then(_ => CopyItem(srcItem, conf.Fields, dataCtx)), Promise.resolve());
        await HandleItemsWithParent(dataCtx);
        Logger.log({ message: "(CopyItems) Copy of list items done.", data: { conf }, level: LogLevel.Info });
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
    } catch (err) {
        throw new ProvisionError(err, "HandleItemsWithParent");
    }
}
