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
import * as Util from "../../Util";
import * as Data from "./Data";
import IProjectPhasesProps from "./IProjectPhasesProps";
import IProjectPhasesState from "./IProjectPhasesState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Project Phases
 */
export default class ProjectPhases extends BaseWebPart<IProjectPhasesProps, IProjectPhasesState> {
    /**
     * Constructor
     *
     * @param {IProjectPhasesProps} props Props
     */
    constructor(props: IProjectPhasesProps) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        Data.fetchData().then(initialState => {
            this.setState({
                ...initialState,
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
                {this.renderPhases(this.state)}
                {this.renderDialog(this.state)}
                {!this.isPhaseSet() && (
                    <MessageBar messageBarType={MessageBarType.info}>
                        {__("ProjectPhases_PhaseNotSetText")}
                    </MessageBar>
                )}
            </div>
        );
    }

    /**
     * Render phases
     */
    private renderPhases = ({ phases, currentPhase, checkListData, changePhase }: IProjectPhasesState): JSX.Element => {
        return (
            <ul>
                {phases.map((p, index) => {
                    let classList = [
                        index === 0 ? "first-phase" : "",
                        index === (phases.length - 1) ? "last-phase" : "",
                        currentPhase && (p.Name === currentPhase.Name) ? "selected" : "",
                        p.PhaseLevel ? p.PhaseLevel.trim().toLowerCase() : "unknown-phaselevel",
                    ];
                    return (
                        <ProjectPhase
                            key={index}
                            phase={p}
                            classList={classList}
                            checkListData={checkListData[p.Id]}
                            onChangePhase={this.onChangePhase} />
                    );
                })}
            </ul>
        );
    }

    /**
     * Render dialog
     */
    private renderDialog = ({ checkListData, currentPhase, changePhase }: IProjectPhasesState): JSX.Element => {
        const checkListItems = (currentPhase && checkListData && checkListData[currentPhase.Id]) ? checkListData[currentPhase.Id].items : [];
        if (changePhase) {
            return (
                <ChangePhaseDialog
                    phase={changePhase}
                    checkListItems={checkListItems}
                    onConfirmPhaseChange={this.onChangePhase}
                    hideHandler={this.hideDialog} />
            );
        }
        return null;
    }

    /**
     * On change phase
     *
     * @param phase New phase
     */
    private onChangePhase = (phase): void => {
        if (phase) {
            this.setState({ changePhase: phase });
        } else {
            this.hideDialog();
            Project.ChangeProjectPhase(this.state.changePhase)
                .then(Util.reloadPage)
                .catch(Util.reloadPage);
        }
    }

    /**
     * Checks if phase is set
     */
    private isPhaseSet(): boolean {
        return this.state.currentPhase && this.state.currentPhase.Name && this.state.currentPhase.Name !== "";
    }

    /**
     * Hide dialog
     */
    private hideDialog = (event?): void => {
        this.setState({ changePhase: null });
    }
}
