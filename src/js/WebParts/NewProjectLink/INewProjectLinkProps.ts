import RESOURCE_MANAGER from "../../@localization";
import { ISecuredWebPartProps } from "../@SecuredWebPart";
import { PermissionKind } from "sp-pnp-js";

export default interface INewProjectLinkProps extends ISecuredWebPartProps {
    linkText?: string;
    linkClassName?: string;
    iconProps?: {
        iconName: string,
        style: React.CSSProperties,
    };
    dlgHeaderText?: string;
    dlgSubHeaderText?: string;
}

export const NewProjectLinkDefaultProps: Partial<INewProjectLinkProps> = {
    linkText: RESOURCE_MANAGER.getResource("NewProjectForm_Header"),
    linkClassName: "ms-font-l",
    iconProps: {
        iconName: "CirclePlus",
        style: {
            verticalAlign: "bottom",
            marginRight: 5,
        },
    },
    permissionKind: PermissionKind.ManageWeb,
    dlgHeaderText: RESOURCE_MANAGER.getResource("NewProjectForm_Title"),
    dlgSubHeaderText: RESOURCE_MANAGER.getResource("NewProjectForm_SubText"),
};
