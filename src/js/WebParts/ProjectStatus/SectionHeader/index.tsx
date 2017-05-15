import * as React from "react";
import { Icon } from "../../@Components";
import { GetStatusCssClass } from "../Utils";

export interface ISectionHeaderProps {
    name: string;
    statusValue: string;
    comment: string;
    source?: string;
    iconName: string;
    fieldName: string;
}

const SectionHeader = ({ name, statusValue, comment, source, iconName, fieldName }: ISectionHeaderProps) => {
    let statusCssClass = GetStatusCssClass(fieldName, statusValue);
    return (
        <div className="ms-Grid">
            <div className="section-header ms-Grid-row">
                <div className="section-icons ms-Grid-col ms-u-sm12 ms-u-md2 ms-u-lg2">
                    <div className="ms-Grid-row">
                        <div className="section-icons ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg6">
                            <Icon name={iconName} className={statusCssClass} />
                        </div>
                    </div>
                </div>
                <div className="section-details ms-Grid-col ms-u-sm12 ms-u-md9 ms-u-lg9">
                    <h1>{name}</h1>
                    <h3>{statusValue}</h3>
                    <p>{comment}</p>
                </div>
                <div className="section-navigate-to ms-Grid-col ms-u-sm12 ms-u-md1 ms-u-lg1">
                    {(source) ? <a href={source}><i className="ms-Icon ms-Icon--Forward" title="Naviger til listen"></i></a> : null}
                </div>
            </div >
        </div >
    );
};

export default SectionHeader;
