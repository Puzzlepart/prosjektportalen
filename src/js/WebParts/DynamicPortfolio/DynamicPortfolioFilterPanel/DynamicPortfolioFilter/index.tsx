import * as React from "react";
import { isArray } from "@pnp/common";
import IDynamicPortfolioFilter from "./IDynamicPortfolioFilter";
import DynamicPortfolioFilterItem from "../DynamicPortfolioFilterItem";
import IDynamicPortfolioFilterItem from "../DynamicPortfolioFilterItem/IDynamicPortfolioFilterItem";
import IDynamicPortfolioFilterProps from "./IDynamicPortfolioFilterProps";
import IDynamicPortfolioFilterState from "./IDynamicPortfolioFilterState";
import { Icon } from "office-ui-fabric-react/lib/Icon";

/**
 * DynamicPortfolioFilter
 */
export default class DynamicPortfolioFilter extends React.PureComponent<IDynamicPortfolioFilterProps, IDynamicPortfolioFilterState> {
    public static displayName = "DynamicPortfolioFilter";

    /**
     * Constructor
     *
     * @param {IDynamicPortfolioFilterProps} props Pros
     */
    constructor(props: IDynamicPortfolioFilterProps) {
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
    public render(): React.ReactElement<IDynamicPortfolioFilterProps> {
        return (
            <div className="ms-Grid-row" style={{ marginTop: 20 }}>
                <div
                    onClick={this.onExpandCollapse}
                    style={{ cursor: "pointer", position: "relative" }}
                    className="ms-Grid-col ms-sm12 ms-font-m">
                    <span>{this.state.filter.name}</span>
                    <span style={{ position: "absolute", right: 0 }}>
                        <Icon iconName={this.state.isCollapsed ? "ChevronUp" : "ChevronDown"} />
                    </span>
                </div>
                <div className="ms-Grid-col ms-sm12" hidden={this.state.isCollapsed}>
                    <ul style={{ margin: "10px 0 0 0", padding: 0, listStyleType: "none" }}>
                        {this.renderItems()}
                    </ul>
                </div>
            </div>
        );
    }

    /**
     * Render filter items
     */
    private renderItems() {
        const { filter } = this.state;
        if (filter) {
            return filter.items.map((item, idx) => {
                item.selected = item.defaultSelected || (isArray(this.state.filter.selected) && Array.contains(this.state.filter.selected, item.value));
                return (
                    <DynamicPortfolioFilterItem
                        key={`DynamicPortfolioFilterItem_${idx}`}
                        filter={filter}
                        item={item}
                        className="ms-font-m"
                        style={{ padding: 2, marginBottom: 2 }}
                        onChanged={this.onChange} />
                );
            });
        } else {
            return null;
        }
    }

    /**
     * On expand/collapse
     */
    private onExpandCollapse() {
        this.setState((prevState: IDynamicPortfolioFilterState) => ({ isCollapsed: !prevState.isCollapsed }));
    }

    /**
     * On filter change
     *
     * @param {IDynamicPortfolioFilterItem} item The filter item
     * @param {boolean} checked Is the item checked
     */
    private onChange(item: IDynamicPortfolioFilterItem, checked: boolean) {
        const { onFilterChange } = this.props;
        const { filter } = this.state;

        filter.items.filter(itm => itm.value === item.value)[0].selected = checked;

        if (filter.multi) {
            filter.selected = filter.items.filter(itm => itm.selected).map(itm => itm.value);
        } else {
            filter.selected = [item.value];
        }
        this.setState({ filter: filter }, () => onFilterChange(filter));
    }
}

export { IDynamicPortfolioFilter };

