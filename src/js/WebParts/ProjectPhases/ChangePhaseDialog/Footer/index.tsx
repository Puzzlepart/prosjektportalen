import * as React from "react";
import RESOURCE_MANAGER from "localization";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import {
    PrimaryButton,
    DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import { View } from "../Views";
import IFooterProps from "./IFooterProps";

/**
 * Footer
 */
export const Footer = ({ currentView, isLoading, onConfirmPhaseChange, onCloseDialog, changeView }: IFooterProps) => {
    return (
        <DialogFooter>
            {currentView === View.Initial && (
                <PrimaryButton
                    disabled={isLoading}
                    onClick={e => changeView(View.Confirm)}>{RESOURCE_MANAGER.getResource("String_Skip")}</PrimaryButton>
            )}
            {currentView === View.Confirm && (
                <PrimaryButton
                    disabled={isLoading}
                    onClick={e => {
                        changeView(View.ChangingPhase);
                        onConfirmPhaseChange().then(() => onCloseDialog(null, true));
                    }}>{RESOURCE_MANAGER.getResource("String_Yes")}</PrimaryButton>
            )}
            {currentView === View.Summary && (
                <PrimaryButton
                    disabled={isLoading}
                    onClick={e => changeView(View.Confirm)}>{RESOURCE_MANAGER.getResource("String_MoveOn")}</PrimaryButton>
            )}
            <DefaultButton
                disabled={isLoading}
                onClick={onCloseDialog}>{RESOURCE_MANAGER.getResource("String_Close")}</DefaultButton>
        </DialogFooter>
    );
};
