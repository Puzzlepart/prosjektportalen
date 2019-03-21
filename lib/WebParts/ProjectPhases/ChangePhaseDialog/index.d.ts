import * as React from "react";
import IChangePhaseDialogProps from "./IChangePhaseDialogProps";
import IChangePhaseDialogState from "./IChangePhaseDialogState";
import ChangePhaseDialogResult from "./ChangePhaseDialogResult";
/**
 * Change phase dialog
 */
export default class ChangePhaseDialog extends React.Component<IChangePhaseDialogProps, IChangePhaseDialogState> {
    private phaseChecklist;
    private openChecklistItems;
    /**
     * Constructor
     */
    constructor(props: IChangePhaseDialogProps);
    componentDidMount(): void;
    render(): JSX.Element;
    /**
     * Get dialog title
     */
    private _getDialogTitle;
    /**
     * Get dialog subtext
     */
    private _getDialogSubText;
    /**
     * Go to next checkpoint
     *
     * @param {string} statusValue Status value
     * @param {string} commentsValue Comments value
     * @param {boolean} updateStatus Should status be updated
     */
    private nextCheckPoint;
    /**
     * Change view
     *
     * @param {View} newView New view
     */
    private _onChangeView;
    /**
     * Close dialog handler
     *
     * @param {any} _event Event
     * @param {boolean} reload Should the page be reloaded
     */
    private _onDismissDialog;
}
export { IChangePhaseDialogProps, ChangePhaseDialogResult };
