import * as React from "react";
import {
    View,
    InitialView,
    SummaryView,
    ChangingPhaseView,
} from "../Views";
import IBodyProps from "./IBodyProps";

/**
 * Body
 */
export const Body = ({ phase, checkListItems, openCheckListItems, currentIdx, nextCheckPointAction, currentView, isLoading }: IBodyProps) => {
    const DEFAULT = (
        <div className="inner"></div>
    );
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
        default: {
            return DEFAULT;
        }
    }
};
