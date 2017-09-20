import RESOURCE_MANAGER from "localization";
import {
    Web,
    Folder,
    FileAddResult,
    Logger,
    LogLevel,
} from "sp-pnp-js";
import * as Util from "../../../Util";
import IFile from "./IFile";
import ListConfig from "../Config/ListConfig";
import IProgressCallback from "../../IProgressCallback";

/**
 * Get file contents
 *
 * @param {Web} srcWeb Source web
 * @param {IFile[]} files Files to get content for
 */
const GetFileContents = (srcWeb: Web, files: IFile[]) => new Promise<IFile[]>((resolve, reject) => {
    Promise.all(files.map(file => new Promise<IFile>((res, rej) => {
        srcWeb.getFileByServerRelativeUrl(file.FileRef).getBlob()
            .then(blob => {
                file.Blob = blob;
                res(file);
            })
            .catch(rej);
    })))
        .then(res => resolve(res))
        .catch(reject);
});

/**
 * Create folder hierarchy
 *
 * @param {string} destLibServerRelUrl Destination library server relative URL
 * @param {string} rootFolderServerRelUrl Root folder server relative URL
 * @param {Folder} destLibRootFolder Destination library root foler
 * @param {string[]} folders Folders
 */
const CreateFolderHierarchy = (destLibServerRelUrl: string, rootFolderServerRelUrl: string, destLibRootFolder: Folder, folders: string[]) => new Promise<void>((resolve, reject) => {
    Logger.log({ message: "Creating folder hierarchy", data: { folders }, level: LogLevel.Info });
    folders
        .sort()
        .reduce((chain: Promise<any>, folder) => {
            const folderServerRelUrl = `${destLibServerRelUrl}/${folder.replace(rootFolderServerRelUrl, "")}`;
            return chain.then(_ => destLibRootFolder.folders.add(folderServerRelUrl));
        }, Promise.resolve())
        .then(resolve)
        .catch(reject);
});

/**
 * Copy files and folders to a destination web
 *
 * @param {ListConfig} conf Configuration
 * @param {string} destUrl Destination web URL
 * @param {IProgressCallback} onUpdateProgress Progress callback to caller
 */
export const CopyFiles = (conf: ListConfig, destUrl: string, onUpdateProgress: IProgressCallback) => new Promise<FileAddResult[]>((resolve, reject) => {
    Logger.log({ message: "Copy of files started.", data: { conf }, level: LogLevel.Info });
    const srcWeb = new Web(Util.makeAbsolute(conf.SourceUrl));
    const srcList = srcWeb.lists.getByTitle(conf.SourceList);
    const destWeb = new Web(Util.makeAbsolute(destUrl));
    const destLibServerRelUrl = Util.makeRelative(`${destUrl}/${conf.DestinationLibrary}`);
    const destLibRootFolder = destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl);
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
        let folders: string[] = [];
        let files: IFile[] = [];
        items.forEach(i => {
            if (i.Folder && i.Folder.hasOwnProperty("ServerRelativeUrl")) {
                folders.push(i.Folder.ServerRelativeUrl);
            } else {
                files.push(i);
            }
        });
        onUpdateProgress(RESOURCE_MANAGER.getResource("ProvisionWeb_CopyListContent"), String.format(RESOURCE_MANAGER.getResource("ProvisionWeb_CopyFiles"), files.length, folders.length, conf.SourceList, conf.DestinationLibrary));
        CreateFolderHierarchy(destLibServerRelUrl, RootFolder.ServerRelativeUrl, destLibRootFolder, folders)
            .then(_ => {
                /**
                 * Copying files
                 */
                Logger.log({ message: "Copying files", data: { files }, level: LogLevel.Info });
                GetFileContents(srcWeb, files)
                    .then(filesWithContents => {
                        Promise.all(filesWithContents.map(fwc => new Promise<any>((res, rej) => {
                            let destFolderUrl = `${destLibServerRelUrl}${fwc.FileDirRef.replace(RootFolder.ServerRelativeUrl, "")}`;
                            destWeb.getFolderByServerRelativeUrl(destFolderUrl).files.add(fwc.LinkFilename, fwc.Blob, true).then(res, rej);
                        })))
                            .then(() => {
                                Logger.log({ message: "Copy of files done.", data: { conf }, level: LogLevel.Info });
                                resolve();
                            })
                            .catch(reason => {
                                Logger.log({ message: "Copy of files failed.", data: { conf, reason }, level: LogLevel.Info });
                                reject();
                            });
                    })
                    .catch(reason => {
                        Logger.log({ message: "Copy of files failed.", data: { conf, reason }, level: LogLevel.Info });
                        reject();
                    });
            })
            .catch(reason => {
                Logger.log({ message: "Copy of files failed.", data: { conf, reason }, level: LogLevel.Info });
                reject();
            });
    }).catch(reason => {
        Logger.log({ message: "Copy of files failed.", data: { conf, reason }, level: LogLevel.Info });
        reject();
    });
});
