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
//#region Imports
const Resources_1 = require("../../../Resources");
const React = require("react");
const sp_1 = require("@pnp/sp");
const Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
const Views_1 = require("./Views");
const Body_1 = require("./Body");
const Footer_1 = require("./Footer");
const ChangePhaseDialogResult_1 = require("./ChangePhaseDialogResult");
exports.ChangePhaseDialogResult = ChangePhaseDialogResult_1.default;
//#endregion
/**
 * Change phase dialog
 */
class ChangePhaseDialog extends React.Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.openChecklistItems = [];
        /**
         * Get dialog title
         */
        this._getDialogTitle = () => {
            let titleResKey;
            switch (this.props.newPhase.Type) {
                case "Gate":
                    titleResKey = "ProjectPhases_ChangeGate";
                    break;
                case "Default":
                    titleResKey = "ProjectPhases_ChangePhase";
                    break;
            }
            return `${Resources_1.default.getResource(titleResKey)} (${this.props.newPhase.Name})`;
        };
        /**
         * Get dialog subtext
         */
        this._getDialogSubText = () => {
            if (this.state.currentView === Views_1.View.Confirm) {
                let subTextResKey;
                switch (this.props.newPhase.Type) {
                    case "Gate":
                        subTextResKey = "ProjectPhases_ConfirmChangeGate";
                        break;
                    case "Default":
                        subTextResKey = "ProjectPhases_ConfirmChangePhase";
                        break;
                }
                return String.format(Resources_1.default.getResource(subTextResKey), this.props.newPhase.Name);
            }
            return "";
        };
        /**
         * Change view
         *
         * @param {View} newView New view
         */
        this._onChangeView = (newView) => {
            this.setState({ currentView: newView });
        };
        /**
         * Close dialog handler
         *
         * @param {any} _event Event
         * @param {boolean} reload Should the page be reloaded
         */
        this._onDismissDialog = (_event, reload = false) => {
            this.props.hideHandler(_event);
            if (reload) {
                document.location.href = _spPageContextInfo.serverRequestPath;
            }
        };
        this.state = {
            activePhase: props.activePhase,
            currentIdx: 0,
            isLoading: false,
            currentView: Views_1.View.Initial,
        };
        this.phaseChecklist = sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_PhaseChecklist_Title"));
        this.nextCheckPoint = this.nextCheckPoint.bind(this);
        if (props.activePhase) {
            const { items } = props.activePhase.Checklist;
            this.openChecklistItems = items.filter(item => item.GtChecklistStatus === Resources_1.default.getResource("Choice_GtChecklistStatus_Open"));
        }
    }
    componentDidMount() {
        if (this.openChecklistItems.length === 0) {
            const currentView = this.props.gateApproval ? Views_1.View.GateApproval : Views_1.View.Confirm;
            this.setState({ currentView });
        }
    }
    render() {
        const dlgContentBaseProps = {
            currentView: this.state.currentView,
            isLoading: this.state.isLoading,
            onCloseDialog: this._onDismissDialog,
            onChangePhaseDialogReturnCallback: this.props.onChangePhaseDialogReturnCallback,
            newPhase: this.props.newPhase,
            activePhase: this.state.activePhase,
            nextPhase: this.props.nextPhase,
        };
        return (React.createElement(Dialog_1.Dialog, { isOpen: true, title: this._getDialogTitle(), dialogContentProps: { type: Dialog_1.DialogType.largeHeader, subText: this._getDialogSubText() }, modalProps: { isDarkOverlay: true, isBlocking: false, className: "pp-changePhaseDialog" }, onDismiss: this._onDismissDialog },
            React.createElement(Body_1.Body, Object.assign({}, dlgContentBaseProps, { openCheckListItems: this.openChecklistItems, currentIdx: this.state.currentIdx, nextCheckPointAction: this.nextCheckPoint })),
            React.createElement(Footer_1.Footer, Object.assign({}, dlgContentBaseProps, { gateApproval: this.props.gateApproval, onChangeView: this._onChangeView }))));
    }
    /**
     * Go to next checkpoint
     *
     * @param {string} statusValue Status value
     * @param {string} commentsValue Comments value
     * @param {boolean} updateStatus Should status be updated
     */
    nextCheckPoint(statusValue, commentsValue, updateStatus = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ isLoading: true });
            const { activePhase, currentIdx } = this.state;
            let updatedValues = { GtComment: commentsValue };
            if (updateStatus) {
                updatedValues.GtChecklistStatus = statusValue;
            }
            yield this.phaseChecklist.items.getById(this.openChecklistItems[currentIdx].ID).update(updatedValues);
            let currentItem = Object.assign({}, this.openChecklistItems[currentIdx], updatedValues);
            activePhase.Checklist.items = activePhase.Checklist.items.map(item => {
                if (currentItem.ID === item.ID) {
                    return currentItem;
                }
                return item;
            });
            this.openChecklistItems[currentIdx] = currentItem;
            let newState = {
                isLoading: false,
                activePhase,
            };
            if (currentIdx < (this.openChecklistItems.length - 1)) {
                newState.currentIdx = (currentIdx + 1);
            }
            else {
                newState.currentView = Views_1.View.Summary;
            }
            this.setState(newState);
        });
    }
}
exports.default = ChangePhaseDialog;
