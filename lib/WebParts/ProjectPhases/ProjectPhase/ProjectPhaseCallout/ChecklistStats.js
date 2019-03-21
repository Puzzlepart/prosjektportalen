"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const GetStatusIcon = (index) => {
    switch (index) {
        case 0:
            return "CheckMark";
        case 1:
            return "ErrorBadge";
        case 2:
            return "CircleRing";
    }
};
const ChecklistStats = ({ phase }) => {
    const { stats } = phase.Checklist;
    return (React.createElement("ul", null, Object.keys(stats).map((c, index) => (React.createElement("li", { key: index, style: { paddingTop: "5px" } },
        React.createElement(Icon_1.Icon, { iconName: GetStatusIcon(index) }),
        " ",
        React.createElement("span", null,
            stats[c],
            " ",
            c,
            " ",
            Resources_1.default.getResource("ProjectPhases_Checkpoints"),
            "."))))));
};
exports.default = ChecklistStats;
