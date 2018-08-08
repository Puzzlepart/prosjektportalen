//#region Imports
import * as React from "react";
import __ from "../../../Resources";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType, IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import IResourceAllocationCommandBarProps from "./IResourceAllocationCommandBarProps";
import * as array_unique from "array-unique";
//#endregion

export default class ResourceAllocationCommandBar extends React.Component<IResourceAllocationCommandBarProps, {}> {
    public static displayName = "ResourceAllocationCommandBar";
    protected _items: Array<IContextualMenuItem>;
    protected _farItems: Array<IContextualMenuItem>;

    /**
     * Constructor
     *
     * @param {IResourceAllocationCommandBarProps} props Props
     */
    constructor(props: IResourceAllocationCommandBarProps) {
        super(props);
        this._initItems(props);
    }

    public componentWillUpdate(newProps: IResourceAllocationCommandBarProps) {
        this._initItems(newProps);
    }

    protected _initItems(props: IResourceAllocationCommandBarProps) {
        const projectOptions = array_unique(props.allocations.map(alloc => alloc.project.name))
            .map((project, idx) => {
                return {
                    key: `Project_${idx}`,
                    name: project,
                    onClick: event => {
                        this._onUserSelected(event, null);
                        this._onProjectSelected(event, project);
                    },
                };
            })
            .sort((a, b) => (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
        const resourceOptions = props.users
            .map((user, idx) => {
                return {
                    key: `Resource_${idx}`,
                    name: user.name,
                    onClick: event => {
                        this._onProjectSelected(event, null);
                        this._onUserSelected(event, user);
                    },
                };
            })
            .sort((a, b) => (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));

        this._items = [
            {
                key: "Project",
                name: props.selectedProject ? props.selectedProject : __.getResource("String_Project"),
                iconProps: { iconName: "ProjectCollection" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: `Project_All`,
                            name: "Alle",
                            iconProps: { iconName: "AllApps" },
                            onClick: event => this._onProjectSelected(event, null),
                        },
                        ...projectOptions,
                    ],
                },
            },
            {
                key: "Resource",
                name: props.selectedUser ? props.selectedUser.name : __.getResource("String_Resource"),
                iconProps: { iconName: "TemporaryUser" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: `Resource_All`,
                            name: "Alle",
                            iconProps: { iconName: "AllApps" },
                            onClick: event => this._onUserSelected(event, null),
                        },
                        ...resourceOptions,
                    ],
                },
            },
        ];
        this._farItems = [];
    }

    /**
     * Renders the <ResourceAllocationCommandBar /> component
     */
    public render(): JSX.Element {
        return (
            <CommandBar
                items={this._items}
                farItems={this._farItems} />
        );
    }

    protected _onUserSelected(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, user) {
        event.preventDefault();
        this.props.onUserSelected(user);
    }

    protected _onProjectSelected(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, project) {
        event.preventDefault();
        this.props.onProjectSelected(project);
    }
}
