import * as Util from "../../../Util";
import ListConfig from "../Config/ListConfig";

export interface CopyContext {
    CamlQuery: SP.CamlQuery;
    Source: {
        _: SP.ClientContext,
        list?: SP.List,
    };
    Destination: {
        _: SP.ClientContext,
        list?: SP.List,
    };
    loadAndExecuteQuery: (clCtx: SP.ClientContext, clObj?: SP.ClientObject[]) => Promise<void>;
}

/**
 * Get context for source and destination
 *
 * @param {ListConfig} conf Configuration
 * @param {string} destUrl Destination web URL
 * @param {string} viewXml View XML
 */
async function GetDataContext(conf: ListConfig, destUrl: string, viewXml = "<View></View>"): Promise<CopyContext> {
    await Util.getClientContext(_spPageContextInfo.siteAbsoluteUrl);
    let camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(viewXml);
    let ctx: CopyContext = {
        CamlQuery: camlQuery,
        Source: { _: new SP.ClientContext(conf.SourceUrl) },
        Destination: { _: new SP.ClientContext(destUrl) },
        loadAndExecuteQuery: (clCtx, clObj = []) => new Promise<void>((res, rej) => {
            clObj.forEach(obj => clCtx.load(obj));
            clCtx.executeQueryAsync(res, (sender, args) => {
                rej({ sender, args });
            });
        }),
    };
    ctx.Source.list = ctx.Source._.get_web().get_lists().getByTitle(conf.SourceList);
    ctx.Destination.list = ctx.Destination._.get_web().get_lists().getByTitle(conf.DestinationList);
    return ctx;
}

export default GetDataContext;
