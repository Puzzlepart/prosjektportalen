import * as React from "react";
import { sp, Logger, LogLevel } from "sp-pnp-js";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { View } from "./Views";
import { Body } from "./Body";
import { Footer } from "./Footer";
import IChangePhaseDialogProps from "./IChangePhaseDialogProps";
import IChangePhaseDialogState from "./IChangePhaseDialogState";

export default class ChangePhaseDialog extends React.Component<IChangePhaseDialogProps, IChangePhaseDialogState> {
    private phaseChecklist = sp.web.lists.getByTitle(__("Lists_PhaseChecklist_Title"));
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
        this.openCheckListItems = props.checkListItems.filter(item => item.GtChecklistStatus === __("Choice_GtChecklistStatus_Open"));
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        if (this.openCheckListItems.length === 0) {
            this.setState({ currentView: View.Confirm });
        }
    }

    /**
     * Render the component
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    private _render({ onConfirmPhaseChange }: IChangePhaseDialogProps, { currentView, isLoading, checkListItems, currentIdx }: IChangePhaseDialogState): JSX.Element {
        return (
            <Dialog
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
                    currentPhase={this.props.phase.Name}
                    checkListItems={checkListItems}
                    openCheckListItems={this.openCheckListItems}
                    currentIdx={currentIdx}
                    nextCheckPointAction={this.nextCheckPoint} />
                <Footer
                    currentView={currentView}
                    isLoading={isLoading}
                    confirmHandler={onConfirmPhaseChange}
                    closeDialog={this._closeDialog}
                    changeView={this.changeView} />
            </Dialog>
        );
    }

    /**
     * Get dialog title
     */
    private _getDialogTitle = () => {
        return `${__("ProjectPhases_ChangePase")} (${this.props.phase.Name})`;
    }

    /**
     * Get dialog subtext
     */
    private _getDialogSubText = () => {
        if (this.state.currentView === View.Confirm) {
            return String.format(__("ProjectPhases_ConfirmChangePhase"), this.props.phase.Name);
        }
        return "";
    }

    /**
     * Go to next checkpoint
     *
     * @param statusValue Status value
     * @param commentsValue Comments value
     */
    private nextCheckPoint = (statusValue: string, commentsValue: string): void => {
        let {
            checkListItems,
            currentIdx,
         } = this.state;

        let currentItem = this.openCheckListItems[currentIdx];
        this.setState({ isLoading: true }, () => {
            let updatedValues = { GtChecklistStatus: statusValue, GtComment: commentsValue };
            this.phaseChecklist.items.getById(currentItem.Id).update(updatedValues).then(() => {
                this.openCheckListItems[currentIdx] = Object.assign(currentItem, updatedValues);
                Logger.log({ message: "Updating checklist item", data: { id: currentItem.Id, statusValue: statusValue, commentsValue: commentsValue }, level: LogLevel.Info });
                let newState: Partial<IChangePhaseDialogState> = {
                    isLoading: false,
                    checkListItems: checkListItems.map(item => {
                        if (currentItem.ID === item.ID) {
                            return currentItem;
                        }
                        return item;
                    }),
                };
                if (currentIdx < (this.openCheckListItems.length - 1)) {
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
