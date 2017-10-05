import * as React from "react";
import pnp from "sp-pnp-js";
import IAudienceTargetedComponentProps from "./IAudienceTargetedComponentProps";
import IAudienceTargetedComponentState from "./IAudienceTargetedComponentState";

export default class AudienceTargetedComponent<P extends IAudienceTargetedComponentProps, S extends IAudienceTargetedComponentState> extends React.PureComponent<P, S> {
    /**
     * Constructor
     *
     * @param {P} props Props
     */
    constructor(props: P) {
        super(props);
    }

    /**
     * On init
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
    IAudienceTargetedComponentProps,
    IAudienceTargetedComponentState,
};

