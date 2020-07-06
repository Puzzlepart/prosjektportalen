import __ from '../../../Resources'
import { Web, Folder, FileAddResult } from '@pnp/sp'
import { Logger, LogLevel } from '@pnp/logging'
import * as Util from '../../../Util'
import IFile from './IFile'
import ListConfig from '../Config/ListConfig'
import IProvisionContext from '../../IProvisionContext'
import ProvisionError from '../../ProvisionError'

const LOG_TEMPLATE = '(Files) {0}: {1}'

/**
 * Get file contents
 *
 * @param {Web} srcWeb Source web
 * @param {IFile[]} files Files to get content for
 */
async function GetFileContents(srcWeb: Web, files: IFile[]): Promise<IFile[]> {
    try {
        const fileContents = await Promise.all(files.map(file => new Promise<IFile>(async function (resolve) {
            const blob = await srcWeb.getFileByServerRelativeUrl(file.FileRef).getBlob()
            file.Blob = blob
            resolve(file)
        })))
        return fileContents
    } catch (err) {
        throw new ProvisionError(err, 'GetFileContents')
    }
}

/**
 * Create folder hierarchy
 *
 * @param {string} destLibServerRelUrl Destination library server relative URL
 * @param {string} rootFolderServerRelUrl Root folder server relative URL
 * @param {Folder} destLibRootFolder Destination library root foler
 * @param {string[]} folders An array of folders to provision
 */
async function ProvisionFolderHierarchy(destLibServerRelUrl: string, rootFolderServerRelUrl: string, destLibRootFolder: Folder, folders: string[]): Promise<void> {
    Logger.log({
        message: String.format(LOG_TEMPLATE, 'ProvisionFolderHierarchy', 'Creating folder hierarchy'),
        data: { folders },
        level: LogLevel.Info,
    })
    try {
        await folders
            .sort()
            .reduce((chain: Promise<any>, folder) => {
                const folderServerRelUrl = `${destLibServerRelUrl}/${folder.replace(rootFolderServerRelUrl, '')}`
                return chain.then(_ => destLibRootFolder.folders.add(folderServerRelUrl))
            }, Promise.resolve())
        Logger.log({
            message: String.format(LOG_TEMPLATE, 'ProvisionFolderHierarchy', 'Folder hierarchy created'),
            data: { folders },
            level: LogLevel.Info,
        })
        return
    } catch (err) {
        throw new ProvisionError(err, 'ProvisionFolderHierarchy')
    }
}

/**
 * Replace tokens in filename, e.g. {projectname}
 *
 * @param {string} filename File name
 * @param {IProvisionContext} context Provisioning context
 */
function ReplaceTokensInFilename(filename: string, context: IProvisionContext): string {
    const tokensMap = { '{projectname}': context.model.title }
    const newFilename = Object.keys(tokensMap).reduce((name, token) => name.replace(new RegExp(token, 'g'), tokensMap[token]), filename)
    Logger.log({
        message: String.format(LOG_TEMPLATE, 'ReplaceTokensInFilename', 'Replaced tokens in filename'),
        data: { filename, newFilename },
        level: LogLevel.Info,
    })
    return newFilename
}

/**
 * Copy files and folders to a destination web
 *
 * @param {IProvisionContext} context Provisioning context
 * @param {ListConfig} conf List configuration
 * @param {number} top Number of files to fetch
 */
export async function CopyFiles(context: IProvisionContext, conf: ListConfig, top = 500): Promise<FileAddResult[]> {
    Logger.log({
        message: String.format(LOG_TEMPLATE, 'CopyFiles', 'Copy of files started'),
        data: { conf },
        level: LogLevel.Info,
    })

    // Constants
    const srcWebAbsoluteUrl = Util.makeUrlAbsolute(conf.SourceUrl)
    const destWebAbsoluteUrl = Util.makeUrlAbsolute(context.url)
    const srcWeb = new Web(srcWebAbsoluteUrl)
    const srcList = srcWeb.lists.getByTitle(conf.SourceList)
    const destWeb = new Web(destWebAbsoluteUrl)
    const destLibServerRelUrl = Util.makeUrlRelativeToSite(`${context.url}/${conf.DestinationLibrary}`)
    const destLibRootFolder = destWeb.getFolderByServerRelativeUrl(destLibServerRelUrl)

    try {
        const [spList, spItems] = await Promise.all([
            srcList.expand('RootFolder').get(),
            srcList
                .items
                .expand('Folder')
                .select('Title', 'LinkFilename', 'FileRef', 'FileDirRef', 'Folder/ServerRelativeUrl')
                .top(top)
                .get(),
        ])

        const folders: string[] = []
        const files: IFile[] = []

        spItems.forEach(item => {
            if (item.Folder && item.Folder.hasOwnProperty('ServerRelativeUrl')) {
                folders.push(item.Folder.ServerRelativeUrl)
            } else {
                files.push(item)
            }
        })

        // Progress update
        const step = __.getResource('ProvisionWeb_CopyListContent')
        const progress = String.format(__.getResource('ProvisionWeb_CopyFiles'), files.length, folders.length, conf.SourceList, conf.DestinationLibrary)
        context.progressCallbackFunc(step, progress)
        await ProvisionFolderHierarchy(destLibServerRelUrl, spList.RootFolder.ServerRelativeUrl, destLibRootFolder, folders)

        const filesWithContents = await GetFileContents(srcWeb, files)
        const filesCopied = []

        for (let i = 0; i < filesWithContents.length; i++) {
            const file = filesWithContents[i]
            const destFolderUrl = `${destLibServerRelUrl}${file.FileDirRef.replace(spList.RootFolder.ServerRelativeUrl, '')}`
            try {
                Logger.log({
                    message: String.format(LOG_TEMPLATE, 'CopyFiles', `Copying file ${file.LinkFilename}`),
                    level: LogLevel.Info,
                })
                const filename = ReplaceTokensInFilename(file.LinkFilename, context)
                const fileAddResult = await destWeb.getFolderByServerRelativeUrl(destFolderUrl).files.add(filename, file.Blob, true)
                filesCopied.push(fileAddResult)
                Logger.log({
                    message: String.format(LOG_TEMPLATE, 'CopyFiles', `Successfully copied file ${file.LinkFilename}`),
                    level: LogLevel.Info,
                })
            } catch (err) {
                Logger.log({
                    message: String.format(LOG_TEMPLATE, 'CopyFiles', `Copy of file ${file.LinkFilename} failed`),
                    data: { file, err },
                    level: LogLevel.Warning,
                })
            }
        }

        Logger.log({
            message: String.format(LOG_TEMPLATE, 'CopyFiles', `Successfully copied ${filesCopied.length} of ${filesWithContents.length} files`),
            level: LogLevel.Info,
        })

        return filesCopied
    } catch (err) {
        Logger.log({
            message: String.format(LOG_TEMPLATE, 'CopyFiles', 'Copy of files failed'),
            data: { conf, err },
            level: LogLevel.Error,
        })
        throw new ProvisionError(err, 'CopyFiles')
    }
}

