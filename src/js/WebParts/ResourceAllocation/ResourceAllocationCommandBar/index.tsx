//#region Imports
import * as React from 'react'
import __ from '../../../Resources'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import IResourceAllocationCommandBarProps from './IResourceAllocationCommandBarProps'
import IResourceAllocationCommandBarState from './IResourceAllocationCommandBarState'
import FilterPanel from '../../@Components/FilterPanel'
//#endregion

export default class ResourceAllocationCommandBar extends React.Component<IResourceAllocationCommandBarProps, IResourceAllocationCommandBarState> {
    public static displayName = 'ResourceAllocationCommandBar';

    /**
     * Constructor
     *
     * @param {IResourceAllocationCommandBarProps} props Props
     */
    constructor(props: IResourceAllocationCommandBarProps) {
        super(props)
        this.state = { isFilterPanelOpen: false }
    }

    /**
     * Get items
     */
    protected getItems(): IContextualMenuItem[] {
        return []
    }

    /**
     * Get far items
     */
    protected getFarItems(): IContextualMenuItem[] {
        return [{
            key: 'Filter',
            name: 'Filter',
            iconOnly: true,
            iconProps: { iconName: 'Filter' },
            itemType: ContextualMenuItemType.Header,
            onClick: this.onOpenFilerPanel,
        }]
    }

    @autobind
    protected onOpenFilerPanel(event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) {
        event.preventDefault()
        event.stopPropagation()
        this.setState((prevState: IResourceAllocationCommandBarState) => ({ isFilterPanelOpen: !prevState.isFilterPanelOpen }))
    }

    @autobind
    protected onDismissFilterPanel() {
        this.setState({ isFilterPanelOpen: false })
    }

    /**
     * Renders the <TasksOverviewCommandBar /> component
     */
    public render(): JSX.Element {
        return (
            <div>
                <CommandBar items={this.getItems()} farItems={this.getFarItems()} />
                <FilterPanel
                    isOpen={this.state.isFilterPanelOpen}
                    isLightDismiss={true}
                    onDismiss={this.onDismissFilterPanel}
                    filters={this.props.filters}
                    onFilterChange={this.props.onFilterChange} />
            </div>
        )
    }
}
