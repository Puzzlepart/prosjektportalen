import { ISecuredWebPartProps } from "../@SecuredWebPart";
import { PermissionKind } from "sp-pnp-js";

export default interface INewProjectLinkProps extends ISecuredWebPartProps {
    linkClassName?: string;
    iconProps?: {
        iconName: string,
        style: React.CSSProperties,
    };
}

export const NewProjectLinkDefaultProps: Partial<INewProjectLinkProps> = {
    linkClassName: "ms-font-l",
    iconProps: {
        iconName: "CirclePlus",
        style: {
            verticalAlign: "bottom",
            marginRight: 5,
        },
    },
    permissionKind: PermissionKind.ManageWeb,
};
