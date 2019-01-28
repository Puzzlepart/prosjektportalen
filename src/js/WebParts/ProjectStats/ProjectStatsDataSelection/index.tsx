import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";
import { ProjectStatsChartData, ProjectStatsChartDataItem } from "../ProjectStatsChart";
import IProjectStatsDataSelectionProps from "./IProjectStatsDataSelectionProps";
import IProjectStatsDataSelectionState from "./IProjectStatsDataSelectionState";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import __ from "../../../Resources";

export default class ProjectStatsDataSelection extends React.PureComponent<IProjectStatsDataSelectionProps, IProjectStatsDataSelectionState> {
    public static defaultProps: Partial<IProjectStatsDataSelectionProps> = {
        columns: [{
            key: "name",
            fieldName: "name",
            name: "Tittel",
            minWidth: 100,
            maxWidth: 300,
        }],
    };
    private selection: Selection;

    constructor(props: IProjectStatsDataSelectionProps) {
        super(props);
        this.state = { isExpanded: false, selection: [] };
        this.selection = new Selection({ onSelectionChanged: this.onSelectionChanged });
    }

    /**
     * Renders the <ProjectStatsDataSelection /> component
     */
    public render(): React.ReactElement<IProjectStatsDataSelectionProps> {
        return (
            <Modal
                isOpen={true}
                onDismiss={this.props.onDismiss}>
                <div className="ms-Grid" style={{ padding: 40, width: 500 }}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12" style={{ marginBottom: 20 }}>
                            <h2>{__.getResource("String_ProjectStats_EditDataSelection_Text")}</h2>
                        </div>
                        <div className="ms-Grid-col ms-sm12" hidden={this.props.data.getCount() === 0}>
                            <MarqueeSelection selection={this.selection}>
                                <DetailsList
                                    items={this.props.data.getItems()}
                                    columns={this.props.columns}
                                    setKey="set"
                                    layoutMode={DetailsListLayoutMode.fixedColumns}
                                    selection={this.selection}
                                    selectionPreservedOnEmptyClick={true}
                                    selectionMode={SelectionMode.multiple}
                                    compact={true} />
                            </MarqueeSelection>
                            <div hidden={this.state.selection.length === 0} style={{ marginTop: 25 }} >
                                <PrimaryButton
                                    style={{ width: "100%" }}
                                    text={__.getResource("String_Button_Update_Selection")}
                                    iconProps={{ iconName: "Refresh" }}
                                    onClick={this.onUpdateSelection} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    /**
     * On selection changed
     */
    @autobind
    private onSelectionChanged() {
        const selection = this.selection.getSelection();
        Logger.log({ message: `(ProjectStatsDataSelection) onSelectionChanged: ${selection.length} items selected`, level: LogLevel.Info });
        this.setState({ selection: (selection as ProjectStatsChartDataItem[]) });
    }

    /**
     * On update selection
     *
     * @param {React.MouseEvent} event Event
     */
    @autobind
    private onUpdateSelection(event: React.MouseEvent<HTMLButtonElement>) {
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
