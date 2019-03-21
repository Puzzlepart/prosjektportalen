"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const common_1 = require("@pnp/common");
const DynamicPortfolioFilterItem_1 = require("../DynamicPortfolioFilterItem");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
/**
 * DynamicPortfolioFilter
 */
class DynamicPortfolioFilter extends React.PureComponent {
    /**
     * Constructor
     *
     * @param {IDynamicPortfolioFilterProps} props Pros
     */
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: props.filter.defaultHidden,
            filter: props.filter,
        };
        this.onExpandCollapse = this.onExpandCollapse.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    /**
     * Renders the <DynamicPortfolioFilter /> component
    */
    render() {
        return (React.createElement("div", { className: "ms-Grid-row", style: { marginTop: 20 } },
            React.createElement("div", { onClick: this.onExpandCollapse, style: { cursor: "pointer", position: "relative" }, className: "ms-Grid-col ms-sm12 ms-font-m" },
                React.createElement("span", null, this.state.filter.name),
                React.createElement("span", { style: { position: "absolute", right: 0 } },
                    React.createElement(Icon_1.Icon, { iconName: this.state.isCollapsed ? "ChevronUp" : "ChevronDown" }))),
            React.createElement("div", { className: "ms-Grid-col ms-sm12", hidden: this.state.isCollapsed },
                React.createElement("ul", { style: { margin: "10px 0 0 0", padding: 0, listStyleType: "none" } }, this.renderItems()))));
    }
    /**
     * Render filter items
     */
    renderItems() {
        const { filter } = this.state;
        if (filter) {
            return filter.items.map((item, idx) => {
                item.selected = item.defaultSelected || (common_1.isArray(this.state.filter.selected) && Array.contains(this.state.filter.selected, item.value));
                return (React.createElement(DynamicPortfolioFilterItem_1.default, { key: `DynamicPortfolioFilterItem_${idx}`, filter: filter, item: item, className: "ms-font-m", style: { padding: 2, marginBottom: 2 }, onChanged: this.onChange }));
            });
        }
        else {
            return null;
        }
    }
    /**
     * On expand/collapse
     */
    onExpandCollapse() {
        this.setState((prevState) => ({ isCollapsed: !prevState.isCollapsed }));
    }
    /**
     * On filter change
     *
     * @param {IDynamicPortfolioFilterItem} item The filter item
     * @param {boolean} checked Is the item checked
     */
    onChange(item, checked) {
        const { onFilterChange } = this.props;
        const { filter } = this.state;
        filter.items.filter(itm => itm.value === item.value)[0].selected = checked;
        if (filter.multi) {
            filter.selected = filter.items.filter(itm => itm.selected).map(itm => itm.value);
        }
        else {
            filter.selected = [item.value];
        }
        this.setState({ filter: filter }, () => onFilterChange(filter));
    }
}
DynamicPortfolioFilter.displayName = "DynamicPortfolioFilter";
exports.default = DynamicPortfolioFilter;
