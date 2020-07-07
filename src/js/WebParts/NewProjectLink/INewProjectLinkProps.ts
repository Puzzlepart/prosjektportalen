import __ from '../../Resources'
import { ISecuredWebPartProps } from '../@SecuredWebPart'

export default interface INewProjectLinkProps extends ISecuredWebPartProps {
    linkText?: string;
    iconProps?: { iconName: string };
    dlgHeaderText?: string;
    dlgSubHeaderText?: string;
    creationModalTitle?: string;
}

export const NewProjectLinkDefaultProps: Partial<INewProjectLinkProps> = {
    linkText: __.getResource('NewProjectForm_Header'),
    iconProps: { iconName: 'CirclePlus' },
    permissionKind: 24,
    dlgHeaderText: __.getResource('NewProjectForm_Title'),
    dlgSubHeaderText: __.getResource('NewProjectForm_SubText'),
    creationModalTitle: __.getResource('CreationModal_Title'),
}
