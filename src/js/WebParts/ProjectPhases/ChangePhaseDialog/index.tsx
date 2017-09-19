import Localization from "localization";
import * as React from "react";
import { sp, Logger, LogLevel } from "sp-pnp-js";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { View } from "./Views";
import { Body } from "./Body";
import { Footer } from "./Footer";
import IChangePhaseDialogProps from "./IChangePhaseDialogProps";
import IChangePhaseDialogState from "./IChangePhaseDialogState";

/**
 * Change phase dialog
 */
export default class ChangePhaseDialog extends React.Component<IChangePhaseDialogProps, IChangePhaseDialogState> {
    private phaseChecklist = sp.web.lists.getByTitle(Localization.getResource("Lists_PhaseChecklist_Title"));
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
        this.openCheckListItems = props.checkListItems.filter(item => item.GtChecklistStatus === Localization.getResource("Choice_GtChecklistStatus_Open"));
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
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {IChangePhaseDialogProps} param0 Props
     * @param {IChangePhaseDialogState} param1 State
     */
    private _render({ onConfirmPhaseChange, phase }: IChangePhaseDialogProps, { currentView, isLoading, checkListItems, currentIdx }: IChangePhaseDialogState): JSX.Element {
        return (
            <Dialog
                isOpen={true}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    subText: this._getDialogSubText(),
                }}
                modalProps={{
                    isDarkOverlay: true,
                    isBlocking: false,
                    className: "pp-changePhaseDialog",
                }}
                onDismiss={this._onDismissDialog}
                title={this._getDialogTitle()} >
                <Body
                    currentView={currentView}
                    isLoading={isLoading}
                    phase={phase}
                    checkListItems={checkListItems}
                    openCheckListItems={this.openCheckListItems}
                    currentIdx={currentIdx}
                    nextCheckPointAction={this.nextCheckPoint} />
                <Footer
                    currentView={currentView}
                    isLoading={isLoading}
                    onConfirmPhaseChange={onConfirmPhaseChange}
                    onCloseDialog={this._onDismissDialog}
                    changeView={this.changeView} />
            </Dialog>
        );
    }

    /**
     * Get dialog title
     */
    private _getDialogTitle = () => {
        return `${Localization.getResource("ProjectPhases_ChangePase")} (${this.props.phase.Name})`;
    }

    /**
     * Get dialog subtext
     */
    private _getDialogSubText = () => {
        if (this.state.currentView === View.Confirm) {
            return String.format(Localization.getResource("ProjectPhases_ConfirmChangePhase"), this.props.phase.Name);
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
    private nextCheckPoint = (statusValue: string, commentsValue: string, updateStatus = true): void => {
        let {
            checkListItems,
            currentIdx,
         } = this.state;

        let currentItem = this.openCheckListItems[currentIdx];
        this.setState({ isLoading: true }, () => {
            let updatedValues: { [key: string]: string } = {
                GtComment: commentsValue,
            };
            if (updateStatus) {
                updatedValues.GtChecklistStatus = statusValue;
            }
            this.phaseChecklist.items.getById(currentItem.Id).update(updatedValues)
                .then(() => {
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
     * @param {View} view New view
     */
    private changeView = (view: View): void => {
        this.setState({ currentView: view });
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
            document.location.href = document.location.href;
        }
    }
}
