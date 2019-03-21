"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const RestartPhaseLink = ({ phase, restartPhaseEnabled, onRestartPhaseHandler }) => {
    return (React.createElement("li", null,
        React.createElement("div", { hidden: !restartPhaseEnabled },
            React.createElement("a", { href: "#", onClick: () => onRestartPhaseHandler(phase) },
                React.createElement(Icon_1.Icon, { iconName: "Refresh" }),
                React.createElement("span", { style: { marginLeft: 5 } }, Resources_1.default.getResource("ProjectPhases_RestartPhase"))))));
};
exports.default = RestartPhaseLink;
