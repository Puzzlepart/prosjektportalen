import * as React from "react";
import { Link } from "office-ui-fabric-react";

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
}

export interface IFilterProps {
    filter: IFilter;
    onFilterChange: Function;
}

export interface IFilterState {
    isHidden: boolean;
}

export class Filter extends React.Component<IFilterProps, IFilterState> {
    private linkStyle: React.CSSProperties = { display: "block", color: "#777", fontSize: 11 };
    private inputs: { [key: string]: HTMLInputElement } = {};

    constructor() {
        super();
        this.state = {
            isHidden: false,
        };
    }

    public componentDidMount() {
        let { filter } = this.props;
        if (filter.defaultHidden) {
            this.setState({ isHidden: filter.defaultHidden });
        }
    }

    public render() {
        let { filter } = this.props;
        let { isHidden } = this.state;
        return (<div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4 ms-u-xl4 ms-u-xxl12 ms-u-xxxl12" style={{ marginBottom: 20 }}>
            <h2 onClick={e => this.setState(prevState => ({ isHidden: !prevState.isHidden }))} style={{ cursor: "pointer" }}>{filter.name}</h2>
            (<div hidden={isHidden}>
                <ul style={{ margin: "10px 0 0 0", padding: 0, listStyleType: "none" }}>
                    {filter.items.length > 0
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
                        : <li className="ms-metadata">{filter.emptyMessage}</li>}
                </ul>
                (<div hidden={!filter.multi || filter.items.length === 0} style={{ marginTop: 10 }}>
                    <Link style={this.linkStyle} onClick={e => this.toggleAll(e, true)}>{__("String_SelectAll")}</Link>
                    <Link style={this.linkStyle} onClick={e => this.toggleAll(e, false)}>{__("String_UnselectAll")}</Link>
                </div>)
            </div>)
        </div>);
    }

    private onChange = (idx, item, targetElem): void => {
        let { filter, onFilterChange } = this.props;
        if (filter.multi) {
            filter.selected = Object.keys(this.inputs).filter(key => this.inputs[key].checked);
        } else {
            filter.selected = [item];
        }
        onFilterChange(filter);
    }

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



