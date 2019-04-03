import * as React from "react";
import __ from "../../../Resources";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import ITasksOverviewDetailsModalProps from "./ITasksOverviewDetailsModalProps";

export default class TasksOverviewDetailsModal extends React.PureComponent<ITasksOverviewDetailsModalProps, {}> {
    public static displayName = "TasksOverviewDetailsModal";

    /**
     * Constructor
     *
     * @param {ITasksOverviewDetailsModalProps} props Props
     */
    constructor(props: ITasksOverviewDetailsModalProps) {
        super(props);
    }

    /**
     * Renders the <TasksOverviewDetailsModal /> component
     */
    public render(): JSX.Element {
        if (this.props.task) {
            return (
                <Modal
                    isOpen={true}
                    isBlocking={false}
                    onDismiss={this.props.onDismiss}>
                    <div style={{ padding: 50, maxWidth: 400 }}>
                        {this._renderHeader()}
                        {this._renderBody()}
                    </div>
                </Modal >
            );
        }
        return null;
    }

    /***
     * Renders the modal header
     */
    protected _renderHeader() {
        return (
            <div>
                {/* <h3>
                    {allocation.role || allocation.absence} ({allocation.allocationPercentage}%)
                </h3> */}
            </div>
        );
    }

    /**
     * Renders the modal body
     */
    protected _renderBody() {
        return (
            <div>
                {/* {allocation.workDescription &&
                    <p>
                        <span>{allocation.workDescription}</span>
                    </p>
                }
                <p>
                    <b>{__.getResource("String_Resource")}:</b>&nbsp;
                    <span>{allocation.user.name}</span>
                </p>
                <p>
                    <b>{__.getResource("String_From")}:</b>&nbsp;
                    <span>{allocation.start_time.format("LL")}</span>
                </p>
                <p>
                    <b>{__.getResource("String_To")}:</b>&nbsp;
                    <span>{allocation.end_time.format("LL")}</span>
                </p>
                {allocation.project && allocation.project.url &&
                    <p>
                        <b>{__.getResource("String_Project")}:</b>&nbsp;
                        <a href={allocation.project.url} style={{ outline: "none" }} target="_blank"><span>{allocation.project.name}</span></a>
                    </p>
                } */}
            </div>
        );
    }
}
