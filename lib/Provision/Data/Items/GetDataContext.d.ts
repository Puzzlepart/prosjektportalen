/// <reference types="sharepoint" />
import ListConfig from "../Config/ListConfig";
export interface CopyContext {
    CamlQuery: SP.CamlQuery;
    Source: {
        _: SP.ClientContext;
        list?: SP.List;
    };
    Destination: {
        _: SP.ClientContext;
        list?: SP.List;
    };
    loadAndExecuteQuery: (clCtx: SP.ClientContext, clObj?: SP.ClientObject[]) => Promise<void>;
    listFieldsMap?: {
        [fieldName: string]: string;
    };
}
/**
 * Get context for source and destination
 *
 * @param {ListConfig} conf Configuration
 * @param {string} destUrl Destination web URL
 * @param {string} viewXml View XML
 */
declare function GetDataContext(conf: ListConfig, destUrl: string, viewXml?: string): Promise<CopyContext>;
export default GetDataContext;
