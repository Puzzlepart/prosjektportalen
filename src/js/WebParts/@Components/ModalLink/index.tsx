import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import ModalLinkIconPosition from "./ModalLinkIconPosition";
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";
import IModalLinkProps, { ModalLinkDefaultProps } from "./IModalLinkProps";
import IModalLinkState from "./IModalLinkState";
import { CreateJsomContext, ExecuteJsomQuery } from "jsom-ctx";

/**
 * Modal Link
 */
export default class ModalLink extends React.PureComponent<IModalLinkProps, IModalLinkState> {
    public static displayName = "ModalLink";
    public static defaultProps = ModalLinkDefaultProps;

    /**
     * Constructor
     *
     * @param {IModalLinkProps} props Props
     */
    constructor(props: IModalLinkProps) {
        super(props);
        this.state = {};
    }

    /**
     * Component did mount
     */
    public async componentDidMount(): Promise<void> {
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

    /**
     * Renders the <ModalLink /> component
     */
    public render(): JSX.Element {
        if (this.state.shouldRender) {
            let iconPosition = ModalLinkIconPosition.Left;
            if (this.props.icon && this.props.icon.hasOwnProperty("position")) {
                iconPosition = this.props.icon.position;
            }
            return (
                <a
                    href={this.props.url}
                    hidden={this.props.hidden}
                    onClick={this.showModalDialog}
                    id={this.props.id}
                    className={this.props.className}
                    style={this.props.style} >
                    {this.props.icon && iconPosition === ModalLinkIconPosition.Left && (
                        <Icon
                            iconName={this.props.icon.iconName}
                            style={{ marginRight: 5 }} />
                    )}
                    {(this.props.label && this.props.showLabel) && this.props.label}
                    {this.props.icon && iconPosition === ModalLinkIconPosition.Right && (
                        <Icon
                            iconName={this.props.icon.iconName}
                            style={{ marginLeft: 5 }} />
                    )
                    }
                </a >
            );
        }
        return null;
    }

    /**
     * Show Modal Dialog
     *
     * @param {React.MouseEvent<HTMLAnchorElement>} event Event
     */
    @autobind
    private showModalDialog(event: React.MouseEvent<HTMLAnchorElement>): void {
        event.preventDefault();
        event.stopPropagation();

        let modalOptions: Partial<SP.UI.DialogOptions> = {
            title: this.props.title || this.props.label,
            url: this.props.url,
        };
        if (this.props.width) {
            modalOptions.width = this.props.width;
        }
        if (this.props.height) {
            modalOptions.height = this.props.height;
        }
        let urlParams = [];
        if (this.props.options) {
            Object.keys(this.props.options).forEach(key => {
                let value = this.props.options[key];
                if (value === true) {
                    value = "1";
                } else if (value === false) {
                    value = "0";
                }
                urlParams.push(`${key}=${value}`);
            });
            if (urlParams.length > 0) {
                let u = this.props.url.indexOf("?") === -1 ? "?" : "&";
                modalOptions.url = `${modalOptions.url}${u}${urlParams.join("&")}`;
            }
        }
        if (this.props.onDialogReturnValueCallback) {
            modalOptions.dialogReturnValueCallback = this.props.onDialogReturnValueCallback;
        } else if (this.props.reloadOnSubmit || this.props.reloadOnCancel) {
            modalOptions.dialogReturnValueCallback = result => {
                if (result === 1 && this.props.reloadOnSubmit) {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);

                }
                if (result === 0 && this.props.reloadOnCancel) {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
                }
            };
        }
        SP.UI.ModalDialog.showModalDialog(modalOptions);
    }
}

export {
    ModalLink,
    IModalLinkProps,
    ModalLinkIconPosition,
    IModalLinkIconProps,
    IModalLinkOptions,
};
