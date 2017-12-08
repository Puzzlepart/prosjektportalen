import RESOURCE_MANAGER from "../../../@localization";
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
import IProvisionContext from "../../IProvisionContext";
import ProvisionError from "../../ProvisionError";

/**
 * Get file contents
 *
 * @param {Web} srcWeb Source web
 * @param {IFile[]} files Files to get content for
 */
async function GetFileContents(srcWeb: Web, files: IFile[]): Promise<IFile[]> {
    try {
        const fileContents = await Promise.all(files.map(file => new Promise<IFile>(async function (resolve) {
            let blob = await srcWeb.getFileByServerRelativeUrl(file.FileRef).getBlob();
            file.Blob = blob;
            resolve(file);
        })));
        return fileContents;
    } catch (err) {
        throw new ProvisionError(err, "GetFileContents");
    }
}

/**
 * Create folder hierarchy
 *
 * @param {string} destLibServerRelUrl Destination library server relative URL
 * @param {string} rootFolderServerRelUrl Root folder server relative URL
 * @param {Folder} destLibRootFolder Destination library root foler
 * @param {string[]} folders Folders
 */
async function CreateFolderHierarchy(destLibServerRelUrl: string, rootFolderServerRelUrl: string, destLibRootFolder: Folder, folders: string[]): Promise<void> {
    Logger.log({ message: "Creating folder hierarchy", data: { folders }, level: LogLevel.Info });
    try {
        await folders
            .sort()
            .reduce((chain: Promise<any>, folder) => {
                const folderServerRelUrl = `${destLibServerRelUrl}/${folder.replace(rootFolderServerRelUrl, "")}`;
                return chain.then(_ => destLibRootFolder.folders.add(folderServerRelUrl));
            }, Promise.resolve());
        Logger.log({ message: "Folder hierarchy created", data: { folders }, level: LogLevel.Info });
        return;
    } catch (err) {
        throw new ProvisionError(err, "CreateFolderHierarchy");
    }
}

/**
 * Replace tokens in filename, e.g. {projectname}
 *
 * @param {string} filename File name
 * @param {IProvisionContext} context Provisioning context
 */
function ReplaceTokensInFilename(filename: string, context: IProvisionContext): string {
    const tokensMap = { "{projectname}": context.model.Title };
    const newFilename = Object.keys(tokensMap).reduce((name, token) => {
        return name.replace(new RegExp(token, "g"), tokensMap[token]);
    }, filename);
    return newFilename;
}

/**
 * Copy files and folders to a destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 */
export async function CopyFiles(context: IProvisionContext, conf: ListConfig): Promise<FileAddResult[]> {
    Logger.log({ message: "Copy of files started.", data: { conf }, level: LogLevel.Info });
    const srcWeb = new Web(Util.makeUrlAbsolute(conf.SourceUrl));
    const srcList = srcWeb.lists.getByTitle(conf.SourceList);
    const destWeb = new Web(Util.makeUrlAbsolute(context.url));
    const destLibServerRelUrl = Util.makeUrlRelativeToSite(`${context.url}/${conf.DestinationLibrary}`);
    const destLibRootFolder = destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl);
    try {
        const [{ RootFolder }, items] = await Promise.all([
            srcList
                .expand("RootFolder")
                .get(),
            srcList
                .items
                .expand("Folder")
                .select("Title", "LinkFilename", "FileRef", "FileDirRef", "Folder/ServerRelativeUrl")
                .top(500)
                .get(),
        ]);
        let folders: string[] = [];
        let files: IFile[] = [];

        items.forEach(i => {
            if (i.Folder && i.Folder.hasOwnProperty("ServerRelativeUrl")) {
                folders.push(i.Folder.ServerRelativeUrl);
            } else {
                files.push(i);
            }
        });

        context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_CopyListContent"), String.format(RESOURCE_MANAGER.getResource("ProvisionWeb_CopyFiles"), files.length, folders.length, conf.SourceList, conf.DestinationLibrary));
        await CreateFolderHierarchy(destLibServerRelUrl, RootFolder.ServerRelativeUrl, destLibRootFolder, folders);

        Logger.log({ message: "Copying files", data: { files }, level: LogLevel.Info });
        const filesWithContents = await GetFileContents(srcWeb, files);
        const fileAddPromises = filesWithContents.map(fwc => new Promise<any>((res, rej) => {
            let destFolderUrl = `${destLibServerRelUrl}${fwc.FileDirRef.replace(RootFolder.ServerRelativeUrl, "")}`;
            destWeb.getFolderByServerRelativeUrl(destFolderUrl).files.add(ReplaceTokensInFilename(fwc.LinkFilename, context), fwc.Blob, true).then(res, rej);
        }));
        const fileAddResult = await Promise.all(fileAddPromises);
        Logger.log({ message: "Copy of files done.", data: { conf }, level: LogLevel.Info });
        return fileAddResult;
    } catch (err) {
        Logger.log({ message: "Copy of files failed.", data: { conf, err }, level: LogLevel.Info });
        throw new ProvisionError(err, "CopyFiles");
    }
}

