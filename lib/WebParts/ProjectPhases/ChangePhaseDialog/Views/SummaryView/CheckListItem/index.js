"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const GetStatusColor = (status) => {
    switch (status) {
        case Resources_1.default.getResource("Choice_GtChecklistStatus_Open"): {
            return "inherit";
        }
        case Resources_1.default.getResource("Choice_GtChecklistStatus_Closed"): {
            return "#107c10";
        }
        case Resources_1.default.getResource("Choice_GtChecklistStatus_NotRelevant"): {
            return "#e81123";
        }
        default: {
            return "";
        }
    }
};
/**
 * CheckListItem
 */
class CheckListItem extends React.PureComponent {
    /**
     * Constructor
     *
     * @param {IChecklistItemProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = { showComment: false };
    }
    render() {
        const { Title, GtChecklistStatus, GtComment } = this.props.checkListItem;
        const hasComment = GtComment !== null && /\S/.test(GtComment);
        const style = { color: GetStatusColor(GtChecklistStatus), cursor: hasComment ? "pointer" : "initial" };
        return (React.createElement("li", null,
            React.createElement("div", { className: "ms-Grid", style: style },
                React.createElement("div", { className: "ms-Grid-row", onClick: e => {
                        if (hasComment) {
                            this.setState({ showComment: !this.state.showComment });
                        }
                    } },
                    React.createElement("div", { className: "ms-Grid-col ms-sm10" },
                        React.createElement("span", null, Title)),
                    React.createElement("div", { className: "ms-Grid-col ms-sm2", hidden: !hasComment },
                        React.createElement(Icon_1.Icon, { iconName: this.state.showComment ? "ChevronDown" : "ChevronUp" }))),
                React.createElement("div", { className: "ms-Grid-row", hidden: !this.state.showComment },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement("p", { className: "ms-metadata" }, GtComment))))));
    }
}
exports.default = CheckListItem;
