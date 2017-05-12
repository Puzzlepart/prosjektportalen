import * as React from "react";
import {
    DialogType,
    Icon,
} from "office-ui-fabric-react";
import NewProjectDialog from "./NewProjectDialog";

export interface INewProjectLinkProps {
    iconName?: string;
}
export interface INewProjectLinkState {
    showDialog: boolean;
}

/**
 * New Project link
 */
export default class NewProjectLink extends React.PureComponent<INewProjectLinkProps, INewProjectLinkState> {
    public static defaultProps: Partial<INewProjectLinkProps> = {
        iconName: "CirclePlus",
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            showDialog: false,
        };
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return (<div className="container">
            <a
                className="ms-font-l"
                href="#"
                onClick={e => this.setState({ showDialog: true })}>
                <Icon
                    iconName={this.props.iconName}
                    style={{
                        verticalAlign: "bottom",
                        marginRight: 5,
                    }} />
                <span>{__("NewProjectForm_Header")}</span>
            </a>
            {this.renderDialog()}
        </div>);
    }

    /**
     * Renders the dialog
     */
    private renderDialog = () => {
        return (
            <NewProjectDialog
                dialogProps={{
                    isOpen: this.state.showDialog,
                    type: DialogType.largeHeader,
                    isDarkOverlay: true,
                    isBlocking: false,
                    title: __("NewProjectForm_DialogTitle"),
                    className: "pp-newprojectdialog",
                    onDismiss: () => this.setState({ showDialog: false }),
                }} />
        );
    }
};
