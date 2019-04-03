//#region Imports
import * as React from "react";
import __ from "../../../Resources";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import ITasksOverviewCommandBarProps from "./ITasksOverviewCommandBarProps";
import ITasksOverviewCommandBarState from "./ITasksOverviewCommandBarState";
import FilterPanel from "../../@Components/FilterPanel";
//#endregion

export default class TasksOverviewCommandBar extends React.Component<ITasksOverviewCommandBarProps, ITasksOverviewCommandBarState> {
    public static displayName = "TasksOverviewCommandBar";
    protected items: IContextualMenuItem[];
    protected farItems: IContextualMenuItem[];

    /**
     * Constructor
     *
     * @param {ITasksOverviewCommandBarProps} props Props
     */
    constructor(props: ITasksOverviewCommandBarProps) {
        super(props);
        this.state = {};
    }

    /**
     * Get far items
     */
    protected getFarItems(): IContextualMenuItem[] {
        return [{
            key: "Filter",
            name: "Filter",
            iconOnly: true,
            iconProps: { iconName: "Filter" },
            itemType: ContextualMenuItemType.Header,
            onClick: this.onOpenFilerPanel,
        }];
    }

    @autobind
    protected onOpenFilerPanel(event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.setState((prevState: ITasksOverviewCommandBarState) => ({ isFilterPanelOpen: !prevState.isFilterPanelOpen }));
    }

    @autobind
    protected onDismissFilterPanel() {
        this.setState({ isFilterPanelOpen: false });
    }

    /**
     * Get far items
     */
    protected getItems(): IContextualMenuItem[] {
        return [];
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
        );
    }
}
