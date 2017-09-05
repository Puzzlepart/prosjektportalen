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
 * @param conf Configuration
 * @param destUrl Destination web URL
 */
const GetDataContext = (conf: ListConfig, destUrl: string): CopyContext => {
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

export default GetDataContext;
