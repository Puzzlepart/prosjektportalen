import * as React from "react";
import { LogLevel, Logger } from "sp-pnp-js";
import { ProjectStatsChartData, ProjectStatsChartDataItem } from "../ProjectStatsChart";
import IProjectStatsDataSelectionProps from "./IProjectStatsDataSelectionProps";
import IProjectStatsDataSelectionState from "./IProjectStatsDataSelectionState";
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import __ from "../../../Resources";

export default class ProjectStatsDataSelection extends React.PureComponent<IProjectStatsDataSelectionProps, IProjectStatsDataSelectionState> {
    public static defaultProps: Partial<IProjectStatsDataSelectionProps> = {
        columns: [{
            key: "name",
            fieldName: "name",
            name: "Tittel",
            minWidth: 100,
        }],
    };
    private _selection: Selection;

    constructor(props: IProjectStatsDataSelectionProps) {
        super(props);
        this.state = {
            isExpanded: false,
            selection: [],
        };
        this._onToggle = this._onToggle.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._onUpdateSelection = this._onUpdateSelection.bind(this);
        this._selection = new Selection({ onSelectionChanged: this._onSelectionChanged });
    }

    /**
     * Renders the <ProjectStatsDataSelection /> component
     */
    public render(): React.ReactElement<IProjectStatsDataSelectionProps> {
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
                                <span>{__.getResource("String_Select_Project_Name")}</span>
                                <span style={{ position: "absolute", right: 25 }}><Icon iconName={this.state.isExpanded ? "ChevronDown" : "ChevronUp"} /></span>
                            </div>
                        </div>
                        {this.state.isExpanded && (
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm12" style={{ marginTop: 20, marginBottom: 20 }}>
                                    <Dropdown
                                        placeHolder={__.getResource("String_Select_View_Name")}
                                        label={__.getResource("String_Select_View_Placeholder")}
                                        defaultSelectedKey={this.props.views.indexOf(this.props.selectedView)}
                                        options={this.props.views.map((view, i) => ({ key: i, text: view.name, data: view }))}
                                        onChanged={opt => this.props.onViewChanged(opt.data)} />
                                    <div className="ms-font-xs" style={{ marginTop: 20 }}>{__.getResource("String_Select_View_Description")}</div>
                                </div>
                                <div
                                    className="ms-Grid-col ms-sm12"
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                    hidden={this.state.selection.length === 0} >
                                    <MessageBar>{String.format(__.getResource("String_Selection_Status_MessageBar_Text"), this.state.selection.length, this.props.data.getCount())}</MessageBar>
                                </div>
                                <div className="ms-Grid-col ms-sm12" hidden={this.props.data.getCount() === 0}>
                                    <MarqueeSelection selection={this._selection}>
                                        <DetailsList
                                            items={this.props.data.getItems()}
                                            columns={this.props.columns}
                                            setKey="set"
                                            layoutMode={DetailsListLayoutMode.fixedColumns}
                                            selection={this._selection}
                                            selectionPreservedOnEmptyClick={true}
                                            selectionMode={SelectionMode.multiple}
                                            compact={true} />
                                    </MarqueeSelection>
                                    <div hidden={this.state.selection.length === 0} style={{ marginTop: 25 }} >
                                        <PrimaryButton
                                            text={__.getResource("String_Button_Update_Selection")}
                                            onClick={this._onUpdateSelection} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * On toggle
     */
    private _onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }), () => {
            Logger.log({ message: `(ProjectStatsDataSelection) _onToggle`, data: { isExpanded: this.state.isExpanded }, level: LogLevel.Info });
        });
    }

    /**
     * On selection changed
     */
    private _onSelectionChanged() {
        const selection = this._selection.getSelection();
        Logger.log({ message: `(ProjectStatsDataSelection) _onSelectionChanged: ${selection.length} items selected`, level: LogLevel.Info });
        this.setState({ selection: (selection as ProjectStatsChartDataItem[]) });
    }

    /**
     * On update selection
     *
     * @param {React.MouseEvent} event Event
     */
    private _onUpdateSelection(event: React.MouseEvent<HTMLButtonElement>) {
        Logger.log({ message: "(ProjectStatsDataSelection) _onUpdate", level: LogLevel.Info });
        event.preventDefault();
        event.stopPropagation();
        const data = new ProjectStatsChartData(this.state.selection);
        this.props.onUpdateSelection(data);
    }
}

export {
    IProjectStatsDataSelectionProps,
    IProjectStatsDataSelectionState,
};
