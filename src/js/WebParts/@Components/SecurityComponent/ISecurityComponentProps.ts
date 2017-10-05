import {PermissionKind} from "sp-pnp-js";

export default interface ISecurityComponentProps {
    permissionKind?: PermissionKind;
}

export const SecurityComponentDefaultProps: Partial<ISecurityComponentProps> = {};
