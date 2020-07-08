//#region Imports
import * as React from 'react'
import __ from '../../../Resources'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import ITasksOverviewCommandBarProps from './ITasksOverviewCommandBarProps'
import ITasksOverviewCommandBarState from './ITasksOverviewCommandBarState'
import FilterPanel from '../../@Components/FilterPanel'
import { getObjectValue } from '../../../Helpers'
import TaskOverviewDateIntervalPanel from '../TaskOverviewDateIntervalPanel'
//#endregion

export default class TasksOverviewCommandBar extends React.Component<ITasksOverviewCommandBarProps, ITasksOverviewCommandBarState> {
    public static displayName = 'TasksOverviewCommandBar';
    protected items: IContextualMenuItem[];
    protected farItems: IContextualMenuItem[];

    /**
     * Constructor
     *
     * @param {ITasksOverviewCommandBarProps} props Props
     */
    constructor(props: ITasksOverviewCommandBarProps) {
        super(props)
        this.state = {}
    }

    /**
     * Get items
     */
    protected getItems(): IContextualMenuItem[] {
        const subItems = this.props.groupByOptions.map(({ fieldName, name }) => ({
            key: fieldName,
            fieldName,
            name,
            onClick: (event: React.MouseEvent<any>) => {
                event.preventDefault()
                this.props.onGroupByChanged({ fieldName, name })
            },
        }))
        return [
            {
                key: 'Group',
                name: getObjectValue(this.props, 'groupBy.name', ''),
                iconProps: { iconName: 'GroupedList' },
                itemType: ContextualMenuItemType.Header,
                onClick: event => event.preventDefault(),
                subMenuProps: { items: subItems },
            },
        ]
    }

    /**
     * Get far items
     */
    protected getFarItems(): IContextualMenuItem[] {
        return [
            {
                key: 'DateInterval',
                name: __.getResource('TasksOverview_DateIntervalText'),
                iconProps: { iconName: 'EventDate' },
                itemType: ContextualMenuItemType.Header,
                onClick: this.onOpenDateIntervalPanel,
            },
            {
                key: 'Filter',
                name: null,
                iconOnly: true,
                iconProps: { iconName: 'Filter' },
                itemType: ContextualMenuItemType.Header,
                onClick: this.onOpenFilerPanel,
            },
        ] as IContextualMenuItem[]
    }

    @autobind
    protected onOpenFilerPanel(event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) {
        event.preventDefault()
        event.stopPropagation()
        this.setState((prevState: ITasksOverviewCommandBarState) => ({ isFilterPanelOpen: !prevState.isFilterPanelOpen }))
    }

    @autobind
    protected onOpenDateIntervalPanel(event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) {
        event.preventDefault()
        event.stopPropagation()
        this.setState((prevState: ITasksOverviewCommandBarState) => ({ isDateIntervalPanelOpen: !prevState.isDateIntervalPanelOpen }))
    }

    @autobind
    protected onDismissFilterPanel() {
        this.setState({ isFilterPanelOpen: false })
    }

    @autobind
    protected onDismissDateIntervalPanel() {
        this.setState({ isDateIntervalPanelOpen: false })
    }

    /**
     * Renders the <TasksOverviewCommandBar /> component
     */
    public render(): JSX.Element {
        return (
            <div style={{ margin: '10px 0 10px 0' }}>
                <CommandBar items={this.getItems()} farItems={this.getFarItems()} />
                <FilterPanel
                    isOpen={this.state.isFilterPanelOpen}
                    isLightDismiss={true}
                    onDismiss={this.onDismissFilterPanel}
                    filters={this.props.filters}
                    onFilterChange={this.props.onFilterChange} />
                <TaskOverviewDateIntervalPanel
                    isOpen={this.state.isDateIntervalPanelOpen}
                    onDismiss={this.onDismissDateIntervalPanel}
                    headerText={__.getResource('TasksOverview_DateIntervalText')}
                    defaultVisibleTimeStart={this.props.visibleTime.visibleTimeStart}
                    defaultVisibleTimeEnd={this.props.visibleTime.visibleTimeEnd}
                    onChange={this.props.onIntervalChange} />
            </div>
        )
    }
}
