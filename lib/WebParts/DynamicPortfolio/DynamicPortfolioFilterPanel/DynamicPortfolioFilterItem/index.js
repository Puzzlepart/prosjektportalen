"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
/**
 * DynamicPortfolioFilter Item
 *
 * @param {IDynamicPortfolioFilterItemProps} param0 Props
 */
const DynamicPortfolioFilterItem = (props) => {
    return (React.createElement("li", null,
        React.createElement("div", { className: props.className, style: props.style },
            React.createElement(Checkbox_1.Checkbox, { label: props.item.name, disabled: props.item.readOnly, defaultChecked: props.item.selected, onChange: (e, checked) => props.onChanged(props.item, checked) }))));
};
exports.default = DynamicPortfolioFilterItem;
