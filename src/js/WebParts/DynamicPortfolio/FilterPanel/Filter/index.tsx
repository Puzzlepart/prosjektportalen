import * as React from "react";
import { Util } from "sp-pnp-js";
import FilterItem from "../FilterItem";
import IFilterItem from "../FilterItem/IFilterItem";
import IFilterProps from "./IFilterProps";
import IFilterState from "./IFilterState";

/**
 * Filter
 */
export default class Filter extends React.PureComponent<IFilterProps, IFilterState> {
    public static displayName = "Filter";
    public static defaultProps: Partial<IFilterProps> = {};

    /**
     * Constructor
     *
     * @param {IFilterProps} props Pros
     */
    constructor(props: IFilterProps) {
        super(props);
        this.state = {
            isCollapsed: false,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount() {
        const { filter } = this.props;

        if (filter.defaultHidden) {
            this.setState({ isCollapsed: filter.defaultHidden });
        }

        this.setState({ filter: filter });
    }

    /**
  * Calls _render with props and state to allow for ES6 destruction
  */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }
    /**
     * Renders the component
     *
     * @param {IFilterProps} param0 Props
     * @param {IFilterState} param1 State
     */
    public _render({ filter }: IFilterProps, { isCollapsed }: IFilterState): JSX.Element {
        return (
            <div
                className="ms-Grid-row"
                style={{ marginTop: 20 }}>
                <div
                    onClick={e => this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))}
                    style={{
                        cursor: "pointer",
                        position: "relative",
                    }}
                    className="ms-Grid-col ms-sm12 ms-font-m">
                    {filter.name}
                </div>
                <div
                    className="ms-Grid-col ms-sm12"
                    hidden={isCollapsed}>
                    <ul style={{
                        margin: "10px 0 0 0",
                        padding: 0,
                        listStyleType: "none",
                    }}>
                        {this.renderItems(this.props, this.state)}
                    </ul>
                </div>
            </div>
        );
    }

    /**
     * Render filter items
     *
     * @param {IFilterProps} param0 Props
     * @param {IFilterState} param1 State
     */
    private renderItems = ({ }: IFilterProps, { filter }: IFilterState) => {
        if (filter) {
            return filter.items.map((item, idx) => {
                item.selected = item.defaultSelected || (Util.isArray(filter.selected) && Array.contains(filter.selected, item.value));
                return (
                    <FilterItem
                        key={idx}
                        filter={filter}
                        item={item}
                        className="ms-font-m"
                        padding={2}
                        marginBottom={2}
                        onChange={this.onChange} />
                );
            });
        } else {
            return null;
        }
    }

    /**
     * On filter change
     */
    private onChange = (item: IFilterItem, checked: boolean): void => {
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
