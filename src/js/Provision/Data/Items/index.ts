import ListConfig from "../Config/ListConfig";
import IProgressCallback from "../../IProgressCallback";
import * as Util from "../../../Util";
import GetDataContext, { CopyContext } from "./GetDataContext";

let __ITEMS = [];

/**
 * Copy a single list item to the destination web
 *
 * @param {SP.ListItem} srcItem The source item
 * @param {string[]} fields Fields to copy
 * @param {CopyContext} dataCtx Copy context
 */
export const CopyItem = (srcItem: SP.ListItem, fields: string[], dataCtx: CopyContext) => new Promise<void>((resolve, reject) => {
    const destItm = dataCtx.Destination.list.addItem(new SP.ListItemCreationInformation());
    fields.forEach(fieldName => Util.setItemFieldValue(fieldName, destItm, srcItem.get_item(fieldName), dataCtx.Destination._, dataCtx.Destination.list));
    destItm.update();
    dataCtx.Destination._.load(destItm);
    dataCtx.Destination._.executeQueryAsync(() => {
        __ITEMS.push({
            SourceId: srcItem.get_fieldValues()["ID"],
            DestId: destItm.get_fieldValues()["ID"],
            DestItem: destItm,
            ParentID: srcItem.get_fieldValues()["ParentID"] ? parseInt(srcItem.get_fieldValues()["ParentID"].get_lookupValue(), 10) : null,
        });
        resolve();
    }, resolve);
});

/**
 * Copies list items to the destination web
 *
 * @param {ListConfig} conf Configuration
 * @param {string} destUrl Destination web URL
 * @param {IProgressCallback} onUpdateProgress Progress callback to caller
 */
export const CopyItems = (conf: ListConfig, destUrl: string, onUpdateProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const dataCtx = GetDataContext(conf, destUrl);
        const items = dataCtx.Source.list.getItems(dataCtx.CamlQuery);
        dataCtx.Source._.load(items);
        dataCtx.Source._.executeQueryAsync(() => {
            onUpdateProgress(__("ProvisionWeb_CopyListContent"), String.format(__("ProvisionWeb_CopyItems"), items.get_count(), conf.SourceList, conf.DestinationList));
            items.get_data().reduce((chain, srcItem) => chain.then(_ => CopyItem(srcItem, conf.Fields, dataCtx)), Promise.resolve())
                .then(() => {
                    HandleItemsWithParent(dataCtx).then(resolve);
                })
                .catch(resolve);
        }, resolve);
    });
});

/**
 * Handle tasks with parent
 *
 * @param {CopyContext} dataCtx Data context
 */
const HandleItemsWithParent = (dataCtx: CopyContext) => new Promise<void>((resolve) => {
    const itemsWithParent = __ITEMS.filter(item => item.ParentID);
    itemsWithParent.forEach(item => {
        let [parent] = __ITEMS.filter(({ SourceId }) => SourceId === item.ParentID);
        if (parent) {
            item.DestItem.set_item("ParentID", parent.DestId);
            item.DestItem.update();
        }
    });
    dataCtx.Destination._.executeQueryAsync(resolve, resolve);
});
