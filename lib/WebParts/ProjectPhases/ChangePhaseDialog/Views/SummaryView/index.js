"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../../Resources");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const CheckListItem_1 = require("./CheckListItem");
/**
 * Summary view
 */
exports.SummaryView = ({ activePhase }) => {
    let listViewUrl = `${_spPageContextInfo.webAbsoluteUrl}/${Resources_1.default.getResource("DefaultView_PhaseChecklist_Url")}?FilterField1=GtProjectPhase&FilterValue1=${activePhase.Name}`;
    return (React.createElement("div", { className: "inner" },
        React.createElement("ul", { style: { marginBottom: 20 }, className: "pp-simpleList spacing-m" }, activePhase.Checklist.items.map((item, idx) => (React.createElement(CheckListItem_1.default, { key: `SummaryView_CheckListItem_${idx}`, checkListItem: item })))),
        React.createElement(MessageBar_1.MessageBar, null,
            React.createElement("div", { dangerouslySetInnerHTML: { __html: String.format(Resources_1.default.getResource("ProjectPhases_GoToChecklist2"), listViewUrl) } }))));
};
exports.default = exports.SummaryView;
