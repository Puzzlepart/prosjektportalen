"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const ProjectPhaseIterations = (props) => {
    const containerStyle = { position: "absolute", top: -12, left: 35 };
    const iconStyle = {};
    const textStyle = { marginLeft: 2, fontSize: 10 };
    return (React.createElement("div", { hidden: !props.phase.IsIncremental, style: containerStyle },
        React.createElement(Icon_1.Icon, { iconName: "Sync", style: iconStyle }),
        React.createElement("span", { hidden: !props.phaseIterations, style: textStyle }, props.phaseIterations)));
};
exports.default = ProjectPhaseIterations;
