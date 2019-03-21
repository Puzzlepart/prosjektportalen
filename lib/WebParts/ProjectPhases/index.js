"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const React = require("react");
const sp_1 = require("@pnp/sp");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const ProjectPhase_1 = require("./ProjectPhase");
const ChangePhaseDialog_1 = require("./ChangePhaseDialog");
const Project = require("../../Project");
const Settings = require("../../Settings");
const ProjectPhasesData_1 = require("./ProjectPhasesData");
const Util_1 = require("../../Util");
const IProjectPhasesProps_1 = require("./IProjectPhasesProps");
const _BaseWebPart_1 = require("../@BaseWebPart");
/**
 * Project Phases
 */
class ProjectPhases extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IProjectPhasesProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true });
        this.onChangePhase = this.onChangePhase.bind(this);
        this.onRestartPhase = this.onRestartPhase.bind(this);
        this.onChangePhaseDialogReturnCallback = this.onChangePhaseDialogReturnCallback.bind(this);
        this.onHideDialog = this.onHideDialog.bind(this);
        this.projectPropertiesList = sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"));
        this.phaseChecklist = sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_PhaseChecklist_Title"));
        this.projectElement = this.projectPropertiesList.items.getById(1);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [data, forcedOrder] = yield Promise.all([
                    ProjectPhasesData_1.fetchData(this.phaseChecklist, this.props.gatesEnabled),
                    Settings.GetSetting("PROJECTPHASES_FORCED_ORDER", true),
                ]);
                this.setState({
                    data,
                    forcedOrder: forcedOrder === "on",
                    isLoading: false,
                });
            }
            catch (err) {
                this.setState({
                    isLoading: false,
                    error: err,
                });
            }
        });
    }
    render() {
        if (this.state.isLoading) {
            return React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: Resources_1.default.getResource("ProjectPhases_LoadingText") });
        }
        if (this.state.error) {
            return (React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error },
                React.createElement("div", { dangerouslySetInnerHTML: { __html: String.format(Resources_1.default.getResource("ProjectInfo_MissingProperties"), `../Lists/Properties/NewForm.aspx?Source=${encodeURIComponent(window.location.href)}`) } })));
        }
        return (React.createElement("div", null,
            this.renderPhases(),
            this.renderChangePhaseDialog(),
            React.createElement("div", { hidden: this.isPhaseSet() },
                React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.info }, Resources_1.default.getResource("ProjectPhases_PhaseNotSetText")))));
    }
    /**
     * Render phases
     */
    renderPhases() {
        const { data, forcedOrder } = this.state;
        const { activePhase, phaseIterations, requestedPhase, phases } = data;
        return (React.createElement("ul", null, phases.map((phase, index) => {
            const classList = this.getPhaseClassList(phase);
            let projectPhaseProps = {
                phase,
                phaseIterations,
                requestedPhase,
                classList,
                onRestartPhaseHandler: this.onRestartPhase,
                onChangePhaseHandler: this.onChangePhase,
                changePhaseEnabled: !Array.contains(classList, "selected"),
                restartPhaseEnabled: false,
            };
            if (forcedOrder) {
                projectPhaseProps.changePhaseEnabled = activePhase ? phase.Index === (activePhase.Index + 1) : index === 0;
            }
            if (activePhase) {
                projectPhaseProps.restartPhaseEnabled = activePhase.Index - 1 === phase.Index && phase.IsIncremental;
            }
            return React.createElement(ProjectPhase_1.default, Object.assign({ key: `ProjectPhase_${index}` }, projectPhaseProps));
        })));
    }
    /**
     * Render dialog
     */
    renderChangePhaseDialog() {
        const { data, newPhase, checklistItemsToArchive } = this.state;
        const { activePhase } = data;
        if (!newPhase) {
            return null;
        }
        const nextPhaseIndex = newPhase.Index + 1;
        const [nextPhase] = data.phases.filter(p => p.Index === nextPhaseIndex);
        let changePhaseDialogProps = {
            newPhase,
            activePhase,
            nextPhase,
            gateApproval: false,
            onChangePhaseDialogReturnCallback: this.onChangePhaseDialogReturnCallback,
            hideHandler: this.onHideDialog,
        };
        if (activePhase) {
            changePhaseDialogProps.gateApproval = (activePhase.Type === "Gate" && (newPhase.Index === (activePhase.Index + 1)) || !!checklistItemsToArchive);
        }
        return React.createElement(ChangePhaseDialog_1.default, Object.assign({}, changePhaseDialogProps));
    }
    /**
     * Get classnames for a phase
     *
     * @param {PhaseModel} phase The phase
     */
    getPhaseClassList(phase) {
        const { data } = this.state;
        const isFirst = phase.Index === 0;
        const isLast = (phase.Index === (data.phases.length - 1));
        const isSelected = (data.activePhase && (phase.Name === data.activePhase.Name));
        return [`level-${Util_1.cleanString(phase.PhaseLevel)}`, `type-${Util_1.cleanString(phase.Type)}`, isFirst && "first-phase", isLast && "last-phase", isSelected && "selected"].filter(cn => cn);
    }
    /**
     * On change phase
     *
     * @param {PhaseModel} phase New phase
     */
    onChangePhase(phase) {
        this.setState({ newPhase: phase });
    }
    /**
     * On restart phase
     *
     * @param {PhaseModel} phase Phase to restart
     */
    onRestartPhase(phase) {
        const { activePhase } = this.state.data;
        this.setState({
            newPhase: phase,
            checklistItemsToArchive: [...phase.Checklist.items, ...activePhase.Checklist.items],
        });
    }
    /**
     * On confirm phase dialog return callback
     *
     * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
     * @param {string} requestedPhase Requesed phase
     */
    onChangePhaseDialogReturnCallback(changePhaseDialogResult, requestedPhase) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data, newPhase, checklistItemsToArchive } = this.state;
            try {
                switch (changePhaseDialogResult) {
                    case ChangePhaseDialog_1.ChangePhaseDialogResult.Rejected:
                        {
                            const prevPhaseIndex = data.activePhase.Index - 1;
                            [newPhase] = data.phases.filter(p => p.Index === prevPhaseIndex);
                            yield Project.ChangeProjectPhase(newPhase, false);
                        }
                        break;
                    default: {
                        yield Project.ChangeProjectPhase(newPhase, false);
                        if (checklistItemsToArchive) {
                            yield this.restartIncrementalPhase(checklistItemsToArchive);
                        }
                    }
                }
                yield this.updateProjectProperties(newPhase, changePhaseDialogResult, requestedPhase);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * On hide dialog
     */
    onHideDialog() {
        this.setState({ newPhase: null, checklistItemsToArchive: null });
    }
    /**
    * Update welcpome page
    *
    * @param {PhaseModel} phase Phase
    * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
    * @param {string} requestedPhase Requesed phase
    */
    updateProjectProperties(phase, changePhaseDialogResult, requestedPhase = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const projectProcessState = phase.Type === "Gate"
                ? Resources_1.default.getResource("Choice_GtProjectProcessState_AtGate")
                : Resources_1.default.getResource("Choice_GtProjectProcessState_InPhase");
            const lastGateStatus = this.getLastGateStatusLocalized(changePhaseDialogResult);
            let valuesToUpdate = {
                GtProjectProcessState: projectProcessState,
            };
            if (lastGateStatus) {
                valuesToUpdate.GtLastGateStatus = lastGateStatus;
            }
            valuesToUpdate.GtRequestedPhase = requestedPhase;
            yield this.projectElement.update(valuesToUpdate);
        });
    }
    /**
    * Get last gate status localized
     *
     * @param {ChangePhaseDialogResult} changePhaseDialogResult Result from dialog
    */
    getLastGateStatusLocalized(changePhaseDialogResult) {
        switch (changePhaseDialogResult) {
            case ChangePhaseDialog_1.ChangePhaseDialogResult.Approved: return Resources_1.default.getResource("Choice_GtLastGateStatus_Approved");
            case ChangePhaseDialog_1.ChangePhaseDialogResult.ProvisionallyApproved: return Resources_1.default.getResource("Choice_GtLastGateStatus_ProvisionallyApproved");
            case ChangePhaseDialog_1.ChangePhaseDialogResult.Rejected: return Resources_1.default.getResource("Choice_GtLastGateStatus_Rejected");
            default: return null;
        }
    }
    /**
    * Restart incremental phase.
    *
    * Archive phase checklist items and update iterations
    *
    * @param {IChecklistItem[]} items Checklist items
    */
    restartIncrementalPhase(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusArchived = Resources_1.default.getResource("Choice_GtChecklistStatus_Archived");
            const statusOpen = Resources_1.default.getResource("Choice_GtChecklistStatus_Open");
            const listItemEntityTypeFullName = yield this.phaseChecklist.getListItemEntityTypeFullName();
            for (let i = 0; i < items.length; i++) {
                const { ID, Title, GtProjectPhase } = items[i];
                yield this.phaseChecklist.items.getById(ID).update({ GtChecklistStatus: statusArchived });
                yield this.phaseChecklist.items.add({ Title, GtProjectPhase, GtChecklistStatus: statusOpen }, listItemEntityTypeFullName);
            }
            const phaseIterations = this.state.data.phaseIterations || 1;
            yield this.projectElement.update({ GtPhaseIterations: phaseIterations + 1 });
        });
    }
    /**
     * Checks if phase is set
     */
    isPhaseSet() {
        const { data } = this.state;
        return data.activePhase && data.activePhase.Name && data.activePhase.Name !== "";
    }
}
ProjectPhases.displayName = "ProjectPhases";
ProjectPhases.defaultProps = IProjectPhasesProps_1.ProjectPhasesDefaultProps;
exports.default = ProjectPhases;
