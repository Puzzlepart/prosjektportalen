/// <reference types="react" />
import IProjectPhasesProps from "./IProjectPhasesProps";
import IProjectPhasesState from "./IProjectPhasesState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Project Phases
 */
export default class ProjectPhases extends BaseWebPart<IProjectPhasesProps, IProjectPhasesState> {
    static displayName: string;
    static defaultProps: Partial<IProjectPhasesProps>;
    private projectPropertiesList;
    private phaseChecklist;
    private projectElement;
    /**
     * Constructor
     *
     * @param {IProjectPhasesProps} props Props
     */
    constructor(props: IProjectPhasesProps);
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
    /**
     * Render phases
     */
    private renderPhases;
    /**
     * Render dialog
     */
    private renderChangePhaseDialog;
    /**
     * Get classnames for a phase
     *
     * @param {PhaseModel} phase The phase
     */
    private getPhaseClassList;
    /**
     * On change phase
     *
     * @param {PhaseModel} phase New phase
     */
    private onChangePhase;
    /**
     * On restart phase
     *
     * @param {PhaseModel} phase Phase to restart
     */
    private onRestartPhase;
    /**
     * On confirm phase dialog return callback
     *
     * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
     * @param {string} requestedPhase Requesed phase
     */
    private onChangePhaseDialogReturnCallback;
    /**
     * On hide dialog
     */
    private onHideDialog;
    /**
    * Update welcpome page
    *
    * @param {PhaseModel} phase Phase
    * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
    * @param {string} requestedPhase Requesed phase
    */
    private updateProjectProperties;
    /**
    * Get last gate status localized
     *
     * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
    */
    private getLastGateStatusLocalized;
    /**
    * Restart incremental phase.
    *
    * Archive phase checklist items and update iterations
    *
    * @param {IChecklistItem[]} items Checklist items
    */
    private restartIncrementalPhase;
    /**
     * Checks if phase is set
     */
    private isPhaseSet;
}
export { IProjectPhasesProps, IProjectPhasesState, };
