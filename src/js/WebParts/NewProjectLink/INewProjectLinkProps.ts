import RESOURCE_MANAGER from "../../@localization";
import { ISecuredWebPartProps } from "../@SecuredWebPart";

export default interface INewProjectLinkProps extends ISecuredWebPartProps {
    linkText?: string;
    iconProps?: { iconName: string };
    dlgHeaderText?: string;
    dlgSubHeaderText?: string;
    creationModalTitle?: string;
}

export const NewProjectLinkDefaultProps: Partial<INewProjectLinkProps> = {
    linkText: RESOURCE_MANAGER.getResource("NewProjectForm_Header"),
    iconProps: { iconName: "CirclePlus" },
    permissionKind: SP.PermissionKind.manageSubwebs,
    dlgHeaderText: RESOURCE_MANAGER.getResource("NewProjectForm_Title"),
    dlgSubHeaderText: RESOURCE_MANAGER.getResource("NewProjectForm_SubText"),
    creationModalTitle: RESOURCE_MANAGER.getResource("CreationModal_Title"),
};
