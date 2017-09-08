import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import {
    MessageBar,
    MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import ProjectPhase from "./ProjectPhase";
import ChangePhaseDialog from "./ChangePhaseDialog";
import * as Project from "../../Project";
import * as Data from "./Data";
import { PhaseModel } from "../../Model";
import IProjectPhasesProps from "./IProjectPhasesProps";
import IProjectPhasesState from "./IProjectPhasesState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Project Phases
 */
export default class ProjectPhases extends BaseWebPart<IProjectPhasesProps, IProjectPhasesState> {
    public static displayName = "ProjectPhases";

    /**
     * Constructor
     *
     * @param {IProjectPhasesProps} props Props
     */
    constructor(props: IProjectPhasesProps) {
        super(props, { isLoading: true });
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        Data.fetchData().then(data => {
            this.setState({
                ...data,
                isLoading: false,
            });
        });
    }

    /**
     * Render
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        return (
            <div>
                {this.renderPhases(this.props, this.state)}
                {this.renderDialog(this.props, this.state)}
                <div hidden={this.isPhaseSet(this.state)}>
                    <MessageBar messageBarType={MessageBarType.info}>
                        {__("ProjectPhases_PhaseNotSetText")}
                    </MessageBar>
                </div>
            </div>
        );
    }

    /**
     * Render phases
     *
     * @param {IProjectPhasesProps} param0 Props
     * @param {IProjectPhasesState} param1 State
     */
    private renderPhases = ({ }: IProjectPhasesProps, { phases, activePhase, checkListData, changePhase }: IProjectPhasesState): JSX.Element => {
        const visiblePhases = phases.filter(phase => phase.ShowOnFrontpage);
        return (
            <ul>
                {visiblePhases.map((phase, index) => {
                    let classList = [
                        index === 0 ? "first-phase" : "",
                        index === (phases.length - 1) ? "last-phase" : "",
                        activePhase && (phase.Name === activePhase.Name) ? "selected" : "",
                        phase.getPhasLevelClassName(),
                    ];
                    return (
                        <ProjectPhase
                            key={index}
                            phase={phase}
                            classList={classList}
                            checkListData={checkListData[phase.Id]}
                            onChangePhase={this.onChangePhase} />
                    );
                })}
            </ul>
        );
    }

    /**
     * Render dialog
     *
     * @param {IProjectPhasesProps} param0 Props
     * @param {IProjectPhasesState} param1 State
     */
    private renderDialog = ({ }: IProjectPhasesProps, { checkListData, activePhase, changePhase }: IProjectPhasesState): JSX.Element => {
        const checkListItems = (activePhase && checkListData && checkListData[activePhase.Id]) ? checkListData[activePhase.Id].items : [];
        if (changePhase) {
            return (
                <ChangePhaseDialog
                    phase={changePhase}
                    checkListItems={checkListItems}
                    onConfirmPhaseChange={this.onChangePhase}
                    hideHandler={e => this.setState({ changePhase: null })} />
            );
        }
        return null;
    }

    /**
     * On change phase
     *
     * @param {PhaseModel} phase New phase
     */
    private onChangePhase = (phase?: PhaseModel) => new Promise<void>((resolve, reject) => {
        if (phase) {
            this.setState({ changePhase: phase }, resolve);
        } else {
            Project.ChangeProjectPhase(this.state.changePhase, false)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    resolve();
                });
        }
    })

    /**
     * Checks if phase is set
     *
     * @param {IProjectPhasesState} param1 State
     */
    private isPhaseSet({ activePhase }: IProjectPhasesState): boolean {
        return activePhase && activePhase.Name && activePhase.Name !== "";
    }
}
