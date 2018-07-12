import * as React from "react";
import __ from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Element } from "react-scroll";
import StatusElement from "./StatusElement";
import ProjectInfo from "../../../ProjectInfo";
import ISummarySectionProps from "./ISummarySectionProps";

const SummarySection = ({ title, titleUrl, project, sections, webUrl = _spPageContextInfo.webAbsoluteUrl, style }: ISummarySectionProps) => {
    return (
        <Element name="status-section" className="status-section section ms-Grid-row" style={style}>
            <div className="ms-Grid-col ms-sm12">
                <div className="ms-Grid">
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
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-lg12 ms-xl4 status-project-data">
                            <div className="status-elements">
                                <div className="status-element">
                                    <div className="status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                                        <Icon iconName="CustomList" />
                                    </div>
                                    <div className="status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8">
                                        <h2>{__.getResource("ProjectStatus_Heading_ProjectMetadata")}</h2><h1></h1>
                                        <ProjectInfo
                                            hideChrome={true}
                                            webUrl={webUrl}
                                            actionLinks={[{
                                                url: `${webUrl}/SitePages/Forms/DispForm.aspx?ID=3`,
                                                label: __.getResource("ProjectInfo_ViewProperties"),
                                                icon: { iconName: "PreviewLink" },
                                                options: {
                                                    HideContentTypeChoice: true,
                                                    HideWebPartMaintenancePageLink: true,
                                                    HideRibbon: true,
                                                },
                                                reloadOnSubmit: false,
                                                showLabel: true,
                                            }]}
                                            showActionLinks={true}
                                            showMissingPropsWarning={false}
                                            filterField="GtPcProjectStatus"
                                            labelSize="m"
                                            valueSize="s" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ms-Grid-col ms-lg12 ms-xl8 status-columns-container">

                            <div className="status-elements">
                                {sections.map((section, key) => (
                                    <StatusElement
                                        key={key}
                                        section={section}
                                        scrollTo={`section-${key}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Element>
    );
};

export default SummarySection;
