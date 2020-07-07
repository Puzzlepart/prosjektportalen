import * as React from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { IFilterItemProps, FilterItem } from './FilterItem'

export interface IFilterProps {
    column: IColumn;
    items: IFilterItemProps[];
    onFilterChange?: (column: IColumn, selectedItems: IFilterItemProps[]) => void;
}

export interface IFilterState {
    isCollapsed: boolean;
    items: IFilterItemProps[];
}

export class Filter extends React.Component<IFilterProps, IFilterState> {
    constructor(props: IFilterProps) {
        super(props)
        this.state = { isCollapsed: false, items: props.items }
    }

    /**
     * Renders the <Filter /> component
     */
    public render(): React.ReactElement<IFilterProps> {
        return (
            <div style={{ margin: '20px 0 0 0' }}>
                <div style={{ position: 'relative', color: '#666', height: 20, padding: '6px 0', cursor: 'pointer' }} onClick={this.onToggleSectionContent}>
                    <span style={{ fontSize: 14, fontWeight: 400 }}>{this.props.column.name}</span>
                    <span style={{ fontSize: 14, position: 'absolute', right: 0 }}>
                        <Icon iconName={this.state.isCollapsed ? 'ChevronUp' : 'ChevronDown'} />
                    </span>
                </div>
                <div hidden={this.state.isCollapsed}>
                    <ul style={{ fontSize: 12, listStyleType: 'none', margin: '4px 0 0 0', padding: 0 }}>
                        {this.renderItems()}
                    </ul>
                </div>
            </div>
        )
    }

    /**
     * On toggle section content
     */
    @autobind
    private onToggleSectionContent() {
        this.setState((prevState: IFilterState) => ({ isCollapsed: !prevState.isCollapsed }))
    }

    /**
     * Render filter items
     */
    private renderItems() {
        return this.state.items.map((props, key) => <FilterItem key={key} {...props} onChanged={(_event, checked) => this.onChanged(props, checked)} />)
    }

    /**
     * On changed
     *
     * @param {IFilterItemProps} item Item that was changed
     * @param {boolean} checked Item checked
     */
    @autobind
    private onChanged(item: IFilterItemProps, checked: boolean) {
        const { items } = this.state
        items.filter(_item => _item.value === item.value)[0].selected = checked
        this.setState({ items })
        const selectedItems = items.filter(i => i.selected)
        this.props.onFilterChange(this.props.column, selectedItems)
    }
}
