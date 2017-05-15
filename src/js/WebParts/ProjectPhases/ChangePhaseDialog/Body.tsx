import * as React from "react";
import {
    View,
    InitialView,
    SummaryView,
} from "./Views";

/**
 * Body
 */
export const Body = ({ checkListItems, currentIdx, nextCheckPointAction, currentView, isLoading }) => {
    const DEFAULT = (<div className="inner"></div>);
    switch (currentView) {
        case View.Initial: {
            return (<InitialView isLoading={isLoading} currentChecklistItem={checkListItems[currentIdx]} nextCheckPointAction={nextCheckPointAction} />);
        }
        case View.Summary: {
            return (<SummaryView checkListItems={checkListItems} />);
        }
        default: {
            return DEFAULT;
        }
    }
};
