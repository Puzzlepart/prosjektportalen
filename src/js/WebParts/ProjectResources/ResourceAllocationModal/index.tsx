import * as React from "react";
import { Modal, IModalProps } from "office-ui-fabric-react/lib/Modal";
import { ProjectResourceAllocation } from "../ProjectResourcesModels";

export interface IResourceAllocationModalProps extends IModalProps {
    allocation?: ProjectResourceAllocation;
}

export default class ResourceAllocationModal extends React.Component<IResourceAllocationModalProps, {}> {
    public static displayName = "ResourceAllocationModal";

    /**
     * Constructor
     *
     * @param {IResourceAllocationModalProps} props Props
     */
    constructor(props: IResourceAllocationModalProps) {
        super(props);
    }

    /**
     * Renders the <ResourceAllocationModal /> component
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

    protected _renderHeader() {
        return (
            <div>
                <h3>{this.props.allocation.role} ({this.props.allocation.load}%)</h3>
            </div>
        );
    }

    protected _renderBody() {
        return (
            <div>
                <p><b>Fra:</b> {this.props.allocation.start.fromNow()}</p>
                <p><b>Til:</b> {this.props.allocation.end.fromNow()}</p>
                <p><b>Prosjekt:</b> {this.props.allocation.project}</p>
            </div>
        );
    }
}
