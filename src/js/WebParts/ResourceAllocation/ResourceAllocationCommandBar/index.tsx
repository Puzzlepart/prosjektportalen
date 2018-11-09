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

    /**
     * Component will update
     *
     * @param {IResourceAllocationCommandBarProps} newProps New props
     */
    public componentWillUpdate(newProps: IResourceAllocationCommandBarProps) {
        this._initItems(newProps);
    }

    /**
     * Initialize command bar items
     *
     * @param {IResourceAllocationCommandBarProps} props Props
     */
    protected _initItems(props: IResourceAllocationCommandBarProps) {
        const { projects, resources, roles } = this._getOptions();

        this._items = [
            {
                key: "Project",
                name: (props.selected && props.selected.project) || __.getResource("String_Project"),
                iconProps: { iconName: "ProjectCollection" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: "Project_All",
                            name: __.getResource("String_All"),
                            iconProps: { iconName: "AllApps" },
                            onClick: event => this._onSelectionUpdate(event, { project: null, user: null, role: null }),
                        },
                        ...projects,
                    ],
                },
            },
            {
                key: "Resource",
                name: (props.selected && props.selected.user) ? props.selected.user.name : __.getResource("String_Resource"),
                iconProps: { iconName: "TemporaryUser" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: "Resource_All",
                            name: __.getResource("String_All"),
                            iconProps: { iconName: "AllApps" },
                            onClick: event => this._onSelectionUpdate(event, { project: null, user: null, role: null }),
                        },
                        ...resources,
                    ],
                },
            },
            {
                key: "Role",
                name: (props.selected && props.selected.role) ? props.selected.role : __.getResource("String_Role"),
                iconProps: { iconName: "Personalize" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: "Role_All",
                            name: __.getResource("String_All"),
                            iconProps: { iconName: "AllApps" },
                            onClick: event => this._onSelectionUpdate(event, { project: null, user: null, role: null }),
                        },
                        ...roles,
                    ],
                },
            },
        ];
        this._farItems = [];
    }

    /**
     * Get options for projects, roles and resources
     */
    protected _getOptions() {
        const projects = array_unique(this.props.allocations.filter(alloc => alloc.project).map(alloc => alloc.project.name))
            .map((p, idx) => {
                return {
                    key: `Project_${idx}`,
                    name: p,
                    onClick: event => this._onSelectionUpdate(event, { project: p, user: null, role: null }),
                };
            })
            .sort((a, b) => (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
        const resources = this.props.users
            .map((u, idx) => {
                return {
                    key: `Resource_${idx}`,
                    name: u.name,
                    onClick: event => this._onSelectionUpdate(event, { project: null, user: u, role: null }),
                };
            })
            .sort((a, b) => (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
        const roles = array_unique(this.props.allocations.filter(alloc => alloc.role).map(alloc => alloc.role))
            .map((r, idx) => {
                return {
                    key: `Role_${idx}`,
                    name: r,
                    onClick: event => this._onSelectionUpdate(event, { project: null, user: null, role: r }),
                };
            })
            .sort((a, b) => (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));

        return { projects, resources, roles };
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

    protected _onSelectionUpdate(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, { project, user, role }) {
        event.preventDefault();
        this.props.onSelectionUpdate({ project, user, role });
    }
}
