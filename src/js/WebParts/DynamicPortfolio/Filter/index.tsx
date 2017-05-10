import * as React from "react";
import { Icon } from "../../@Components";
import {
    IFilterItem,
    FilterItem,
} from "../FilterItem";


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
    filter?: IFilter;
    onFilterChange?: (filter: IFilter) => void;
    showIcon?: boolean;
}

export interface IFilterState {
    isCollapsed: boolean;
}
/**
 * Filter
 */
export class Filter extends React.PureComponent<IFilterProps, IFilterState> {
    public static defaultProps: Partial<IFilterProps> = {
        showIcon: true,
    };
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
        let {
            filter,
            showIcon,
         } = this.props;
        let { isCollapsed } = this.state;
        return (<div style={{ marginBottom: 20 }}>
            <div
                onClick={e => this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))}
                style={{
                    cursor: "pointer",
                    position: "relative",
                }}
                className="ms-font-m">
                {showIcon && (
                    <Icon
                        name={filter.iconName}
                        style={{ marginRight: 5 }} />
                )}
                {filter.name}
            </div>
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
        return filter.items.map((item, idx) => (
            <FilterItem
                key={idx}
                filter={filter}
                item={item}
                className="ms-font-m"
                onChange={this.onChange}
                ref={ele => this.inputs[item.value] = ele} />
        ));
    }

    /**
     * On filter change
     */
    private onChange = (item: any): void => {
        let {
            filter,
            onFilterChange,
        } = this.props;

        if (filter.multi) {
            filter.selected = Object.keys(this.inputs).filter(key => this.inputs[key].checked);
        } else {
            filter.selected = [item];
        }
        onFilterChange(filter);
    }
};



