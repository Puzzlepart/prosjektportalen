"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ProjectPhaseIcon_1 = require("./ProjectPhaseIcon");
const ProjectPhaseCallout_1 = require("./ProjectPhaseCallout");
/**
 * Project Phase
 *
 * @param {IProjectPhaseProps} param0 Props
 */
const ProjectPhase = ({ phase, phaseIterations, requestedPhase, classList, changePhaseEnabled, restartPhaseEnabled, onRestartPhaseHandler, onChangePhaseHandler }) => {
    const selected = classList.indexOf("selected") !== -1;
    const projectPhaseIconProps = { phase, phaseIterations, classList };
    const projectPhaseCalloutProps = { phase, requestedPhase, selected, changePhaseEnabled, restartPhaseEnabled, onRestartPhaseHandler, onChangePhaseHandler };
    return (React.createElement("li", { className: classList.join(" ") },
        React.createElement(ProjectPhaseIcon_1.default, Object.assign({}, projectPhaseIconProps)),
        React.createElement(ProjectPhaseCallout_1.default, Object.assign({}, projectPhaseCalloutProps))));
};
exports.default = ProjectPhase;
