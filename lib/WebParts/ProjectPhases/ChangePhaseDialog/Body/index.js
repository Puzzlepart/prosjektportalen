"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const React = require("react");
const Resources_1 = require("../../../../Resources");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Views_1 = require("../Views");
//#endregion
exports.Body = (props) => {
    switch (props.currentView) {
        case Views_1.View.Initial: {
            const currentChecklistItem = props.openCheckListItems[props.currentIdx];
            return (React.createElement(Views_1.InitialView, { isLoading: props.isLoading, currentChecklistItem: currentChecklistItem, nextCheckPointAction: props.nextCheckPointAction }));
        }
        case Views_1.View.Summary: {
            return (React.createElement(Views_1.SummaryView, { activePhase: props.activePhase }));
        }
        case Views_1.View.ChangingPhase: {
            return (React.createElement(Views_1.ChangingPhaseView, { newPhase: props.newPhase }));
        }
        case Views_1.View.GateApproval: {
            return (React.createElement(Views_1.GateApprovalView, { onCloseDialog: props.onCloseDialog, onChangePhaseDialogReturnCallback: props.onChangePhaseDialogReturnCallback }));
        }
        case Views_1.View.Confirm: {
            if (props.activePhase && props.activePhase.IsIncremental) {
                return (React.createElement("div", { className: "inner" },
                    React.createElement(MessageBar_1.MessageBar, null,
                        React.createElement("p", null, String.format(Resources_1.default.getResource("ProjectPhases_CurrentPhaseIncremental"), props.activePhase.Name)),
                        React.createElement("p", null, String.format(Resources_1.default.getResource("ProjectPhases_RestartPhaseOrContinue"), props.nextPhase.Name)))));
            }
            return React.createElement("div", { className: "inner" });
        }
        case Views_1.View.ErrorInformation: {
            return React.createElement(Views_1.ErrorInformationView, null);
        }
        default: {
            return React.createElement("div", { className: "inner" });
        }
    }
};
