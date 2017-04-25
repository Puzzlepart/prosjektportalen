import * as React from "react";
import * as extend from "extend";

export interface IProps {
    label?: string;
    showLabel?: boolean;
    url: string;
    options?: any;
    reloadOnSuccess?: boolean;
    width?: string;
    height?: string;
    icon?: string;
    className?: string;
    id?: string;
    style?: Object;
    hidden: boolean;
}

const ModalLink = ({ label, showLabel = true, url, options, reloadOnSuccess = false, width, height, icon, className = "", id, style = {}, hidden }: IProps) => {
    const onClick = () => {
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

    let _style = extend(style, { cursor: "pointer" });

    return (<a hidden={hidden} onClick={onClick} id={id} className={className} style={_style}>
        {(label && showLabel) && label}
        {icon && <span className={`ms-Icon ms-Icon--${icon}`}></span>}
    </a>);
};

export default ModalLink;
