import { PermissionKind } from "sp-pnp-js";

export default interface IAudienceTargetedComponentProps extends React.HTMLAttributes<HTMLElement> {
    permissionKind?: PermissionKind;
}
