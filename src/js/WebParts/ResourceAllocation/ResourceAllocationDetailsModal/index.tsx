import * as React from "react";
import __ from "../../../Resources";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import IResourceAllocationDetailsModalProps from "./IResourceAllocationDetailsModalProps";

export default class ResourceAllocationDetailsModal extends React.PureComponent<IResourceAllocationDetailsModalProps, {}> {
    public static displayName = "ResourceAllocationDetailsModal";

    /**
     * Constructor
     *
     * @param {IResourceAllocationDetailsModalProps} props Props
     */
    constructor(props: IResourceAllocationDetailsModalProps) {
        super(props);
    }

    /**
     * Renders the <ResourceAllocationDetailsModal /> component
     */
    public render(): JSX.Element {
        if (this.props.allocation) {
            return (
                <Modal
                    isOpen={true}
                    isBlocking={false}
                    onDismiss={this.props.onDismiss}>
                    <div style={{ padding: 50 }}>
                        {this._renderHeader()}
                        {this._renderBody()}
                    </div>
                </Modal>
            );
        }
        return null;
    }

    /***
     * Renders the modal header
     */
    protected _renderHeader() {
        const { allocation } = this.props;
        return (
            <div>
                <h3>
                    <a href={allocation.url} target="_blank">{allocation.resource.role} ({allocation.load}%)</a>
                </h3>
            </div>
        );
    }

    /**
     * Renders the modal body
     */
    protected _renderBody() {
        const { allocation } = this.props;
        return (
            <div>
                <p>
                    <b>{__.getResource("String_From")}:</b>&nbsp;
                    <span>{allocation.start_time.format("LL")}</span>
                </p>
                <p>
                    <b>{__.getResource("String_To")}:</b>&nbsp;
                    <span>{allocation.end_time.format("LL")}</span>
                </p>
                <p>
                    <b>{__.getResource("String_Project")}:</b>&nbsp;
                    <a href={allocation.project.url} target="_blank"><span>{allocation.project.name}</span></a>
                </p>
                <p>
                    <b>{__.getResource("String_Resource")}:</b>&nbsp;
                    <a href={allocation.resource.url} target="_blank"><span>{allocation.user.name}</span></a>
                </p>
            </div>
        );
    }
}
