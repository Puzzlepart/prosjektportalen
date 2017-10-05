import pnp from "sp-pnp-js";
import ISecuredWebPartProps from "./ISecuredWebPartProps";
import ISecuredWebPartState from "./ISecuredWebPartState";
import BaseWebPart from "../@BaseWebPart";

export default class SecuredWebPart<P extends ISecuredWebPartProps, S extends ISecuredWebPartState> extends BaseWebPart<P, S> {
     /**
     * Constructor
     *
     * @param {P} props Props
     * @param {S} initialState State
     */
    constructor(props: P, initialState: S) {
        super(props, initialState);
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
    ISecuredWebPartProps,
    ISecuredWebPartState,
};

