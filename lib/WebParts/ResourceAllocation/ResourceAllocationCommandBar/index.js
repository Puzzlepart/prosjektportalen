"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const React = require("react");
const Resources_1 = require("../../../Resources");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
const array_unique = require("array-unique");
//#endregion
class ResourceAllocationCommandBar extends React.Component {
    /**
     * Constructor
     *
     * @param {IResourceAllocationCommandBarProps} props Props
     */
    constructor(props) {
        super(props);
        this._initItems(props);
    }
    /**
     * Component will update
     *
     * @param {IResourceAllocationCommandBarProps} newProps New props
     */
    componentWillUpdate(newProps) {
        this._initItems(newProps);
    }
    /**
     * Initialize command bar items
     *
     * @param {IResourceAllocationCommandBarProps} props Props
     */
    _initItems(props) {
        const { projects, resources, roles } = this._getOptions();
        this._items = [
            {
                key: "Project",
                name: (props.selected && props.selected.project) || Resources_1.default.getResource("String_Project"),
                iconProps: { iconName: "ProjectCollection" },
                itemType: ContextualMenu_1.ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: "Project_All",
                            name: Resources_1.default.getResource("String_All"),
                            iconProps: { iconName: "AllApps" },
                            onClick: event => this._onSelectionUpdate(event, { project: null, user: null, role: null }),
                        },
                        ...projects,
                    ],
                },
            },
            {
                key: "Resource",
                name: (props.selected && props.selected.user) ? props.selected.user.name : Resources_1.default.getResource("String_Resource"),
                iconProps: { iconName: "TemporaryUser" },
                itemType: ContextualMenu_1.ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: "Resource_All",
                            name: Resources_1.default.getResource("String_All"),
                            iconProps: { iconName: "AllApps" },
                            onClick: event => this._onSelectionUpdate(event, { project: null, user: null, role: null }),
                        },
                        ...resources,
                    ],
                },
            },
            {
                key: "Role",
                name: (props.selected && props.selected.role) ? props.selected.role : Resources_1.default.getResource("String_Role"),
                iconProps: { iconName: "Personalize" },
                itemType: ContextualMenu_1.ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: "Role_All",
                            name: Resources_1.default.getResource("String_All"),
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
    _getOptions() {
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
    render() {
        return (React.createElement(CommandBar_1.CommandBar, { items: this._items, farItems: this._farItems }));
    }
    _onSelectionUpdate(event, { project, user, role }) {
        event.preventDefault();
        this.props.onSelectionUpdate({ project, user, role });
    }
}
ResourceAllocationCommandBar.displayName = "ResourceAllocationCommandBar";
exports.default = ResourceAllocationCommandBar;
