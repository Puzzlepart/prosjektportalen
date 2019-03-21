"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../Resources");
const logging_1 = require("@pnp/logging");
const ProvisionError_1 = require("../../ProvisionError");
const Util_1 = require("../../../Util");
const GetDataContext_1 = require("./GetDataContext");
let ITEM_RECORDS;
/**
 * Copy a single list item to the destination web
 *
 * @param {SP.ListItem} srcItem The source item
 * @param {string[]} fields Fields to copy
 * @param {CopyContext} dataCtx Copy context
 */
function CopyItem(srcItem, fields, dataCtx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sourceItemId = srcItem.get_fieldValues()["ID"];
            logging_1.Logger.log({ message: `(CopyItem) Copy of list item #${sourceItemId} starting.`, data: { fields }, level: 1 /* Info */ });
            const destItem = dataCtx.Destination.list.addItem(new SP.ListItemCreationInformation());
            fields.forEach(fieldName => {
                const fieldValue = srcItem.get_item(fieldName);
                const fieldType = dataCtx.listFieldsMap[fieldName];
                logging_1.Logger.log({ message: `(CopyItem) Setting value for field ${fieldName} (${fieldType})`, level: 1 /* Info */ });
                const result = Util_1.setItemFieldValue(fieldName, destItem, fieldValue, fieldType, dataCtx.Destination._, dataCtx.Destination.list);
                switch (result) {
                    case Util_1.SetItemFieldValueResult.FieldTypeNotSupported: {
                        logging_1.Logger.log({ message: `(CopyItem) Field type ${fieldType} is not supported`, data: {}, level: 2 /* Warning */ });
                    }
                }
            });
            yield dataCtx.loadAndExecuteQuery(dataCtx.Destination._, [destItem]);
            const record = {
                Title: srcItem.get_fieldValues()["Title"],
                SourceItemId: sourceItemId,
                DestinationItemId: destItem.get_fieldValues()["ID"],
                DestinationItem: destItem,
            };
            if (srcItem.get_fieldValues()["ParentID"]) {
                record.ParentID = parseInt(srcItem.get_fieldValues()["ParentID"].get_lookupValue(), 10);
            }
            ITEM_RECORDS.push(record);
            logging_1.Logger.log({ message: `(CopyItem) Copy of list item #${sourceItemId} done.`, data: {}, level: 1 /* Info */ });
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.CopyItem = CopyItem;
/**
 * Copies list items to the destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 */
function CopyItems(context, conf) {
    return __awaiter(this, void 0, void 0, function* () {
        logging_1.Logger.log({ message: "(CopyItem) Copy of list items started.", data: { conf }, level: 1 /* Info */ });
        let dataCtx;
        let listItems;
        ITEM_RECORDS = [];
        try {
            dataCtx = yield GetDataContext_1.default(conf, context.url);
            const listItemCollection = dataCtx.Source.list.getItems(dataCtx.CamlQuery);
            const listFieldCollection = dataCtx.Source.list.get_fields();
            yield dataCtx.loadAndExecuteQuery(dataCtx.Source._, [listItemCollection, listFieldCollection]);
            listItems = listItemCollection.get_data();
            dataCtx.listFieldsMap = listFieldCollection.get_data().reduce((obj, field) => {
                const fieldName = field.get_internalName();
                obj[fieldName] = field.get_typeAsString();
                return obj;
            }, {});
        }
        catch (err) {
            throw err;
        }
        try {
            context.progressCallbackFunc(Resources_1.default.getResource("ProvisionWeb_CopyListContent"), String.format(Resources_1.default.getResource("ProvisionWeb_CopyItems"), listItems.length, conf.SourceList, conf.DestinationList));
            yield listItems.reduce((chain, srcItem) => chain.then(_ => CopyItem(srcItem, conf.Fields, dataCtx)), Promise.resolve());
            yield HandleItemsWithParent(dataCtx);
            logging_1.Logger.log({ message: "(CopyItems) Copy of list items done.", data: { conf }, level: 1 /* Info */ });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.CopyItems = CopyItems;
/**
 * Handle list items with parent
 *
 * @param {CopyContext} dataCtx Data context
 */
function HandleItemsWithParent(dataCtx) {
    return __awaiter(this, void 0, void 0, function* () {
        ITEM_RECORDS
            .filter(item => item.hasOwnProperty("ParentID"))
            .forEach(item => {
            let [parent] = ITEM_RECORDS.filter(record => record.SourceItemId === item.ParentID);
            if (parent) {
                item.DestinationItem.set_item("ParentID", parent.DestinationItemId);
                item.DestinationItem.update();
            }
        });
        try {
            yield dataCtx.loadAndExecuteQuery(dataCtx.Destination._);
        }
        catch (err) {
            throw new ProvisionError_1.default(err, "HandleItemsWithParent");
        }
    });
}
