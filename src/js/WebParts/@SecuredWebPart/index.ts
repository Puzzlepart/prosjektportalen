import ISecuredWebPartProps from "./ISecuredWebPartProps";
import ISecuredWebPartState from "./ISecuredWebPartState";
import { CreateJsomContext, ExecuteJsomQuery } from "jsom-ctx";
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
            const jsomCtx = await CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
            const permissions = new SP.BasePermissions();
            permissions.set(this.props.permissionKind);
            const userHasPermission = jsomCtx.web.doesUserHavePermissions(permissions);
            await ExecuteJsomQuery(jsomCtx);
            this.setState({ shouldRender: userHasPermission.get_value() });
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

