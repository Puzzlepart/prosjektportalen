import * as React from "react";
import pnp from "sp-pnp-js";
import ISecurityComponentProps from "./ISecurityComponentProps";
import ISecurityComponentState from "./ISecurityComponentState";

export default class SecurityComponent<P extends ISecurityComponentProps, S extends ISecurityComponentState> extends React.PureComponent<P, S> {
    /**
     * Constructor
     *
     * @param {P} props Props
     */
    constructor(props: P) {
        super(props);
    }

    /**
     * Component did mount
     */
    public async onInit(): Promise<void> {
        if (this.props.permissionKind) {
            const userHasPermission = await pnp.sp.web.currentUserHasPermissions(this.props.permissionKind);
            this.setState({ shouldRender: userHasPermission });
        } else {
            this.setState({ shouldRender: true });
        }
        return;
    }
}

export {
    ISecurityComponentProps,
    ISecurityComponentState,
};
