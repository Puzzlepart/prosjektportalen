import * as React from "react";
import { Link } from "react-scroll";
import { Icon } from "../../../@Components";
import { GetStatusCssClass } from "../../Utils";

export interface IStatusElementProps {
    name: string;
    iconName: string;
    statusValue: string;
    comment: string;
    scrollTo?: any;
    fieldName?: string;
};

/**
 * Status element
 */
const StatusElement = ({ name, iconName, statusValue, comment, scrollTo, fieldName }: IStatusElementProps) => {
    let statusCssClass = fieldName ? GetStatusCssClass(fieldName, statusValue) : "";
    return (
        <Link className="status-element ms-Grid-row" to={scrollTo} offset={-100} smooth={true} duration={300}>
            <div className="status-icons ms-Grid-col ms-u-sm12 ms-u-md2 ms-u-lg2">
                <Icon name={iconName} className={statusCssClass} />
            </div>
            <div className="status-details ms-Grid-col ms-u-sm12 ms-u-md10 ms-u-lg8">
                <h2>{name}</h2>
                <h1>{statusValue ? statusValue : ""}</h1>
                {<p>{comment}</p>}
            </div>
        </Link>
    );
};

export default StatusElement;
