import * as React from "react";
import { LogLevel, Logger } from "sp-pnp-js";
import IProjectStatsSettingsProps from "./IProjectStatsSettingsProps";
import IProjectStatsSettingsState from "./IProjectStatsSettingsState";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export default class ProjectStatsSettings extends React.PureComponent<IProjectStatsSettingsProps, IProjectStatsSettingsState> {

    constructor(props: IProjectStatsSettingsProps) {
        super(props);
        this.state = { isExpanded: false };
        this._onToggle = this._onToggle.bind(this);
    }

    /**
     * Renders the <ProjectStatsSettings /> component
     */
    public render(): React.ReactElement<IProjectStatsSettingsProps> {
        return (
            <div className={`ms-Grid-col ms-sm6`}>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12">
                            <div
                                onClick={this._onToggle}
                                className="ms-font-xl"
                                style={{
                                    cursor: "pointer",
                                    position: "relative",
                                }}>
                                <span>Innstillinger</span>
                                <span style={{ position: "absolute", right: 25 }}><Icon iconName={this.state.isExpanded ? "ChevronDown" : "ChevronUp"} /></span>
                            </div>
                        </div>
                        {this.state.isExpanded && (
                            <div className="ms-Grid-col ms-sm12" style={{ marginTop: 25 }}>
                                <p>TODO</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    private _onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }), () => {
            Logger.log({ message: `(ProjectStatsSettings) _onToggle`, data: { isExpanded: this.state.isExpanded }, level: LogLevel.Info });
        });
    }
}

export {
    IProjectStatsSettingsProps,
    IProjectStatsSettingsState,
};
