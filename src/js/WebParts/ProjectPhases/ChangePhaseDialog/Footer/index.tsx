import * as React from "react";
import RESOURCE_MANAGER from "../../../../@localization";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import ChangePhaseDialogResult from "../ChangePhaseDialogResult";
import { View } from "../Views";
import IFooterProps from "./IFooterProps";

/**
 * Footer
 */
export const Footer = ({ currentView, isLoading, gateApproval, onChangePhaseDialogReturnCallback, onCloseDialog, onChangeView }: IFooterProps) => {
    let actions = [];

    switch (currentView) {
        case View.Initial: {
            actions.push({
                text: RESOURCE_MANAGER.getResource("String_Skip"),
                disabled: isLoading,
                onClick: () => {
                    onChangeView(gateApproval ? View.GateApproval : View.Confirm);
                },
            });
        }
            break;
        case View.Confirm: {
            actions.push({
                text: RESOURCE_MANAGER.getResource("String_Yes"),
                disabled: isLoading,
                onClick: async () => {
                    onChangeView(View.ChangingPhase);
                    await onChangePhaseDialogReturnCallback(ChangePhaseDialogResult.Approved);
                    onCloseDialog(null, true);
                },
            });
        }
            break;
        case View.Summary: {
            actions.push({
                text: RESOURCE_MANAGER.getResource("String_MoveOn"),
                disabled: isLoading,
                onClick: () => {
                    onChangeView(gateApproval ? View.GateApproval : View.Confirm);
                },
            });
        }
            break;
    }

    return (
        <DialogFooter>
            {actions.map((buttonProps, index) => <PrimaryButton key={`FooterAction_${index}`} { ...buttonProps } />)}
            <DefaultButton
                text={RESOURCE_MANAGER.getResource("String_Close")}
                disabled={isLoading}
                onClick={onCloseDialog} />
        </DialogFooter>
    );
};
