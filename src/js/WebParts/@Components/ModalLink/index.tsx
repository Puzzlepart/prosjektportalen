import * as React from "react";
import { Icon } from "office-ui-fabric-react";
import IModalLinkProps, { ModalLinkIconPosition, IModalLinkIconProps, IModalLinkOptions } from "./IModalLinkProps";


export const ModalLink = ({ label, showLabel = true, url, options, reloadOnSuccess = false, width, height, icon, className = "", id, style, hidden }: IModalLinkProps) => {
    const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let mOptions: any = {
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
        if (reloadOnSuccess) {
            mOptions.dialogReturnValueCallback = (result) => {
                if (result === 1) {
                    document.location.href = _spPageContextInfo.serverRequestPath;
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
