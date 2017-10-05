import { IBaseWebPartProps } from "../@BaseWebPart";
import { PermissionKind } from "sp-pnp-js";

export default interface ISecuredWebPartProps extends IBaseWebPartProps {
    permissionKind?: PermissionKind;
}
