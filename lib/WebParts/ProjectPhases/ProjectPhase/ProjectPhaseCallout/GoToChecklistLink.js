"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
function generateGoToChecklistLink(phase) {
    if (phase.TaxonomyHiddenListId) {
        return `${phase.Checklist.defaultViewUrl}?useFiltersInViewXml=1&FilterField1=GtProjectPhase&FilterValue1=${phase.TaxonomyHiddenListId}&FilterType1=Counter&FilterLookupId1=1`;
    }
    else {
        return `${phase.Checklist.defaultViewUrl}?FilterField1=GtProjectPhase&FilterValue1=${encodeURIComponent(phase.Name)}`;
    }
}
const GoToChecklistLink = (props) => {
    return (React.createElement("li", null,
        React.createElement("a", { href: generateGoToChecklistLink(props.phase) },
            React.createElement(Icon_1.Icon, { iconName: "BulletedList" }),
            React.createElement("span", { style: { marginLeft: 5 } }, Resources_1.default.getResource("ProjectPhases_GoToChecklist")))));
};
exports.default = GoToChecklistLink;
