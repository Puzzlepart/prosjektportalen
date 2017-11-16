//#region Imports
import RESOURCE_MANAGER from "../../@localization";
import * as React from "react";
import pnp, { List } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import ProjectPhase, { IProjectPhaseProps } from "./ProjectPhase";
import ChangePhaseDialog, { IChangePhaseDialogProps, ChangePhaseDialogResult } from "./ChangePhaseDialog";
import * as Project from "../../Project";
import * as Settings from "../../Settings";
import { fetchData, PhaseModel, IChecklistItem } from "./ProjectPhasesData";
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

    private phaseChecklist: List;

    /**
     * Constructor
     *
     * @param {IProjectPhasesProps} props Props
     */
    constructor(props: IProjectPhasesProps) {
        super(props, { isLoading: true });
        this._onChangePhase = this._onChangePhase.bind(this);
        this._onRestartPhase = this._onRestartPhase.bind(this);
        this._onChangePhaseDialogReturnCallback = this._onChangePhaseDialogReturnCallback.bind(this);
        this._onHideDialog = this._onHideDialog.bind(this);
        this.phaseChecklist = pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title"));
    }

    public async componentDidMount() {
        try {
            const [data, forcedOrder] = await Promise.all([
                fetchData(this.phaseChecklist),
                Settings.GetSetting("PROJECTPHASES_FORCED_ORDER", true),
            ]);
            this.setState({
                data,
                forcedOrder: forcedOrder === "on",
                isLoading: false,
            });
        } catch (err) {
            // catch err
        }
    }

    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} label={RESOURCE_MANAGER.getResource("ProjectPhases_LoadingText")} />;
        }
        return (
            <div>
                {this.renderPhases()}
                {this.renderChangePhaseDialog()}
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
        const { data, forcedOrder } = this.state;
        const { activePhase, phases } = data;
        return (
            <ul>
                {phases.map((phase, index) => {
                    const classList = this.getPhaseClassList(phase);
                    let projectPhaseProps: IProjectPhaseProps = {
                        phase,
                        classList,
                        onRestartPhase: this._onRestartPhase,
                        onChangePhase: this._onChangePhase,
                        changePhaseEnabled: !Array.contains(classList, "selected"),
                        restartPhaseEnabled: false,
                    };
                    if (forcedOrder) {
                        projectPhaseProps.changePhaseEnabled = activePhase ? phase.Index === (activePhase.Index + 1) : index === 0;
                    }
                    if (activePhase) {
                        projectPhaseProps.restartPhaseEnabled = activePhase.Index > phase.Index && phase.IsIncremental;
                    }
                    return <ProjectPhase key={`ProjectPhase_${index}`} { ...projectPhaseProps} />;
                })}
            </ul>
        );
    }

    /**
     * Render dialog
     */
    private renderChangePhaseDialog(): JSX.Element {
        const { data, newPhase, restartPhase } = this.state;
        const { activePhase } = data;
        if (!newPhase) {
            return null;
        }
        let changePhaseDialogProps: IChangePhaseDialogProps = {
            newPhase,
            activePhase: activePhase,
            gateApproval: false,
            onChangePhaseDialogReturnCallback: this._onChangePhaseDialogReturnCallback,
            hideHandler: this._onHideDialog,
        };

        if (activePhase) {
            changePhaseDialogProps.gateApproval = (activePhase.Type === "Gate" && (newPhase.Index === (activePhase.Index + 1)) || !!restartPhase);
        }

        return <ChangePhaseDialog { ...changePhaseDialogProps } />;
    }

    /**
     * Get classnames for a phase
     *
     * @param {PhaseModel} phase The phase
     */
    private getPhaseClassList(phase: PhaseModel): string[] {
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
        ].filter(className => className);
    }

    /**
     * On change phase
     *
     * @param {PhaseModel} phase New phase
     */
    private _onChangePhase(phase: PhaseModel) {
        this.setState({ newPhase: phase });
    }

    /**
     * On restart phase
     *
     * @param {PhaseModel} phase Phase to restart
     */
    private _onRestartPhase(phase: PhaseModel) {
        this.setState({
            newPhase: phase,
            restartPhase: phase.Checklist.items,
        });
    }

    /**
     * On confirm phase dialog return callback
     *
     * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
     */
    private async _onChangePhaseDialogReturnCallback(changePhaseDialogResult: ChangePhaseDialogResult) {
        let { data, newPhase, restartPhase } = this.state;
        switch (changePhaseDialogResult) {
            case ChangePhaseDialogResult.Rejected: {
                const prevPhaseIndex = data.activePhase.Index - 1;
                [newPhase] = data.phases.filter(p => p.Index === prevPhaseIndex);
                await Project.ChangeProjectPhase(newPhase, false);
            }
                break;
            default: {
                await Project.ChangeProjectPhase(newPhase, false);
                if (restartPhase) {
                    await this.archivePhaseChecklistItems(restartPhase);
                }
            }
        }
        await this.updateWelcomePage(newPhase, changePhaseDialogResult);
    }

    /**
     * On hide dialog
     */
    private _onHideDialog() {
        this.setState({ newPhase: null, restartPhase: null });
    }

    /**
    * Update welcpome page
    *
    * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
    */
    private async updateWelcomePage(phase: PhaseModel, changePhaseDialogResult: ChangePhaseDialogResult) {
        const projectProcessState = phase.Type === "Gate"
            ? RESOURCE_MANAGER.getResource("Choice_GtProjectProcessState_AtGate")
            : RESOURCE_MANAGER.getResource("Choice_GtProjectProcessState_InPhase");
        const lastGateStatus = this.getLastGateStatusLocalized(changePhaseDialogResult);
        let valuesToUpdate: { [key: string]: string } = {
            GtProjectProcessState: projectProcessState,
        };
        if (lastGateStatus) {
            valuesToUpdate.GtLastGateStatus = lastGateStatus;
        }
        await pnp.sp.web.lists.getById(_spPageContextInfo.pageListId).items.getById(_spPageContextInfo.pageItemId).update(valuesToUpdate);
    }

    /**
    * Get last gate status localized
     *
     * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
    */
    private getLastGateStatusLocalized(changePhaseDialogResult: ChangePhaseDialogResult): string {
        switch (changePhaseDialogResult) {
            case ChangePhaseDialogResult.Approved: return RESOURCE_MANAGER.getResource("Choice_GtLastGateStatus_Approved");
            case ChangePhaseDialogResult.ProvisionallyApproved: return RESOURCE_MANAGER.getResource("Choice_GtLastGateStatus_ProvisionallyApproved");
            case ChangePhaseDialogResult.Rejected: return RESOURCE_MANAGER.getResource("Choice_GtLastGateStatus_Rejected");
            default: return null;
        }
    }

    /**
    * Archive phase checklist items
    *
    * @param {IChecklistItem[]} items Checklist items
    */
    private async archivePhaseChecklistItems(items: IChecklistItem[]) {
        let listItemEntityTypeFullName = await this.phaseChecklist.getListItemEntityTypeFullName();
        for (let i = 0; i < items.length; i++) {
            const { ID, Title, GtProjectPhase } = items[i];
            await this.phaseChecklist.items.getById(ID).update({ GtChecklistStatus: RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Archived") });
            await this.phaseChecklist.items.add({ Title, GtProjectPhase, GtChecklistStatus: RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Open") }, listItemEntityTypeFullName);
        }
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
