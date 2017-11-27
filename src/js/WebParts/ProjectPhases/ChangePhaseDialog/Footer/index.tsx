//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../../../@localization";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import ChangePhaseDialogResult from "../ChangePhaseDialogResult";
import { View } from "../Views";
import IFooterProps from "./IFooterProps";
//#endregion

/**
 * Footer
 */
export const Footer = (props: IFooterProps) => {
    let actions = [];

    switch (props.currentView) {
        case View.Initial: {
            actions.push({
                text: RESOURCE_MANAGER.getResource("String_Skip"),
                disabled: props.isLoading,
                onClick: () => {
                    props.onChangeView(props.gateApproval ? View.GateApproval : View.Confirm);
                },
            });
        }
            break;
        case View.Confirm: {
            if (props.activePhase && props.activePhase.IsIncremental) {
                actions.push(
                    {
                        text: props.activePhase.Name,
                        disabled: props.isLoading,
                        onClick: async () => {
                            props.onChangeView(View.ChangingPhase);
                            await props.onChangePhaseDialogReturnCallback(ChangePhaseDialogResult.Initial, props.activePhase.Name);
                            props.onCloseDialog(null, true);
                        },
                    },
                    {
                        text: props.nextPhase.Name,
                        disabled: props.isLoading,
                        onClick: async () => {
                            props.onChangeView(View.ChangingPhase);
                            await props.onChangePhaseDialogReturnCallback(ChangePhaseDialogResult.Initial, props.nextPhase.Name);
                            props.onCloseDialog(null, true);
                        },
                    },
                );
            } else {
                actions.push({
                    text: RESOURCE_MANAGER.getResource("String_Yes"),
                    disabled: props.isLoading,
                    onClick: async () => {
                        props.onChangeView(View.ChangingPhase);
                        await props.onChangePhaseDialogReturnCallback(ChangePhaseDialogResult.Initial);
                        props.onCloseDialog(null, true);
                    },
                });
            }
        }
            break;
        case View.Summary: {
            actions.push({
                text: RESOURCE_MANAGER.getResource("String_MoveOn"),
                disabled: props.isLoading,
                onClick: () => {
                    props.onChangeView(props.gateApproval ? View.GateApproval : View.Confirm);
                },
            });
        }
            break;
    }

    return (
        <DialogFooter>
            {actions.map((buttonProps, index) => {
                return <PrimaryButton key={`FooterAction_${index}`} { ...buttonProps } />;
            })}
            <DefaultButton
                text={RESOURCE_MANAGER.getResource("String_Close")}
                disabled={props.isLoading}
                onClick={props.onCloseDialog} />
        </DialogFooter>
    );
};
