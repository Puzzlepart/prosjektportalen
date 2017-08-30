import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as Util from "../../../Util";
import AudienceTargeting from "../../AudienceTargeting";
import ModalLinkIconPosition from "./ModalLinkIconPosition";
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";
import IModalLinkProps, { ModalLinkDefaultProps } from "./IModalLinkProps";
import IModalLinkState from "./IModalLinkState";

export default class ModalLink extends React.PureComponent<IModalLinkProps, IModalLinkState> {
    public static defaultProps = ModalLinkDefaultProps;
    /**
     * Constructor
     */
    constructor(props: IModalLinkProps) {
        super(props);
        this.state = {
            shouldRender: props.audienceTargeting === AudienceTargeting.None,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        Util.doesUserMatchAudience(this.props.audienceTargeting).then(userMatchAudience => {
            if (userMatchAudience !== this.state.shouldRender) {
                this.setState({
                    shouldRender: userMatchAudience,
                });
            }
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    private _render({ label, url, showLabel, icon, className, id, style, hidden }: IModalLinkProps, { shouldRender }: IModalLinkState): JSX.Element {
        if (!shouldRender) {
            return null;
        }
        return (
            <a
                href={url}
                hidden={hidden}
                onClick={e => this.showModalDialog(e, this.props)}
                id={id}
                className={className}
                style={style} >
                {icon && icon.position === ModalLinkIconPosition.Left && (
                    <Icon
                        iconName={icon.iconName}
                        style={{ marginRight: 5 }} />
                )}
                {(label && showLabel) && label}
                {icon && icon.position === ModalLinkIconPosition.Right && (
                    <Icon
                        iconName={icon.iconName}
                        style={{ marginLeft: 5 }} />
                )
                }
            </a >
        );
    }

    /**
     * Show Modal Dialog
     */
    private showModalDialog = (e, { label, url, options, reloadOnSubmit, reloadOnCancel, width, height }: IModalLinkProps): void => {
        e.preventDefault();
        e.stopPropagation();

        let mOptions: Partial<SP.UI.DialogOptions> = {
            title: label,
            url: url,
        };
        if (width) {
            mOptions.width = width;
        }
        if (height) {
            mOptions.height = height;
        }
        let urlParams = [];
        if (options) {
            Object.keys(options).forEach(key => {
                let value = options[key];
                if (value === true) {
                    value = "1";
                } else if (value === false) {
                    value = "0";
                }
                urlParams.push(`${key}=${value}`);
            });
            if (urlParams.length > 0) {
                let u = url.indexOf("?") === -1 ? "?" : "&";
                mOptions.url = `${mOptions.url}${u}${urlParams.join("&")}`;
            }
        }
        if (reloadOnSubmit || reloadOnCancel) {
            mOptions.dialogReturnValueCallback = (result) => {
                if (result === 1 && reloadOnSubmit) {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
                }
                if (result === 0 && reloadOnCancel) {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
                }
            };
        }
        SP.UI.ModalDialog.showModalDialog(mOptions);
    }
}

export {
    ModalLink,
    IModalLinkProps,
    ModalLinkIconPosition,
    IModalLinkIconProps,
    IModalLinkOptions,
};
