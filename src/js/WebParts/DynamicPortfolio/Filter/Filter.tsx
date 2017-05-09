import * as React from "react";
import { Checkbox } from "office-ui-fabric-react";
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
    private inputs: { [key: string]: HTMLInputElement } = {};

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isCollapsed: false,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount() {
        let { filter } = this.props;
        if (filter.defaultHidden) {
            this.setState({ isCollapsed: filter.defaultHidden });
        }
    }

    /**
     * Renders the component
     */
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
                {filter.multi && <Checkbox
                    id={`${filter.key}_input_${i.value}`}
                    label={i.name}
                    disabled={i.readOnly}
                    defaultChecked={i.defaultSelected}
                    onChange={e => this.onChange(idx, i, e.currentTarget)}
                    ref={ele => this.inputs[i.value] = ele} />}
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
};



