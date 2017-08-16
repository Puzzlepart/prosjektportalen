import * as React from "react";
import {
    MessageBar,
    MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import { Element } from "react-scroll";
import StatusElement from "./StatusElement";
import ProjectInfo from "../../../ProjectInfo";
import ISectionProps from "./ISectionProps";

const TopSection = ({ project, sections }: ISectionProps) => {
    return (
        <Element
            name="status-section"
            className="status-section section ms-Grid-row">
            <div className="ms-Grid-col ms-lg12 ms-xl4 status-project-data status-elements-container">
                <div className="status-elements">
                    <div className="status-element">
                        <div className="status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                            <i className="ms-Icon ms-Icon--CustomList no-status"></i>
                        </div>
                        <div className="status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8">
                            <h2>{__("ProjectStatus_Heading_ProjectMetadata")}</h2><h1></h1>
                            <ProjectInfo
                                hideChrome={true}
                                showActionLinks={false}
                                showMissingPropsWarning={false}
                                filterField="GtPcProjectStatus"
                                labelSize="m"
                                valueSize="s" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-lg12 ms-xl8 status-elements-container">
                <div style={{ padding: 20 }}>
                    <MessageBar messageBarType={MessageBarType.warning}>{__("ProjectStatus_NoData")}</MessageBar>
                </div>
                <div className="status-elements">
                    {sections.map((section, key) => (
                        <StatusElement
                            key={key}
                            section={section}
                            scrollTo={`section-${key}`} />
                    ))}
                </div>
            </div>
        </Element>
    );
};

export default TopSection;
