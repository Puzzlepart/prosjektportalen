//#region Imports
import RESOURCE_MANAGER from "../../@localization";
import * as React from "react";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import ProjectPhase from "./ProjectPhase";
import ChangePhaseDialog from "./ChangePhaseDialog";
import * as Project from "../../Project";
import { fetchData } from "./ProjectPhasesData";
import { PhaseModel } from "../../Model";
import { cleanString } from "../../Util";
import IProjectPhasesProps, { ProjectPhasesDefaultProps } from "./IProjectPhasesProps";
import IProjectPhasesState from "./IProjectPhasesState";
import BaseWebPart from "../@BaseWebPart";
//#endregion

/**
 * Project Phases
 */
export default class ProjectPhases extends BaseWebPart<IProjectPhasesProps, IProjectPhasesState> {
    public static displayName = "ProjectPhases";
    public static defaultProps = ProjectPhasesDefaultProps;

    /**
     * Constructor
     *
     * @param {IProjectPhasesProps} props Props
     */
    constructor(props: IProjectPhasesProps) {
        super(props, { isLoading: true });
        this._onChangePhase = this._onChangePhase.bind(this);
        this._onHideDialog = this._onHideDialog.bind(this);
    }

    public componentDidMount(): void {
        fetchData().then(data => {
            this.setState({
                data,
                isLoading: false,
            });
        });
    }

    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        return (
            <div>
                {this.renderPhases()}
                {this.renderDialog()}
                <div hidden={this.isPhaseSet()}>
                    <MessageBar messageBarType={MessageBarType.info}>
                        {RESOURCE_MANAGER.getResource("ProjectPhases_PhaseNotSetText")}
                    </MessageBar>
                </div>
            </div>
        );
    }

    /**
     * Render phases
     */
    private renderPhases(): JSX.Element {
        const { data } = this.state;
        return (
            <ul>
                {data.phases.map((phase, index) => {
                    const classList = this.getPhaseClassList(phase);
                    let changePhaseEnabled = Array.contains(classList, "selected");
                    if (this.props.forcedOrder && data.activePhase) {
                        changePhaseEnabled = phase.Index === data.activePhase.Index + 1;
                    }
                    return (
                        <ProjectPhase
                            key={index}
                            phase={phase}
                            classList={classList}
                            checkListData={data.checkListData[phase.Id]}
                            checkListDefaultViewUrl={data.checkListDefaultViewUrl}
                            changePhaseEnabled={changePhaseEnabled}
                            onChangePhase={this._onChangePhase} />
                    );
                })}
            </ul>
        );
    }

    /**
     * Render dialog
     */
    private renderDialog(): JSX.Element {
        const { data, changePhase } = this.state;
        const checkListItems = data.checkListData[data.activePhase.Id] ? data.checkListData[data.activePhase.Id].items : [];
        if (this.state.changePhase) {
            return (
                <ChangePhaseDialog
                    phase={changePhase}
                    checkListItems={checkListItems}
                    onConfirmPhaseChange={this._onChangePhase}
                    hideHandler={this._onHideDialog} />
            );
        }
        return null;
    }

    /**
     * Get classnames for a phase
     *
     * @param {any} phase The phase
     */
    private getPhaseClassList(phase): string[] {
        const { data } = this.state;
        const isFirst = phase.Index === 0;
        const isLast = (phase.Index === (data.phases.length - 1));
        const isSelected = (data.activePhase && (phase.Name === data.activePhase.Name));
        return [
            `level-${cleanString(phase.PhaseLevel)}`,
            `type-${cleanString(phase.Type)}`,
            isFirst && "first-phase",
            isLast && "last-phase",
            isSelected && "selected",
        ].filter(c => c);
    }

    /**
     * On change phase
     *
     * @param {PhaseModel} phase New phase
     */
    private async _onChangePhase(phase?: PhaseModel): Promise<void> {
        if (phase) {
            this.setState({ changePhase: phase });
        } else {
            await Project.ChangeProjectPhase(this.state.changePhase, false);
        }
    }

    /**
     * On hide dialog
     */
    private _onHideDialog() {
        this.setState({ changePhase: null });
    }

    /**
     * Checks if phase is set
     */
    private isPhaseSet(): boolean {
        const { data } = this.state;
        return data.activePhase && data.activePhase.Name && data.activePhase.Name !== "";
    }
}

export {
    IProjectPhasesProps,
    IProjectPhasesState,
};
