//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../../../Resources";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { View, InitialView, SummaryView, ChangingPhaseView, GateApprovalView } from "../Views";
import IBodyProps from "./IBodyProps";
//#endregion

export const Body = (props: IBodyProps) => {
    switch (props.currentView) {
        case View.Initial: {
            const currentChecklistItem = props.openCheckListItems[props.currentIdx];
            return (
                <InitialView
                    isLoading={props.isLoading}
                    currentChecklistItem={currentChecklistItem}
                    nextCheckPointAction={props.nextCheckPointAction} />
            );
        }
        case View.Summary: {
            return (
                <SummaryView activePhase={props.activePhase} />
            );
        }
        case View.ChangingPhase: {
            return (
                <ChangingPhaseView newPhase={props.newPhase} />
            );
        }
        case View.GateApproval: {
            return (
                <GateApprovalView
                    onCloseDialog={props.onCloseDialog}
                    onChangePhaseDialogReturnCallback={props.onChangePhaseDialogReturnCallback} />
            );
        }
        case View.Confirm: {
            if (props.activePhase && props.activePhase.IsIncremental) {
                return (
                    <div className="inner">
                        <MessageBar>
                            <p>{String.format(RESOURCE_MANAGER.getResource("ProjectPhases_CurrentPhaseIncremental"), props.activePhase.Name)}</p>
                            <p>{String.format(RESOURCE_MANAGER.getResource("ProjectPhases_RestartPhaseOrContinue"), props.nextPhase.Name)}</p>
                        </MessageBar>
                    </div>
                );
            }
            return <div className="inner"></div>;
        }
        default: {
            return <div className="inner"></div>;
        }
    }
};
