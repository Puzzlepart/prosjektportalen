import * as React from "react";
import { DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as Util from "../../Util";
import AudienceTargeting from "../AudienceTargeting";
import NewProjectDialog from "./NewProjectDialog";
import INewProjectLinkProps, { NewProjectLinkDefaultProps } from "./INewProjectLinkProps";
import INewProjectLinkState from "./INewProjectLinkState";

/**
 * New Project link
 */
export default class NewProjectLink extends React.PureComponent<INewProjectLinkProps, INewProjectLinkState> {
    public static defaultProps = NewProjectLinkDefaultProps;

    /**
     * Constructor
     */
    constructor(props: INewProjectLinkProps) {
        super(props);
        this.state = {
            showDialog: false,
            shouldRender: props.audienceTargeting === AudienceTargeting.None,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        Util.doesUserMatchAudience(this.props.audienceTargeting).then(doesMatch => {
            console.log(doesMatch);
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    private _render({ linkClassName, iconProps }: INewProjectLinkProps, { shouldRender }: INewProjectLinkState): JSX.Element {
        if (!shouldRender) {
            return null;
        }
        return (
            <div>
                <div>
                    <a
                        className={linkClassName}
                        href="#"
                        onClick={e => this.setState({ showDialog: true })}>
                        <Icon { ...iconProps } />
                        <span>{__("NewProjectForm_Header")}</span>
                    </a>
                </div>
                {this.renderDialog(this.state)}
            </div>
        );
    }

    /**
     * Renders the dialog
     */
    private renderDialog = ({ showDialog, autoGenerate }: INewProjectLinkState) => {
        return (
            <NewProjectDialog
                autoGenerate={autoGenerate}
                dialogProps={{
                    isOpen: showDialog,
                    type: DialogType.largeHeader,
                    isDarkOverlay: true,
                    isBlocking: false,
                    title: __("NewProjectForm_DialogTitle"),
                    subText: __("NewProjectForm_SubText"),
                    className: "pp-newprojectdialog",
                    onDismiss: () => this.setState({ showDialog: false }),
                }} />
        );
    }
}
