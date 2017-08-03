import {
    Web,
    FileAddResult,
} from "sp-pnp-js";
import * as Util from "../../../Util";
import { IListConfig } from "../Config";
import IProgressCallback from "../../IProgressCallback";

/**
 * Copy files and folders to a destination web
 *
 * @param conf Configuration
 * @param destUrl Destination web URL
 * @param onProgress Progress callback to caller
 * @param timeout Timeout (ms)
 */
export const CopyFiles = (conf: IListConfig, destUrl: string, onProgress: IProgressCallback, timeout = 25000) => new Promise<FileAddResult[]>((resolve, reject) => {
    onProgress(__("ProvisionWeb_CopyListContent"), String.format(__("ProvisionWeb_CopyFiles"), conf.SourceList, conf.DestinationLibrary));
    const srcWeb = new Web(Util.makeAbsolute(conf.SourceUrl));
    const srcList = srcWeb.lists.getByTitle(conf.SourceList);
    const destWeb = new Web(Util.makeAbsolute(destUrl));
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
        folders
            .sort()
            .reduce((chain, folder) => chain.then(_ => destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl).folders.add(`${destLibServerRelUrl}/${folder.replace(RootFolder.ServerRelativeUrl, "")}`)), Promise.resolve())
            .then(_ => {
                let getFileContents = Promise.all(files.map(file => new Promise<{ File: any, Blob: Blob }>((_resolve, _reject) => {
                    srcWeb.getFileByServerRelativeUrl(file.FileRef).getBlob().then(blob => _resolve({ File: file, Blob: blob }), _reject);
                })));
                getFileContents.then(fileContents => {
                    let createFiles = Promise.all(fileContents.map(fc => new Promise<any>((_resolve) => {
                        let destFolderUrl = `${destLibServerRelUrl}${fc.File.FileDirRef.replace(RootFolder.ServerRelativeUrl, "")}`;
                        destWeb.getFolderByServerRelativeUrl(destFolderUrl).files.add(fc.File.LinkFilename, fc.Blob, true).then(_resolve, reject);
                    })));
                    createFiles.then(resolve, reject);
                }, reject);
            }, reject);
    }).catch(reject);
    window.setTimeout(reject, timeout);
});
