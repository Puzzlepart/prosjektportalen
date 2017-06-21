import { sp, Logger, LogLevel } from "sp-pnp-js";
import * as Util from "../Util";
import * as Config from "./Config";
import GetCurrentProjectPhase from "./GetCurrentProjectPhase";

/**
 * Set metadata defaults
 *
 * @param phaseName Phase term name
 */
const SetMetadataDefaults = (phaseName: string): Promise<any> => new Promise<any>((resolve, reject) => {
    GetCurrentProjectPhase().then(({ Id, WssId }) => {
        sp.web.lists.getByTitle(Config.DOCUMENT_LIBRARY).expand("RootFolder").get().then(({ RootFolder: { ServerRelativeUrl: rootFolderServerRelativeUrl } }) => {
            const contents = [`<MetadataDefaults><a href="${Util.encodeSpaces(rootFolderServerRelativeUrl)}"><DefaultValue FieldName="${Config.PROJECTPHASE_FIELD}">${WssId};#${phaseName}|${Id}</DefaultValue></a></MetadataDefaults>`];
            const blob = new Blob(contents, {
                type: "text/plain",
            });
            sp.web.getFolderByServerRelativeUrl(`${rootFolderServerRelativeUrl}/Forms`).files.add("client_LocationBasedDefaults.html", blob, true).then(() => {
                Logger.log({ message: `ChangeProjectPhase: Updated client_LocationBasedDefaults.html for ${Config.DOCUMENT_LIBRARY}`, data: contents, level: LogLevel.Info });
                resolve();
            }, reject);
        });
    }, reject);
});

export default SetMetadataDefaults;

