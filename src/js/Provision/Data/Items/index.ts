import { Logger, LogLevel } from "sp-pnp-js";
import { IListConfig } from "../Config";
import * as Util from "Util";

interface CopyContext {
    CamlQuery: SP.CamlQuery;
    Source: {
        _: SP.ClientContext,
        list?: SP.List,
    };
    Destination: {
        _: SP.ClientContext,
        list?: SP.List,
    };
}

/**
 * Get context for source and destination
 */
const GetDataContext = (conf: IListConfig, destUrl: string): CopyContext => {
    let camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View></View>");
    let ctx: CopyContext = {
        CamlQuery: camlQuery,
        Source: { _: new SP.ClientContext(conf.SourceUrl) },
        Destination: { _: new SP.ClientContext(destUrl) },
    };
    ctx.Source.list = ctx.Source._.get_web().get_lists().getByTitle(conf.SourceList);
    ctx.Destination.list = ctx.Destination._.get_web().get_lists().getByTitle(conf.DestinationList);
    return ctx;
};

export const CopyItems = (conf: IListConfig, destUrl: string): Promise<any> => new Promise<any>((resolve, reject) => {
    let dataCtx = GetDataContext(conf, destUrl);
    let items = dataCtx.Source.list.getItems(dataCtx.CamlQuery);
    dataCtx.Source._.load(items);
    dataCtx.Source._.executeQueryAsync(() => {
        Logger.log({ message: `Copying ${items.get_count()} items from '${conf.SourceList}' to '${conf.DestinationList}'.`, data: conf, level: LogLevel.Info });
        items.get_data().forEach((srcItm: SP.ListItem) => {
            let destItm = dataCtx.Destination.list.addItem(new SP.ListItemCreationInformation());
            conf.Fields.forEach(fieldName => {
                Util.setItemFieldValue(fieldName, destItm, srcItm.get_item(fieldName), dataCtx.Destination._, dataCtx.Destination.list);
            });
            destItm.update();
        });
        dataCtx.Destination._.executeQueryAsync(() => {
            Logger.log({ message: `Successfully copied ${items.get_count()} items from '${conf.SourceList}' to '${conf.DestinationList}'.`, data: conf, level: LogLevel.Info });
            resolve();
        }, (sender, args) => {
            Logger.log({ message: `Failed to copy ${items.get_count()} items from '${conf.SourceList}' to '${conf.DestinationList}'.`, data: args, level: LogLevel.Warning });
            resolve();
        });
    }, resolve);
});

