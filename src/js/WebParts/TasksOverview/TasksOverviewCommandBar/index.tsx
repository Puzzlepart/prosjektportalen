//#region Imports
import * as React from "react";
import __ from "../../../Resources";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import ITasksOverviewCommandBarProps from "./ITasksOverviewCommandBarProps";
// import * as array_unique from "array-unique";
//#endregion

export default class TasksOverviewCommandBar extends React.Component<ITasksOverviewCommandBarProps, {}> {
    public static displayName = "TasksOverviewCommandBar";
    protected _items: IContextualMenuItem[];
    protected _farItems: IContextualMenuItem[];

    /**
     * Constructor
     *
     * @param {ITasksOverviewCommandBarProps} props Props
     */
    constructor(props: ITasksOverviewCommandBarProps) {
        super(props);
        this._initItems(props);
    }

    /**
     * Component will update
     *
     * @param {ITasksOverviewCommandBarProps} newProps New props
     */
    public componentWillUpdate(newProps: ITasksOverviewCommandBarProps) {
        this._initItems(newProps);
    }

    /**
     * Initialize command bar items
     *
     * @param {ITasksOverviewCommandBarProps} props Props
     */
    protected _initItems(props: ITasksOverviewCommandBarProps) {
        this._items = [];
        this._farItems = [];
    }

    /**
     * Get options for projects, roles and resources
     */
    protected _getOptions() {
        return {};
    }

    /**
     * Renders the <TasksOverviewCommandBar /> component
     */
    public render(): JSX.Element {
        return <CommandBar items={this._items} farItems={this._farItems} />;
    }
}
