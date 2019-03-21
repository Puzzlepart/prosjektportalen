"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
/**
 * TrendIcon
 */
const TrendIcon = (props) => {
    if (props.prevVal !== undefined && props.prevVal !== null) {
        if (props.prevVal !== props.latestVal) {
            if (props.shouldIncrease && (props.prevVal > props.latestVal)) {
                if (props.latestPercentage >= 100) {
                    return (React.createElement("span", null,
                        React.createElement(Icon_1.Icon, { iconName: "StockDown", style: { color: "red" } }),
                        React.createElement(Icon_1.Icon, { iconName: "Trophy", style: { color: "gold" } })));
                }
                return (React.createElement("span", null,
                    React.createElement(Icon_1.Icon, { iconName: "StockDown", style: { color: "red" } })));
            }
            if (!props.shouldIncrease && (props.latestVal > props.prevVal)) {
                if (props.latestPercentage >= 100) {
                    return (React.createElement("span", null,
                        React.createElement(Icon_1.Icon, { iconName: "StockDown", style: { color: "red" } }),
                        React.createElement(Icon_1.Icon, { iconName: "Trophy", style: { color: "gold" } })));
                }
                return (React.createElement("span", null,
                    React.createElement(Icon_1.Icon, { iconName: "StockDown", style: { color: "red" } })));
            }
            else {
                if (props.latestPercentage >= 100) {
                    return (React.createElement("span", null,
                        React.createElement(Icon_1.Icon, { iconName: "StockUp", style: { color: "green" } }),
                        React.createElement(Icon_1.Icon, { iconName: "Trophy", style: { color: "gold" } })));
                }
                return (React.createElement("span", null,
                    React.createElement(Icon_1.Icon, { iconName: "StockUp", style: { color: "green" } })));
            }
        }
    }
    else if (props.latestPercentage >= 100) {
        return (React.createElement("span", null,
            React.createElement(Icon_1.Icon, { iconName: "Trophy", style: { color: "gold" } })));
    }
    return null;
};
exports.default = TrendIcon;
