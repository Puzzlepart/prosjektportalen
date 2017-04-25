import * as React from "react";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { View } from "./Views";

/**
 * Footer
 */
export const Footer = ({ currentView, isLoading, confirmHandler, closeDialog, changeView }) => {
    return (<DialogFooter>
        {currentView === View.Initial && (<Button disabled={isLoading} buttonType={ButtonType.primary} onClick={e => changeView(View.Confirm)}>{__("String_Skip")}</Button>)}
        {currentView === View.Confirm && (<Button disabled={isLoading} buttonType={ButtonType.primary} onClick={e => confirmHandler()}>{__("String_Yes")}</Button>)}
        {currentView === View.Summary && (<Button disabled={isLoading} buttonType={ButtonType.primary} onClick={e => changeView(View.Confirm)}>{__("String_MoveOn")}</Button>)}
        <Button disabled={isLoading} onClick={closeDialog}>{__("String_Close")}</Button>
    </DialogFooter>);
};
