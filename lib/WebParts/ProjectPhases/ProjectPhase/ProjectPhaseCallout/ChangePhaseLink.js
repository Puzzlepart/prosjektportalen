"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const ChangePhaseLink = ({ phase, changePhaseEnabled, onChangePhaseHandler }) => {
    let linkTextResourceKey;
    switch (phase.Type) {
        case "Gate":
            linkTextResourceKey = "ProjectPhases_ChangeGate";
            break;
        case "Default":
            linkTextResourceKey = "ProjectPhases_ChangePhase";
            break;
    }
    return (React.createElement("li", null,
        React.createElement("div", { hidden: !changePhaseEnabled },
            React.createElement("a", { href: "#", onClick: () => onChangePhaseHandler(phase) },
                React.createElement(Icon_1.Icon, { iconName: "DoubleChevronRight12" }),
                React.createElement("span", { style: { marginLeft: 5 } }, Resources_1.default.getResource(linkTextResourceKey))))));
};
exports.default = ChangePhaseLink;
