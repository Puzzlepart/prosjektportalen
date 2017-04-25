import * as React from "react";

export interface IIconProps {
    name: string;
    color?: string;
    className?: string;
}

export const Icon = ({ name, color, className }: IIconProps) => {
    let classNames = ["ms-Icon", `ms-Icon--${name}`];
    if (className) {
        classNames.push(className);
    }
    return <i className={classNames.join(" ")} style={color ? { color: color } : {}}></i>;
};
