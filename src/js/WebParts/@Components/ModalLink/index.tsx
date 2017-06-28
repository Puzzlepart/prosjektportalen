import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import ModalLinkIconPosition from "./ModalLinkIconPosition";
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";
import IModalLinkProps from "./IModalLinkProps";


export const ModalLink = ({ label, showLabel = true, url, options, reloadOnSubmit = false, reloadOnCancel = false, width, height, icon, className = "", id, style, hidden }: IModalLinkProps) => {
    const onClick = (e) => {
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
    };

    return (
        <a
            href="#"
            hidden={hidden}
            onClick={onClick}
            id={id}
            className={className}
            style={style}>
            {icon && icon.position === ModalLinkIconPosition.Left && <Icon iconName={icon.iconName} style={{ marginRight: 5 }} />}
            {(label && showLabel) && label}
            {icon && icon.position === ModalLinkIconPosition.Right && <Icon iconName={icon.iconName} style={{ marginLeft: 5 }} />}
        </a>
    );
};

export default ModalLink;
export {
    IModalLinkProps,
    ModalLinkIconPosition,
    IModalLinkIconProps,
    IModalLinkOptions,
};
