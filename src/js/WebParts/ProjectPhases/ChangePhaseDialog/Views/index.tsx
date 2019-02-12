import InitialView from "./InitialView";
import SummaryView from "./SummaryView";
import ChangingPhaseView from "./ChangingPhaseView";
import GateApprovalView from "./GateApprovalView";
import ErrorInformationView from "./ErrorInformationView";

export enum View {
    Initial,
    Summary,
    Confirm,
    ChangingPhase,
    GateApproval,
    ErrorInformation,
}

export {
    InitialView,
    SummaryView,
    ChangingPhaseView,
    GateApprovalView,
    ErrorInformationView,
};
