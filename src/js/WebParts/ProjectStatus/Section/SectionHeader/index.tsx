import * as React from "react";
import __ from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as Util from "../../../../Util";
import ISectionHeaderProps from "./ISectionHeaderProps";

const SectionHeaderDetails = ({ name, fieldName, statusValue, statusComment }: any) => {
    return (
        <div className="section-details ms-Grid-col ms-sm12 ms-md9 ms-lg9">
            <h3>{name}</h3>
            <div hidden={!fieldName}>
                <h2>{statusValue}</h2>
                <p>{Util.htmlDecode(statusComment)}</p>
            </div>
        </div>
    );
};

const SectionHeaderNavigate = ({ source, fallbackNavigateUrl }) => {
    let navUrl = null;
    if (source) {
        navUrl = `${_spPageContextInfo.webServerRelativeUrl}/${source}`;
    }
    if (fallbackNavigateUrl) {
        navUrl = fallbackNavigateUrl;
    }
    if (navUrl) {
        return (
            <div className="section-navigate-to ms-Grid-col ms-sm12 ms-md1 ms-lg1">
                <a href={navUrl}>
                    <Icon iconName="Forward" title={__.getResource("String_NavigateToList")} />
                </a>
            </div>
        );
    }
    return null;
};

const SectionHeader = ({ id, section, fallbackNavigateUrl }: ISectionHeaderProps) => {
    return (
        <div
            id={id}
            className="ms-Grid">
            <div className="section-header ms-Grid-row">
                <div className="section-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                    <div className="ms-Grid-row">
                        <div className="section-icons ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                            <Icon iconName={section.iconName} className={section.statusProperties.statusClassName} />
                        </div>
                    </div>
                </div>
                <SectionHeaderDetails { ...section } />
                <SectionHeaderNavigate source={section.source} fallbackNavigateUrl={fallbackNavigateUrl} />
            </div>
        </div>
    );
};

export default SectionHeader;
export { ISectionHeaderProps };
