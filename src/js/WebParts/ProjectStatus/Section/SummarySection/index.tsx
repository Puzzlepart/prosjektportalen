import * as React from "react";
import __ from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Element } from "react-scroll";
import StatusElement from "./StatusElement";
import ProjectInfo from "../../../ProjectInfo";
import ISummarySectionProps, { ISummarySectionHeaderProps, ISummarySectionProjectDataProps, ISummarySectionStatusColumnsProps } from "./ISummarySectionProps";

const SummarySectionHeader = ({ title, titleUrl }: ISummarySectionHeaderProps) => {
    return (
        <div hidden={!title} className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
                <div className="ms-Grid">
                    <div className="section-header ms-Grid-row">
                        <div className="section-details ms-Grid-col ms-sm12 ms-md11 ms-lg11">
                            <h1>{title}</h1>
                        </div>
                        <div className="section-navigate-to ms-Grid-col ms-sm12 ms-md1 ms-lg1">
                            <a href={titleUrl}>
                                <Icon iconName="Forward" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SummarySectionProjectData = ({ propertiesLabel, webUrl, showActionLinks }: ISummarySectionProjectDataProps) => {
    return (
        <div className="ms-Grid-col ms-lg12 ms-xl4 status-project-data">
            <div className="status-elements">
                <div className="status-element">
                    <div className="status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                        <Icon iconName="CustomList" />
                    </div>
                    <div className="status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8">
                        <h2>{propertiesLabel}</h2><h1></h1>
                        <ProjectInfo
                            hideChrome={true}
                            webUrl={webUrl}
                            showActionLinks={showActionLinks}
                            showMissingPropsWarning={false}
                            filterField="GtPcProjectStatus"
                            labelSize="m"
                            valueSize="s" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SummarySectionStatusColumns = ({ sections }: ISummarySectionStatusColumnsProps) => {
    const statusElements = sections.map((section, key) => (
        <StatusElement
            key={key}
            section={section}
            scrollTo={`section-${key}`} />
    ));

    const statusElementsOdd = statusElements.filter((_: any, idx: number) => idx % 2 === 0);
    const statusElementsEven = statusElements.filter((_: any, idx: number) => idx % 2 !== 0);

    return (
        <div className="ms-Grid-col ms-lg12 ms-xl8">
            <div className="status-elements">
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            {statusElementsOdd}
                        </div>
                        <div className="ms-Grid-col ms-sm6">
                            {statusElementsEven}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SummarySection = ({ title, titleUrl, sections, webUrl = _spPageContextInfo.webAbsoluteUrl, style, propertiesLabel, showActionLinks }: ISummarySectionProps) => {
    return (
        <Element name="status-section" className="status-section section ms-Grid-row" style={style}>
            <div className="ms-Grid-col ms-sm12">
                <div className="ms-Grid">
                    <SummarySectionHeader title={title} titleUrl={titleUrl} />
                    <div className="ms-Grid-row">
                        <SummarySectionProjectData propertiesLabel={propertiesLabel} webUrl={webUrl} showActionLinks={showActionLinks} />
                        <SummarySectionStatusColumns sections={sections} />
                    </div>
                </div>
            </div>
        </Element>
    );
};

export default SummarySection;
