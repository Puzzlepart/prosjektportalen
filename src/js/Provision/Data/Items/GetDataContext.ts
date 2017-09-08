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
}

/**
 * Get context for source and destination
 *
 * @param {ListConfig} conf Configuration
 * @param {destUrl} destUrl Destination web URL
 */
const GetDataContext = (conf: ListConfig, destUrl: string) => new Promise<CopyContext>((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        let camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml("<View></View>");
        let ctx: CopyContext = {
            CamlQuery: camlQuery,
            Source: { _: new SP.ClientContext(conf.SourceUrl) },
            Destination: { _: new SP.ClientContext(destUrl) },
        };
        ctx.Source.list = ctx.Source._.get_web().get_lists().getByTitle(conf.SourceList);
        ctx.Destination.list = ctx.Destination._.get_web().get_lists().getByTitle(conf.DestinationList);
        resolve(ctx);
    });
});

export default GetDataContext;
