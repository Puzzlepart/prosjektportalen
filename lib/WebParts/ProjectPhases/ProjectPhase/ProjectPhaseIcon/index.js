"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ProjectPhaseIterations_1 = require("./ProjectPhaseIterations");
/**
 * Project Phase Icon
 *
 * @param {IProjectPhaseIconProps} param0 Props
 */
const ProjectPhaseIcon = (props) => {
    const isGate = props.phase.Type === "Gate";
    return (React.createElement("a", { href: "#", style: { position: "relative" } },
        React.createElement("div", { className: ["phaseIcon", ...props.classList].join(" ") },
            React.createElement("span", { className: "phaseLetter" }, props.phase.PhaseLetter),
            React.createElement("span", { className: "phaseText", hidden: isGate || !props.phase.ShowPhaseText }, props.phase.Name),
            React.createElement("span", { className: "phaseSubText" })),
        React.createElement(ProjectPhaseIterations_1.default, { phase: props.phase, phaseIterations: props.phaseIterations })));
};
exports.default = ProjectPhaseIcon;
