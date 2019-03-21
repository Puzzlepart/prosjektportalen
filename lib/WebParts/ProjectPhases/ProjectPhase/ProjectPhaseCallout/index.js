"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../Resources");
const ChecklistStats_1 = require("./ChecklistStats");
const GoToChecklistLink_1 = require("./GoToChecklistLink");
const ChangePhaseLink_1 = require("./ChangePhaseLink");
const RestartPhaseLink_1 = require("./RestartPhaseLink");
/**
 * Project Phase Callout
 *
 * @param {IProjectPhaseCalloutProps} param0 Props
 */
const ProjectPhaseCallout = ({ phase, requestedPhase, selected, changePhaseEnabled, restartPhaseEnabled, onChangePhaseHandler, onRestartPhaseHandler }) => {
    const hasActivePhaseRequest = (requestedPhase && requestedPhase !== "");
    if (hasActivePhaseRequest && requestedPhase !== phase.Name) {
        changePhaseEnabled = false;
        restartPhaseEnabled = false;
    }
    return (React.createElement("div", { className: "phaseCallout" },
        React.createElement("h3", null, String.format(Resources_1.default.getResource("ProjectPhases_PhaseCalloutHeader"), phase.Name)),
        React.createElement(ChecklistStats_1.default, { phase: phase }),
        React.createElement("ul", { style: { marginTop: 15, marginBottom: 10 } },
            React.createElement(GoToChecklistLink_1.default, Object.assign({}, { phase })),
            React.createElement(ChangePhaseLink_1.default, Object.assign({}, { phase, changePhaseEnabled, onChangePhaseHandler })),
            React.createElement(RestartPhaseLink_1.default, Object.assign({}, { phase, restartPhaseEnabled, onRestartPhaseHandler }))),
        React.createElement("div", { style: { paddingTop: 10 }, hidden: !selected || !hasActivePhaseRequest }, String.format(Resources_1.default.getResource("ProjectPhases_NextPhase"), requestedPhase))));
};
exports.default = ProjectPhaseCallout;
