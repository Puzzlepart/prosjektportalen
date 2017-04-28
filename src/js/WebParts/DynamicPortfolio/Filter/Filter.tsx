import * as React from "react";
import { Link } from "office-ui-fabric-react";
import { Icon } from "../../@Components";

export interface IFilterItem {
    name: string;
    value: string;
    defaultSelected?: boolean;
    readOnly?: boolean;
}

export interface IFilter {
    name: string;
    key?: string;
    emptyMessage: string;
    multi: boolean;
    items: IFilterItem[];
    selected?: string[];
    defaultHidden?: boolean;
    iconName?: string;
}

export interface IFilterProps {
    filter: IFilter;
    onFilterChange: Function;
}

export interface IFilterState {
    isCollapsed: boolean;
}

/**
 * Filter
 */
export class Filter extends React.Component<IFilterProps, IFilterState> {
    private linkStyle: React.CSSProperties = { display: "block", color: "#777", fontSize: 11 };
    private inputs: { [key: string]: HTMLInputElement } = {};

    constructor() {
        super();
        this.state = {
            isCollapsed: false,
        };
    }

    public componentDidMount() {
        let { filter } = this.props;
        if (filter.defaultHidden) {
            this.setState({ isCollapsed: filter.defaultHidden });
        }
    }

    public render(): JSX.Element {
        let { filter } = this.props;
        let { isCollapsed } = this.state;
        return (<div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4 ms-u-xl4 ms-u-xxl12 ms-u-xxxl12" style={{ marginBottom: 20 }}>
            <h2 onClick={e => this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))} style={{ cursor: "pointer", position: "relative" }}>
                <Icon name={filter.iconName} style={{ marginRight: 5 }} />
                {filter.name}
                <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} style={{ fontSize: 14, position: "absolute", right: 5, top: 10 }} />
            </h2>
            <div hidden={isCollapsed}>
                <ul style={{ margin: "10px 0 0 0", padding: 0, listStyleType: "none" }}>
                    {this.renderItems()}
                </ul>
                <div hidden={!filter.multi || filter.items.length === 0} style={{ marginTop: 10 }}>
                    <Link style={this.linkStyle} onClick={e => this.toggleAll(e, true)}>{__("String_SelectAll")}</Link>
                    <Link style={this.linkStyle} onClick={e => this.toggleAll(e, false)}>{__("String_UnselectAll")}</Link>
                </div>
            </div>
        </div>);
    }

    /**
     * Render filter items
     */
    private renderItems = () => {
        let { filter } = this.props;
        return filter.items.length > 0
            ? filter.items.map((i, idx) => (<li key={idx} value={i.value}>
                {filter.multi && <input
                    id={`${filter.key}_input_${i.value}`}
                    type="checkbox"
                    disabled={i.readOnly}
                    defaultChecked={i.defaultSelected}
                    onClick={e => this.onChange(idx, i, e.currentTarget)}
                    ref={ele => this.inputs[i.value] = ele} />}
                <label htmlFor={`${filter.key}_input_${i.value}`}>{i.name}</label>
            </li>))
            : <li className="ms-metadata">{filter.emptyMessage}</li>;
    }

    /**
     * On filter change
     */
    private onChange = (idx: number, item: any, targetElem: any): void => {
        let { filter, onFilterChange } = this.props;
        if (filter.multi) {
            filter.selected = Object.keys(this.inputs).filter(key => this.inputs[key].checked);
        } else {
            filter.selected = [item];
        }
        onFilterChange(filter);
    }

    /**
     * Toggle all items
     */
    private toggleAll = (event: React.MouseEvent<any>, bool: boolean): void => {
        event.preventDefault();
        let { filter, onFilterChange } = this.props;
        let values = filter.items.map(i => i.value);
        let readOnlyValues = filter.items.filter(i => i.readOnly).map(i => i.value);
        if (bool) {
            filter.selected = values;
        } else {
            filter.selected = readOnlyValues;
        }

        Object.keys(this.inputs).filter(key => {
            let readOnly = filter.items.filter(i => i.readOnly).map(i => i.value);
            return !Array.contains(readOnly, key);
        }).forEach(key => this.inputs[key].checked = bool);

        onFilterChange(filter);
    }
};



