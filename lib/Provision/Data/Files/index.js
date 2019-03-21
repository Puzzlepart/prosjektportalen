"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../Resources");
const sp_1 = require("@pnp/sp");
const logging_1 = require("@pnp/logging");
const Util = require("../../../Util");
const ProvisionError_1 = require("../../ProvisionError");
const LOG_TEMPLATE = "(Files) {0}: {1}";
/**
 * Get file contents
 *
 * @param {Web} srcWeb Source web
 * @param {IFile[]} files Files to get content for
 */
function GetFileContents(srcWeb, files) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileContents = yield Promise.all(files.map(file => new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function* () {
                    let blob = yield srcWeb.getFileByServerRelativeUrl(file.FileRef).getBlob();
                    file.Blob = blob;
                    resolve(file);
                });
            })));
            return fileContents;
        }
        catch (err) {
            throw new ProvisionError_1.default(err, "GetFileContents");
        }
    });
}
/**
 * Create folder hierarchy
 *
 * @param {string} destLibServerRelUrl Destination library server relative URL
 * @param {string} rootFolderServerRelUrl Root folder server relative URL
 * @param {Folder} destLibRootFolder Destination library root foler
 * @param {string[]} folders An array of folders to provision
 */
function ProvisionFolderHierarchy(destLibServerRelUrl, rootFolderServerRelUrl, destLibRootFolder, folders) {
    return __awaiter(this, void 0, void 0, function* () {
        logging_1.Logger.log({
            message: String.format(LOG_TEMPLATE, "ProvisionFolderHierarchy", "Creating folder hierarchy"),
            data: { folders },
            level: 1 /* Info */,
        });
        try {
            yield folders
                .sort()
                .reduce((chain, folder) => {
                const folderServerRelUrl = `${destLibServerRelUrl}/${folder.replace(rootFolderServerRelUrl, "")}`;
                return chain.then(_ => destLibRootFolder.folders.add(folderServerRelUrl));
            }, Promise.resolve());
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "ProvisionFolderHierarchy", "Folder hierarchy created"),
                data: { folders },
                level: 1 /* Info */,
            });
            return;
        }
        catch (err) {
            throw new ProvisionError_1.default(err, "ProvisionFolderHierarchy");
        }
    });
}
/**
 * Replace tokens in filename, e.g. {projectname}
 *
 * @param {string} filename File name
 * @param {IProvisionContext} context Provisioning context
 */
function ReplaceTokensInFilename(filename, context) {
    const tokensMap = { "{projectname}": context.model.Title };
    const newFilename = Object.keys(tokensMap).reduce((name, token) => name.replace(new RegExp(token, "g"), tokensMap[token]), filename);
    logging_1.Logger.log({
        message: String.format(LOG_TEMPLATE, "ReplaceTokensInFilename", "Replaced tokens in filename"),
        data: { filename, newFilename },
        level: 1 /* Info */,
    });
    return newFilename;
}
/**
 * Copy files and folders to a destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 * @param {number} top Number of files to fetch
 */
function CopyFiles(context, conf, top = 500) {
    return __awaiter(this, void 0, void 0, function* () {
        logging_1.Logger.log({
            message: String.format(LOG_TEMPLATE, "CopyFiles", "Copy of files started"),
            data: { conf },
            level: 1 /* Info */,
        });
        // Constants
        const srcWebAbsoluteUrl = Util.makeUrlAbsolute(conf.SourceUrl);
        const destWebAbsoluteUrl = Util.makeUrlAbsolute(context.url);
        const srcWeb = new sp_1.Web(srcWebAbsoluteUrl);
        const srcList = srcWeb.lists.getByTitle(conf.SourceList);
        const destWeb = new sp_1.Web(destWebAbsoluteUrl);
        const destLibServerRelUrl = Util.makeUrlRelativeToSite(`${context.url}/${conf.DestinationLibrary}`);
        const destLibRootFolder = destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl);
        try {
            const [spList, spItems] = yield Promise.all([
                srcList.expand("RootFolder").get(),
                srcList
                    .items
                    .expand("Folder")
                    .select("Title", "LinkFilename", "FileRef", "FileDirRef", "Folder/ServerRelativeUrl")
                    .top(top)
                    .get(),
            ]);
            let folders = [];
            let files = [];
            spItems.forEach(item => {
                if (item.Folder && item.Folder.hasOwnProperty("ServerRelativeUrl")) {
                    folders.push(item.Folder.ServerRelativeUrl);
                }
                else {
                    files.push(item);
                }
            });
            // Progress update
            const step = Resources_1.default.getResource("ProvisionWeb_CopyListContent");
            const progress = String.format(Resources_1.default.getResource("ProvisionWeb_CopyFiles"), files.length, folders.length, conf.SourceList, conf.DestinationLibrary);
            context.progressCallbackFunc(step, progress);
            yield ProvisionFolderHierarchy(destLibServerRelUrl, spList.RootFolder.ServerRelativeUrl, destLibRootFolder, folders);
            const filesWithContents = yield GetFileContents(srcWeb, files);
            let filesCopied = [];
            for (let i = 0; i < filesWithContents.length; i++) {
                let file = filesWithContents[i];
                let destFolderUrl = `${destLibServerRelUrl}${file.FileDirRef.replace(spList.RootFolder.ServerRelativeUrl, "")}`;
                try {
                    logging_1.Logger.log({
                        message: String.format(LOG_TEMPLATE, "CopyFiles", `Copying file ${file.LinkFilename}`),
                        level: 1 /* Info */,
                    });
                    const filename = ReplaceTokensInFilename(file.LinkFilename, context);
                    const fileAddResult = yield destWeb.getFolderByServerRelativeUrl(destFolderUrl).files.add(filename, file.Blob, true);
                    filesCopied.push(fileAddResult);
                    logging_1.Logger.log({
                        message: String.format(LOG_TEMPLATE, "CopyFiles", `Successfully copied file ${file.LinkFilename}`),
                        level: 1 /* Info */,
                    });
                }
                catch (err) {
                    logging_1.Logger.log({
                        message: String.format(LOG_TEMPLATE, "CopyFiles", `Copy of file ${file.LinkFilename} failed`),
                        data: { file, err },
                        level: 2 /* Warning */,
                    });
                }
            }
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "CopyFiles", `Successfully copied ${filesCopied.length} of ${filesWithContents.length} files`),
                level: 1 /* Info */,
            });
            return filesCopied;
        }
        catch (err) {
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "CopyFiles", "Copy of files failed"),
                data: { conf, err },
                level: 3 /* Error */,
            });
            throw new ProvisionError_1.default(err, "CopyFiles");
        }
    });
}
exports.CopyFiles = CopyFiles;
