import { Logger, LogLevel, Web, FileAddResult, default as pnp } from "sp-pnp-js";
import * as Util from "../../../Util";
import { IListConfig } from "../Config";

const REJECT_TIMEOUT = 20000;

/**
 * Copy files
 *
 * @param conf Configuration
 * @param destUrl Destination web URL
 */
export const CopyFiles = (conf: IListConfig, destUrl: string): Promise<FileAddResult[]> => new Promise<FileAddResult[]>((resolve, reject) => {
    Logger.write(`Copying files from '${conf.SourceList}' to '${conf.DestinationLibrary}'.`, LogLevel.Info);
    let srcWeb = new Web(conf.SourceUrl),
        srcList = srcWeb.lists.getByTitle(conf.SourceList),
        destWeb = new Web(destUrl),
        destLibServerRelUrl = Util.makeRelative(`${destUrl}/${conf.DestinationLibrary}`);
    Promise.all([
        srcList.expand("RootFolder").get(),
        srcList.items.expand("Folder").select("Title", "LinkFilename", "FileRef", "FileDirRef", "Folder/ServerRelativeUrl").get(),
    ]).then(([{ RootFolder }, items]) => {
        let folders = [], files = [];
        items.forEach(i => {
            if (i.Folder) {
                folders.push(i.Folder.ServerRelativeUrl);
            } else {
                files.push(i);
            }
        });
        let createFolders = pnp.sp.createBatch();
        folders.forEach(f => {
            let folderUrl = f.replace(RootFolder.ServerRelativeUrl, "");
            destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl).folders.inBatch(createFolders).add(`${destLibServerRelUrl}/${folderUrl}`);
        });
        createFolders.execute().then(_ => {
            let gfcBatch = pnp.sp.createBatch();
            let promises = files.map(({ FileRef, LinkFilename }) => new Promise<{ LinkFilename: string, Blob: Blob }>((_resolve, _reject) => {
                srcWeb.getFileByServerRelativeUrl(FileRef).inBatch(gfcBatch).getBlob().then(blob => _resolve({ LinkFilename: LinkFilename, Blob: blob }), _reject);
            }));
            gfcBatch.execute();
            Promise.all(promises).then(fileContents => {
                Promise.all(fileContents.map(fc => new Promise<any>((_resolve) => {
                    destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl).files.add(fc.LinkFilename, fc.Blob, true).then(_resolve, _resolve);
                }))).then(resolve, resolve);
            }, resolve);
        }, resolve);
    });
    window.setTimeout(reject, REJECT_TIMEOUT);
});
