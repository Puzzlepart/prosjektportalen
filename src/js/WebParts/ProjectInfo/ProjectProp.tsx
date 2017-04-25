import * as React from "react";

export interface IProjectProp {
    internalName: string;
    displayName: string;
    description: string;
    value: string;
    type: string;
    empty: boolean;
    required: any;
}

export const ProjectProp = ({ data: { internalName, displayName, description, value, type, required } }) => {
    return (<div key={internalName} className={internalName + " prop"} data-type={type} data-required={required} title={description}>
        <div className="_label">{displayName}</div>
        <div className="_value" dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>);
};
