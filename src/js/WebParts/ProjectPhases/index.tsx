import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import ProjectPhase from "./ProjectPhase";
import ChangePhaseDialog from "./ChangePhaseDialog";
import { ChangeProjectPhase } from "../../Project";
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
            checkListData,
            changePhase,
        } = this.state;

        let checkListItems = (currentPhase && checkListData && checkListData[currentPhase.Id]) ? checkListData[currentPhase.Id].items : [];
        if (phases) {
            return (<div>
                <ul>
                    {phases.map((p, index) => {
                        let classList = [
                            index === 0 ? "first-phase" : "",
                            index === (phases.length - 1) ? "last-phase" : "",
                            currentPhase && (p.Name === currentPhase.Name) ? "selected" : "",
                            p.PhaseLevel ? p.PhaseLevel.trim().toLowerCase() : "unknown-phaselevel",
                        ];
                        return (<ProjectPhase
                            key={index}
                            phase={p}
                            classList={classList}
                            checkListData={checkListData[p.Id]}
                            onChangePhase={this.onChangePhase} />);
                    })}
                </ul>
                {changePhase
                    && <ChangePhaseDialog
                        phase={changePhase}
                        checkListItems={checkListItems}
                        onConfirmPhaseChange={this.onChangePhase}
                        hideHandler={this.hideDialog} />}
                <div className="set-phase-text ms-metadata" hidden={currentPhase && currentPhase.Name && currentPhase.Name !== ""}><i className="ms-Icon ms-Icon--Error" aria-hidden="true"></i> {__("ProjectPhases_PhaseNotSetText")}</div>
            </div>);
        } else {
            return <Spinner type={SpinnerType.large} />;
        }
    }

    /**
     * On change phase
     */
    private onChangePhase = (phase): void => {
        if (phase) {
            this.setState({ changePhase: phase });
        } else {
            this.hideDialog();
            ChangeProjectPhase(this.state.changePhase)
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
