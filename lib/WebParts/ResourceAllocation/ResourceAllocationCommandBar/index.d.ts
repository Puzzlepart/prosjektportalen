import * as React from "react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import IResourceAllocationCommandBarProps from "./IResourceAllocationCommandBarProps";
export default class ResourceAllocationCommandBar extends React.Component<IResourceAllocationCommandBarProps, {}> {
    static displayName: string;
    protected _items: Array<IContextualMenuItem>;
    protected _farItems: Array<IContextualMenuItem>;
    /**
     * Constructor
     *
     * @param {IResourceAllocationCommandBarProps} props Props
     */
    constructor(props: IResourceAllocationCommandBarProps);
    /**
     * Component will update
     *
     * @param {IResourceAllocationCommandBarProps} newProps New props
     */
    componentWillUpdate(newProps: IResourceAllocationCommandBarProps): void;
    /**
     * Initialize command bar items
     *
     * @param {IResourceAllocationCommandBarProps} props Props
     */
    protected _initItems(props: IResourceAllocationCommandBarProps): void;
    /**
     * Get options for projects, roles and resources
     */
    protected _getOptions(): {
        projects: any;
        resources: {
            key: string;
            name: string;
            onClick: (event: any) => void;
        }[];
        roles: any;
    };
    /**
     * Renders the <ResourceAllocationCommandBar /> component
     */
    render(): JSX.Element;
    protected _onSelectionUpdate(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, { project, user, role }: {
        project: any;
        user: any;
        role: any;
    }): void;
}
