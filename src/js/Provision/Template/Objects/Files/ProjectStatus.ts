import __ from '../../../../Resources'
import { IFile } from 'sp-js-provisioning/lib/schema'

const ProjectStatus: IFile = {
    Folder: 'SitePages',
    Src: '{sitecollection}/Resources/ProjectStatus.txt',
    Url: 'ProjectStatus.aspx',
    Overwrite: true,
    Properties: {
        Title: __.getResource('Navigation_ProjectStatus_Title'),
    },
}

export default ProjectStatus
