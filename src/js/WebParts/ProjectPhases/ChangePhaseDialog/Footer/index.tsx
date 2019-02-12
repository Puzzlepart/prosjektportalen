//#region Imports
import * as React from "react";
import __ from "../../../../Resources";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import ChangePhaseDialogResult from "../ChangePhaseDialogResult";
import { View } from "../Views";
import IFooterProps from "./IFooterProps";
//#endregion

/**
 * Footer
 */
export const Footer = ({ isLoading, currentView, gateApproval, activePhase, nextPhase, onChangeView, onChangePhaseDialogReturnCallback, onCloseDialog }: IFooterProps) => {
    let actions = [];

    switch (currentView) {
        case View.Initial: {
            actions.push({
                text: __.getResource("String_Skip"),
                disabled: isLoading,
                onClick: () => {
                    onChangeView(gateApproval ? View.GateApproval : View.Confirm);
                },
            });
        }
            break;
        case View.Confirm: {
            if (activePhase && activePhase.IsIncremental) {
                actions.push(
                    {
                        text: activePhase.Name,
                        disabled: isLoading,
                        onClick: async () => {
                            onChangeView(View.ChangingPhase);
                            try {
                                await onChangePhaseDialogReturnCallback(ChangePhaseDialogResult.Initial, activePhase.Name);
                                onCloseDialog(null, true);
                            } catch (error) {
                                onChangeView(View.ErrorInformation);
                            }
                        },
                    },
                    {
                        text: nextPhase.Name,
                        disabled: isLoading,
                        onClick: async () => {
                            onChangeView(View.ChangingPhase);
                            try {
                                await onChangePhaseDialogReturnCallback(ChangePhaseDialogResult.Initial, nextPhase.Name);
                                onCloseDialog(null, true);
                            } catch (error) {
                                onChangeView(View.ErrorInformation);
                            }
                        },
                    },
                );
            } else {
                actions.push({
                    text: __.getResource("String_Yes"),
                    disabled: isLoading,
                    onClick: async () => {
                        onChangeView(View.ChangingPhase);
                        try {
                            await onChangePhaseDialogReturnCallback(ChangePhaseDialogResult.Initial);
                            onCloseDialog(null, true);
                        } catch (error) {
                            onChangeView(View.ErrorInformation);
                        }
                    },
                });
            }
        }
            break;
        case View.Summary: {
            actions.push({
                text: __.getResource("String_MoveOn"),
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
            {actions.map((buttonProps, index) => {
                return <PrimaryButton key={`FooterAction_${index}`} {...buttonProps} />;
            })}
            <DefaultButton
                text={__.getResource("String_Close")}
                disabled={isLoading}
                onClick={onCloseDialog} />
        </DialogFooter>
    );
};
