import RESOURCE_MANAGER from "../../@localization";
import { ISecuredWebPartProps } from "../@SecuredWebPart";
import { PermissionKind } from "sp-pnp-js";

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
    permissionKind: PermissionKind.ManageWeb,
    dlgHeaderText: RESOURCE_MANAGER.getResource("NewProjectForm_Title"),
    dlgSubHeaderText: RESOURCE_MANAGER.getResource("NewProjectForm_SubText"),
    creationModalTitle: RESOURCE_MANAGER.getResource("CreationModal_Title"),
};
