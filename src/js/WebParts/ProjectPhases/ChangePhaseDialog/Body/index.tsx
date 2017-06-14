import * as React from "react";
import {
    View,
    InitialView,
    SummaryView,
} from "../Views";

/**
 * Body
 */
export const Body = ({ checkListItems, openCheckListItems, currentIdx, nextCheckPointAction, currentView, isLoading }) => {
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
            return (<SummaryView checkListItems={checkListItems} />);
        }
        default: {
            return DEFAULT;
        }
    }
};
