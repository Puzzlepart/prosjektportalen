//#region Imports
import RESOURCE_MANAGER from "../../../@localization";
import * as React from "react";
import pnp from "sp-pnp-js";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { View } from "./Views";
import { Body } from "./Body";
import { Footer } from "./Footer";
import IChangePhaseDialogProps from "./IChangePhaseDialogProps";
import IChangePhaseDialogState from "./IChangePhaseDialogState";
import ChangePhaseDialogResult from "./ChangePhaseDialogResult";
//#endregion

/**
 * Change phase dialog
 */
export default class ChangePhaseDialog extends React.Component<IChangePhaseDialogProps, IChangePhaseDialogState> {
    private phaseChecklist = pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title"));
    private openCheckListItems;

    /**
     * Constructor
     */
    constructor(props: IChangePhaseDialogProps) {
        super(props);
        this.state = {
            currentIdx: 0,
            isLoading: false,
            currentView: View.Initial,
            checkListItems: props.checkListItems,
        };
        this.openCheckListItems = props.checkListItems.filter(item => item.GtChecklistStatus === RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Open"));
        this.nextCheckPoint = this.nextCheckPoint.bind(this);
    }

    public componentDidMount(): void {
        if (this.openCheckListItems.length === 0) {
            const currentView = this.props.gateApproval ? View.GateApproval : View.Confirm;
            this.setState({ currentView });
        }
    }

    public render() {
        const baseProps = {
            currentView: this.state.currentView,
            isLoading: this.state.isLoading,
            onCloseDialog: this._onDismissDialog,
            onChangePhaseDialogReturnCallback: this.props.onChangePhaseDialogReturnCallback,
        };
        return (
            <Dialog
                isOpen={true}
                title={this._getDialogTitle()}
                dialogContentProps={{ type: DialogType.largeHeader, subText: this._getDialogSubText() }}
                modalProps={{ isDarkOverlay: true, isBlocking: false, className: "pp-changePhaseDialog" }}
                onDismiss={this._onDismissDialog}>
                <Body
                    { ...baseProps }
                    phase={this.props.newPhase}
                    checkListItems={this.state.checkListItems}
                    openCheckListItems={this.openCheckListItems}
                    currentIdx={this.state.currentIdx}
                    nextCheckPointAction={this.nextCheckPoint} />
                <Footer
                    { ...baseProps }
                    gateApproval={this.props.gateApproval}
                    onChangeView={this._onChangeView} />
            </Dialog>
        );
    }

    /**
     * Get dialog title
     */
    private _getDialogTitle = () => {
        let titleResKey;
        switch (this.props.newPhase.Type) {
            case "Gate": titleResKey = "ProjectPhases_ChangeGate";
                break;
            case "Default": titleResKey = "ProjectPhases_ChangePhase";
                break;
        }
        return `${RESOURCE_MANAGER.getResource(titleResKey)} (${this.props.newPhase.Name})`;
    }

    /**
     * Get dialog subtext
     */
    private _getDialogSubText = () => {
        if (this.state.currentView === View.Confirm) {
            let subTextResKey;
            switch (this.props.newPhase.Type) {
                case "Gate": subTextResKey = "ProjectPhases_ConfirmChangeGate";
                    break;
                case "Default": subTextResKey = "ProjectPhases_ConfirmChangePhase";
                    break;
            }
            return String.format(RESOURCE_MANAGER.getResource(subTextResKey), this.props.newPhase.Name);
        }
        return "";
    }

    /**
     * Go to next checkpoint
     *
     * @param {string} statusValue Status value
     * @param {string} commentsValue Comments value
     * @param {boolean} updateStatus Should status be updated
     */
    private async nextCheckPoint(statusValue: string, commentsValue: string, updateStatus = true): Promise<void> {
        this.setState({ isLoading: true });
        const { checkListItems, currentIdx } = this.state;
        const currentItem = this.openCheckListItems[currentIdx];
        let updatedValues: { [key: string]: string } = {
            GtComment: commentsValue,
        };
        if (updateStatus) {
            updatedValues.GtChecklistStatus = statusValue;
        }
        await this.phaseChecklist.items.getById(currentItem.Id).update(updatedValues);
        this.openCheckListItems[currentIdx] = { ...currentItem, ...updatedValues };
        let newState: Partial<IChangePhaseDialogState> = {
            isLoading: false,
            checkListItems: checkListItems.map(item => currentItem.ID === item.ID ? currentItem : item),
        };
        if (currentIdx < (this.openCheckListItems.length - 1)) {
            newState.currentIdx = (currentIdx + 1);
        } else {
            newState.currentView = View.Summary;
        }
        this.setState(newState);
    }

    /**
     * Change view
     *
     * @param {View} newView New view
     */
    private _onChangeView = (newView: View): void => {
        this.setState({ currentView: newView });
    }

    /**
     * Close dialog handler
     *
     * @param {any} e Event
     * @param {boolean} reload Should the page be reloaded
     */
    private _onDismissDialog = (e, reload = false) => {
        this.props.hideHandler(e);
        if (reload) {
            document.location.href = _spPageContextInfo.serverRequestPath;
        }
    }
}

export { IChangePhaseDialogProps, ChangePhaseDialogResult };
