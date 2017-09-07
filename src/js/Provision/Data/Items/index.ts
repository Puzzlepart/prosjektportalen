import {
    Logger,
    LogLevel,
} from "sp-pnp-js";
import ListConfig from "../Config/ListConfig";
import IProgressCallback from "../../IProgressCallback";
import * as Util from "../../../Util";
import GetDataContext, { CopyContext } from "./GetDataContext";

interface IRecord {
    SourceId: number;
    DestId: number;
    DestItem: SP.ListItem<any>;
    ParentID: number;
}

let __RECORDS: IRecord[] = [];

/**
 * Copy a single list item to the destination web
 *
 * @param {SP.ListItem} srcItem The source item
 * @param {string[]} fields Fields to copy
 * @param {CopyContext} dataCtx Copy context
 */
export const CopyItem = (srcItem: SP.ListItem, fields: string[], dataCtx: CopyContext) => new Promise<void>((resolve, reject) => {
    const sourceItemId = srcItem.get_fieldValues()["ID"];
    Logger.log({ message: `Copy of list item #${sourceItemId} starting.`, data: { fields }, level: LogLevel.Info });
    const destItem = dataCtx.Destination.list.addItem(new SP.ListItemCreationInformation());
    fields.forEach(fieldName => {
        const fieldValue = srcItem.get_item(fieldName);
        Logger.log({ message: `Setting value for field ${fieldName}`, data: {}, level: LogLevel.Info });
        Util.setItemFieldValue(fieldName, destItem, fieldValue, dataCtx.Destination._, dataCtx.Destination.list);
    });
    destItem.update();
    dataCtx.Destination._.load(destItem);
    dataCtx.Destination._.executeQueryAsync(() => {
        const record: IRecord = {
            SourceId: sourceItemId,
            DestId: destItem.get_fieldValues()["ID"],
            DestItem: destItem,
            ParentID: srcItem.get_fieldValues()["ParentID"] ? parseInt(srcItem.get_fieldValues()["ParentID"].get_lookupValue(), 10) : null,
        };
        __RECORDS.push(record);
        Logger.log({ message: `Copy of list item #${sourceItemId} done.`, data: { record }, level: LogLevel.Info });
        resolve();
    }, (sender, args) => {
        reject({ sender, args });
    });
});

/**
 * Copies list items to the destination web
 *
 * @param {ListConfig} conf Configuration
 * @param {string} destUrl Destination web URL
 * @param {IProgressCallback} onUpdateProgress Progress callback to caller
 */
export const CopyItems = (conf: ListConfig, destUrl: string, onUpdateProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    GetDataContext(conf, destUrl)
        .then(dataCtx => {
            const items = dataCtx.Source.list.getItems(dataCtx.CamlQuery);
            dataCtx.Source._.load(items);
            dataCtx.Source._.executeQueryAsync(() => {
                onUpdateProgress(__("ProvisionWeb_CopyListContent"), String.format(__("ProvisionWeb_CopyItems"), items.get_count(), conf.SourceList, conf.DestinationList));
                items.get_data().reduce((chain, srcItem) => chain.then(_ => CopyItem(srcItem, conf.Fields, dataCtx)), Promise.resolve())
                    .then(() => {
                        HandleItemsWithParent(dataCtx)
                            .then(resolve)
                            .catch(reason => {
                                reject(reason);
                            });
                    })
                    .catch(reason => {
                        reject(reason);
                    });
            }, (sender, args) => {
                reject({ sender, args });
            });
        });
});

/**
 * Handle list items with parent
 *
 * @param {CopyContext} dataCtx Data context
 */
const HandleItemsWithParent = (dataCtx: CopyContext) => new Promise<void>((resolve, reject) => {
    const itemsWithParent = __RECORDS.filter(item => item.ParentID);
    itemsWithParent.forEach(item => {
        let [parent] = __RECORDS.filter(({ SourceId }) => SourceId === item.ParentID);
        if (parent) {
            item.DestItem.set_item("ParentID", parent.DestId);
            item.DestItem.update();
        }
    });
    dataCtx.Destination._.executeQueryAsync(resolve, reject);
});
