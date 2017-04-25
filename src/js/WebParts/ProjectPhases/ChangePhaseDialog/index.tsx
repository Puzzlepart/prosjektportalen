import * as React from "react";
import { sp, Logger, LogLevel } from "sp-pnp-js";
import { Dialog, DialogType } from "office-ui-fabric-react";
import { View } from "./Views";
import { Body } from "./Body";
import { Footer } from "./Footer";

export interface IChangePhaseDialogProps {
    phase: any;
    onConfirmPhaseChange: Function;
    hideHandler: Function;
    checkListItems: any[];
}
export interface IChangePhaseDialogState {
    currentIdx: number;
    isLoading: boolean;
    currentView: View;
}

export class ChangePhaseDialog extends React.Component<IChangePhaseDialogProps, IChangePhaseDialogState> {
    private phaseChecklist = sp.web.lists.getByTitle(__("Lists_PhaseChecklist_Title"));
    constructor() {
        super();
        this.state = {
            currentIdx: 0,
            isLoading: false,
            currentView: View.Initial,
        };
    }

    public componentDidMount() {
        if (this.props.checkListItems.length === 0) {
            this.setState({ currentView: View.Confirm });
        }
    }

    public render() {
        let [{ onConfirmPhaseChange, checkListItems }, { currentView, isLoading, currentIdx }] = [this.props, this.state];
        return (<Dialog
            isOpen={true}
            type={DialogType.largeHeader}
            onDismiss={this._closeDialog}
            title={this._getDialogTitle()}
            subText={this._getDialogSubText()}
            isBlocking={false}
        >
            <Body
                currentView={currentView}
                isLoading={isLoading}
                checkListItems={checkListItems}
                currentIdx={currentIdx}
                nextCheckPointAction={this.nextCheckPoint} />
            <Footer
                currentView={currentView}
                isLoading={isLoading}
                confirmHandler={onConfirmPhaseChange}
                closeDialog={this._closeDialog}
                changeView={this.changeView} />
        </Dialog>);
    }

    private _getDialogTitle = () => {
        return `${__("ProjectPhases_ChangePase")} (${this.props.phase.Name})`;
    }

    private _getDialogSubText = () => {
        return (this.state.currentView === View.Confirm) ? String.format(__("ProjectPhases_ConfirmChangePhase"), this.props.phase.Name) : "";
    }

    /**
     * Go to next checkpoint
     *
     * @param statusValue Status value
     * @param commentsValue Comments value
     */
    private nextCheckPoint = (statusValue: string, commentsValue: string): void => {
        let [{ checkListItems }, { currentIdx }] = [this.props, this.state];
        let item = checkListItems[currentIdx];
        this.setState({ isLoading: true }, () => {
            let updatedValues = { GtChecklistStatus: statusValue, GtComment: commentsValue };
            this.phaseChecklist.items.getById(item.Id).update(updatedValues).then(() => {
                checkListItems[currentIdx] = Object.assign(item, updatedValues);
                Logger.log({ message: "Updating checklist item", data: { id: item.Id, statusValue: statusValue, commentsValue: commentsValue }, level: LogLevel.Info });
                let newState: any = {
                    isLoading: false,
                    checkListItems: checkListItems,
                };
                if (currentIdx < (checkListItems.length - 1)) {
                    newState.currentIdx = (currentIdx + 1);
                } else {
                    newState.currentView = View.Summary;
                }
                this.setState(newState);
            });
        });
    }

    /**
     * Change view
     *
     * @param view New view
     */
    private changeView = (view: View): void => {
        this.setState({ currentView: view });
    }

    /**
     * Close dialog handler
     */
    private _closeDialog = (event) => {
        this.props.hideHandler(event);
    }
}
