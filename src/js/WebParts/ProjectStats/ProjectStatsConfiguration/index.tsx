import * as React from "react";
import { LogLevel, Logger } from "@pnp/logging";
import IProjectStatsConfigurationProps from "./IProjectStatsConfigurationProps";
import IProjectStatsConfigurationState from "./IProjectStatsConfigurationState";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

export default class ProjectStatsConfiguration extends React.PureComponent<IProjectStatsConfigurationProps, IProjectStatsConfigurationState> {
    private _content: HTMLDivElement;

    constructor(props: IProjectStatsConfigurationProps) {
        super(props);
        this.state = { isExpanded: false };
        this._onToggle = this._onToggle.bind(this);
    }

    /**
     * Renders the <ProjectStatsConfiguration /> component
     */
    public render(): React.ReactElement<IProjectStatsConfigurationProps> {
        return (
            <div className={`ms-Grid-col ms-sm6`}>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12">
                            <div
                                onClick={this._onToggle}
                                className="ms-font-xl"
                                style={{ cursor: "pointer", position: "relative" }}>
                                <span>Konfigurasjon</span>
                                <span style={{ position: "absolute", right: 25 }}>
                                    <Icon iconName={this.state.isExpanded ? "ChevronDown" : "ChevronUp"} />
                                </span>
                            </div>
                        </div>
                        <div className="ms-Grid-col ms-sm12" style={{ marginTop: 25 }} hidden={!this.state.isExpanded} ref={ele => this._content = ele}>
                            {this.props.contentTypes.map((contentType) => (
                                <DefaultButton
                                    key={contentType.StringId}
                                    text={contentType.Description}
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        document.location.href = this._getContentTypeNewFormUrl(contentType);
                                    }}
                                    iconProps={{ iconName: "Add" }}
                                    style={{ margin: "0 5px 0 0" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    /**
     * Get new form url for a content type
     *
     * @param {any} contentType Content type
     */
    private _getContentTypeNewFormUrl(contentType): string {
        return `${contentType.NewFormUrl}?ContentTypeId=${contentType.StringId}&Source=${encodeURIComponent(_spPageContextInfo.serverRequestPath)}`;
    }

    /**
     * On toggle
     */
    private _onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }), () => {
            Logger.log({ message: `(ProjectStatsConfiguration) _onToggle`, data: { isExpanded: this.state.isExpanded }, level: LogLevel.Info });
        });
    }
}

export {
    IProjectStatsConfigurationProps,
    IProjectStatsConfigurationState,
};
