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
                        {this.renderHeader()}
                        {this.renderBody()}
                    </div>
                </Modal >
            );
        }
        return null;
    }

    /***
     * Renders the modal header
     */
    protected renderHeader() {
        const { task } = this.props;
        return (
            <div>
                <h3>{task.title}</h3>
            </div>
        );
    }

    /**
     * Renders the modal body
     */
    protected renderBody() {
        const { task } = this.props;
        const { item } = task;
        return (
            <div>
                {item.RefinableString52 &&
                    <p>
                        <b>Fase:</b>&nbsp;
                        <span>{item.RefinableString52}</span>
                    </p>
                }
                {item.AssignedTo &&
                    <p>
                        <b>Tilordnet til:</b>&nbsp;
                        <span>{item.AssignedTo}</span>
                    </p>
                }
                {item.StatusOWSCHCS &&
                    <p>
                        <b>Status:</b>&nbsp;
                        <span>{item.StatusOWSCHCS}</span>
                    </p>
                }
                {item.PercentCompleteOWSNMBR &&
                    <p>
                        <b>% fullført:</b>&nbsp;
                        <span>{Math.round(parseFloat(item.PercentCompleteOWSNMBR) * 100)}%</span>
                    </p>
                }
                <p>
                    <b>Startdato:</b>&nbsp;
                    <span>{task.start_time.format("LL")}</span>
                </p>
                <p>
                    <b>Forfallsdato:</b>&nbsp;
                    <span>{task.end_time.format("LL")}</span>
                </p>
                <p>
                    <b>{__.getResource("String_Project")}:</b>&nbsp;
                    <a href={item.SPWebUrl} style={{ outline: "none" }} target="_blank"><span>{item.SiteTitle}</span></a>
                </p>
                <p style={{ marginTop: 20 }}>
                    <a href={item.Path} style={{ outline: "none" }} target="_blank"><span>Gå til elementet (åpnes i ny fane)</span></a>
                </p>
            </div>
        );
    }
}
