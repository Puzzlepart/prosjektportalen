import * as React from "react";
import { Icon } from "../../../@Components";
import * as Util from "../../../../Util";
import { GetStatusCssClass } from "../../Utils";
import ISectionHeaderProps from "./ISectionHeaderProps";

const SectionHeaderDetails = ({ name, fieldName, statusValue, statusComment }: any) => {
    return (
        <div className="section-details ms-Grid-col ms-sm12 ms-md9 ms-lg9">
            <h1>{name}</h1>
            <div hidden={!fieldName}>
                <h3>{statusValue}</h3>
                <p>{Util.htmlDecode(statusComment)}</p>
            </div>
        </div>
    );
};

const SectionHeaderNavigate = ({ source }: any) => {
    if (source) {
        return (
            <div className="section-navigate-to ms-Grid-col ms-sm12 ms-md1 ms-lg1">
                <a href={`${_spPageContextInfo.webAbsoluteUrl}/${source}`}><i className="ms-Icon ms-Icon--Forward" title={__("String_NavigateToList")}></i></a>
            </div>
        );
    }
    return null;
};

const SectionHeader = ({ section }: ISectionHeaderProps) => {
    let statusCssClass = GetStatusCssClass(section.fieldName, section.statusValue);
    return (
        <div className="ms-Grid">
            <div className="section-header ms-Grid-row">
                <div className="section-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                    <div className="ms-Grid-row">
                        <div className="section-icons ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                            <Icon name={section.iconName} className={statusCssClass} />
                        </div>
                    </div>
                </div>
                <SectionHeaderDetails { ...section } />
                <SectionHeaderNavigate { ...section } />
            </div >
        </div >
    );
};

export default SectionHeader;
export { ISectionHeaderProps };
