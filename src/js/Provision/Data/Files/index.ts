import {
    Logger,
    LogLevel,
    Web,
    FileAddResult,
} from "sp-pnp-js";
import * as Util from "../../../Util";
import { IListConfig } from "../Config";

/**
 * Copy files and folders to a destination web
 *
 * @param conf Configuration
 * @param destUrl Destination web URL
 * @param timeout Timeout (ms)
 */
export const CopyFiles = (conf: IListConfig, destUrl: string, timeout = 25000) => new Promise<FileAddResult[]>((resolve, reject) => {
    Logger.write(`Copying files from '${conf.SourceList}' to '${conf.DestinationLibrary}'.`, LogLevel.Info);
    const srcWeb = new Web(conf.SourceUrl);
    const srcList = srcWeb.lists.getByTitle(conf.SourceList);
    const destWeb = new Web(destUrl);
    const destLibServerRelUrl = Util.makeRelative(`${destUrl}/${conf.DestinationLibrary}`);
    Promise.all([
        srcList
            .expand("RootFolder")
            .get(),
        srcList
            .items
            .expand("Folder")
            .select("Title", "LinkFilename", "FileRef", "FileDirRef", "Folder/ServerRelativeUrl")
            .get(),
    ]).then(([{ RootFolder }, items]) => {
        let folders = [], files = [];
        items.forEach(i => {
            if (i.Folder && i.Folder.hasOwnProperty("ServerRelativeUrl")) {
                folders.push(i.Folder.ServerRelativeUrl);
            } else {
                files.push(i);
            }
        });
        let createFolders = Promise.all(folders.map(folder => {
            let folderServerRelUrl = folder.replace(RootFolder.ServerRelativeUrl, "");
            return destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl).folders.add(`${destLibServerRelUrl}/${folderServerRelUrl}`);
        }));
        createFolders.then(_ => {
            let getFileContents = Promise.all(files.map(({ FileRef, LinkFilename }) => new Promise<{ LinkFilename: string, Blob: Blob }>((_resolve, _reject) => {
                srcWeb.getFileByServerRelativeUrl(FileRef).getBlob().then(blob => _resolve({ LinkFilename: LinkFilename, Blob: blob }), _reject);
            })));
            getFileContents.then(fileContents => {
                let createFiles = Promise.all(fileContents.map(fc => new Promise<any>((_resolve) => {
                    destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl).files.add(fc.LinkFilename, fc.Blob, true).then(_resolve, reject);
                })));
                createFiles.then(resolve, reject);
            }, reject);
        }, reject);
    }).catch(reject);
    window.setTimeout(reject, timeout);
});
