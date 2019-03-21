import * as React from "react";
import IResourceAllocationDetailsModalProps from "./IResourceAllocationDetailsModalProps";
export default class ResourceAllocationDetailsModal extends React.PureComponent<IResourceAllocationDetailsModalProps, {}> {
    static displayName: string;
    /**
     * Constructor
     *
     * @param {IResourceAllocationDetailsModalProps} props Props
     */
    constructor(props: IResourceAllocationDetailsModalProps);
    /**
     * Renders the <ResourceAllocationDetailsModal /> component
     */
    render(): JSX.Element;
    /***
     * Renders the modal header
     */
    protected _renderHeader(): JSX.Element;
    /**
     * Renders the modal body
     */
    protected _renderBody(): JSX.Element;
}
