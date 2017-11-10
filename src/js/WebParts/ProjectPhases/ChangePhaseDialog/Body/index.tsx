import * as React from "react";
import {
    View,
    InitialView,
    SummaryView,
    ChangingPhaseView,
    GateApprovalView,
} from "../Views";
import IBodyProps from "./IBodyProps";

export const Body = ({ phase, checkListItems, openCheckListItems, currentIdx, nextCheckPointAction, currentView, isLoading, onCloseDialog, onChangePhaseDialogReturnCallback }: IBodyProps) => {
    switch (currentView) {
        case View.Initial: {
            const currentChecklistItem = openCheckListItems[currentIdx];
            return (
                <InitialView
                    isLoading={isLoading}
                    currentChecklistItem={currentChecklistItem}
                    nextCheckPointAction={nextCheckPointAction} />
            );
        }
        case View.Summary: {
            return (
                <SummaryView
                    phase={phase}
                    checkListItems={checkListItems} />
            );
        }
        case View.ChangingPhase: {
            return (
                <ChangingPhaseView phase={phase} />
            );
        }
        case View.GateApproval: {
            return (
                <GateApprovalView
                    onCloseDialog={onCloseDialog}
                    onChangePhaseDialogReturnCallback={onChangePhaseDialogReturnCallback} />
            );
        }
        default: {
            return <div className="inner"></div>;
        }
    }
};
