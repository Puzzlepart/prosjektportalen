import * as React from "react";
import Localization from "localization";
import { DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import AudienceTargeting from "../AudienceTargeting";
import NewProjectDialog from "./NewProjectDialog";
import INewProjectLinkProps, { NewProjectLinkDefaultProps } from "./INewProjectLinkProps";
import INewProjectLinkState from "./INewProjectLinkState";
import BaseWebPart from "../@BaseWebPart";
import * as Util from "../../Util";

/**
 * New Project link
 */
export default class NewProjectLink extends BaseWebPart<INewProjectLinkProps, INewProjectLinkState> {
    public static displayName = "NewProjectLink";
    public static defaultProps = NewProjectLinkDefaultProps;

    /**
     * Constructor
     *
     * @param {INewProjectLinkProps} props Props
     */
    constructor(props: INewProjectLinkProps) {
        super(props, {
            shouldRender: props.audienceTargeting === AudienceTargeting.None,
        });
    }

    /**
     * Component did mount. Handling audience.
     */
    public componentDidMount(): void {
        /**
         * Checks if the web part should be rendered for the current user
        */
        Util.doesUserMatchAudience(this.props.audienceTargeting).then(userMatchAudience => {
            if (userMatchAudience !== this.state.shouldRender) {
                this.setState({
                    shouldRender: userMatchAudience,
                });
            }
        });
    }

    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {INewProjectLinkProps} param0 Props
     * @param {INewProjectLinkState} param1 State
     */
    private _render({ }: INewProjectLinkProps, { shouldRender }: INewProjectLinkState): JSX.Element {
        if (!shouldRender) {
            return null;
        }
        return (
            <div>
                {this.renderLink(this.props, this.state)}
                {this.renderDialog(this.props, this.state)}
            </div>
        );
    }

    /**
     * Renders the link
     *
     * @param {INewProjectLinkProps} param0 Props
     * @param {INewProjectLinkState} param1 State
     */
    private renderLink = ({ linkClassName, iconProps }: INewProjectLinkProps, { }: INewProjectLinkState) => {
        return (
            <div>
                <a
                    className={linkClassName}
                    href="#"
                    onClick={e => this.setState({ showDialog: true })}>
                    <Icon { ...iconProps } />
                    <span>{Localization.getResource("NewProjectForm_Header")}</span>
                </a>
            </div>
        );
    }

    /**
     * Renders the dialog
     *
     * @param {INewProjectLinkProps} param0 Props
     * @param {INewProjectLinkState} param1 State
     */
    private renderDialog = ({ }: INewProjectLinkProps, { showDialog }: INewProjectLinkState) => {
        if (showDialog) {
            return (
                <NewProjectDialog
                    dialogProps={{
                        type: DialogType.largeHeader,
                        isDarkOverlay: true,
                        isBlocking: false,
                        title: Localization.getResource("NewProjectForm_DialogTitle"),
                        subText: Localization.getResource("NewProjectForm_SubText"),
                        className: "pp-newprojectdialog",
                        onDismiss: () => this.setState({ showDialog: false }),
                    }} />
            );
        }
        return null;
    }
}
