import * as React from "react";
import {
    Spinner,
    SpinnerType,
    Icon,
} from "office-ui-fabric-react";
import ProjectPhase from "./ProjectPhase";
import ChangePhaseDialog from "./ChangePhaseDialog";
import * as Project from "../../Project";
import * as Util from "../../Util";
import * as Data from "./Data";
import IProjectPhasesProps from "./IProjectPhasesProps";
import IProjectPhasesState from "./IProjectPhasesState";


export default class ProjectPhases extends React.PureComponent<IProjectPhasesProps, IProjectPhasesState> {
    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            phases: null,
            currentPhase: null,
            checkListData: {},
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        Data.fetchData().then(initialState => {
            this.setState({
                ...initialState,
            });
        });
    }

    /**
     * Render
     */
    public render(): JSX.Element {
        const {
            phases,
            currentPhase,
        } = this.state;

        const isPhaseSet = currentPhase && currentPhase.Name && currentPhase.Name !== "";

        if (phases) {
            return (
                <div>
                    {this.renderPhases(this.state)}
                    {this.renderDialog(this.state)}
                    <div
                        className="set-phase-text ms-metadata"
                        hidden={isPhaseSet}>
                        <Icon iconName="Error" /> {__("ProjectPhases_PhaseNotSetText")}
                    </div>
                </div>
            );
        } else {
            return <Spinner type={SpinnerType.large} />;
        }
    }

    /**
     * Render phases
     */
    private renderPhases = ({ phases, currentPhase, checkListData, changePhase }: IProjectPhasesState) => {
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
    private renderDialog = ({ checkListData, currentPhase, changePhase }: IProjectPhasesState) => {
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
     * Hide dialog
     */
    private hideDialog = (event?): void => {
        this.setState({ changePhase: null });
    }
};
