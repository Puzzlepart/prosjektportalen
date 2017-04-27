import * as React from "react";

export interface IIconProps {
    name: string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Icon
 */
export const Icon = ({ name, color, className, style }: IIconProps) => {
    let classNames = ["ms-Icon", `ms-Icon--${name}`];
    if (className) {
        classNames.push(className);
    }
    let _style: React.CSSProperties = style || {};
    if (color) {
        _style.color = color;
    }
    return <i className={classNames.join(" ")} style={style}></i>;
};
