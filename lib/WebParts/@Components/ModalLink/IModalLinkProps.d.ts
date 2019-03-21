/// <reference types="react" />
/// <reference types="sharepoint" />
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";
export default interface IModalLinkProps extends React.HTMLAttributes<HTMLElement> {
    label?: string;
    showLabel?: boolean;
    title?: string;
    url: string;
    options?: IModalLinkOptions;
    onDialogReturnValueCallback?: SP.UI.DialogReturnValueCallback;
    reloadOnSubmit?: boolean;
    reloadOnCancel?: boolean;
    width?: number;
    height?: number;
    icon?: IModalLinkIconProps;
    id?: string;
    permissionKind?: SP.PermissionKind;
}
export declare const ModalLinkDefaultProps: Partial<IModalLinkProps>;
