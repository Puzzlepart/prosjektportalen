import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface ISecuredWebPartProps extends IBaseWebPartProps {
    permissionKind?: SP.PermissionKind;
}
