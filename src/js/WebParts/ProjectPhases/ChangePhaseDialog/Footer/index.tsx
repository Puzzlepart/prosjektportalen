import * as React from "react";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import {
    PrimaryButton,
    DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import { View } from "../Views";

/**
 * Footer
 */
export const Footer = ({ currentView, isLoading, confirmHandler, closeDialog, changeView }) => {
    return (
        <DialogFooter>
            {currentView === View.Initial && (
                <PrimaryButton
                    disabled={isLoading}
                    onClick={e => changeView(View.Confirm)}>{__("String_Skip")}</PrimaryButton>
            )}
            {currentView === View.Confirm && (
                <PrimaryButton
                    disabled={isLoading}
                    onClick={e => confirmHandler()}>{__("String_Yes")}</PrimaryButton>
            )}
            {currentView === View.Summary && (
                <PrimaryButton
                    disabled={isLoading}
                    onClick={e => changeView(View.Confirm)}>{__("String_MoveOn")}</PrimaryButton>
            )}
            <DefaultButton
                disabled={isLoading}
                onClick={closeDialog}>{__("String_Close")}</DefaultButton>
        </DialogFooter>
    );
};
