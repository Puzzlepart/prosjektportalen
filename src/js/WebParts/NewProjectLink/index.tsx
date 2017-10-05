import * as React from "react";
import RESOURCE_MANAGER from "localization";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as ListDataConfig from "../../Provision/Data/Config";
import NewProjectDialog from "./NewProjectDialog";
import INewProjectLinkProps, { NewProjectLinkDefaultProps } from "./INewProjectLinkProps";
import INewProjectLinkState from "./INewProjectLinkState";
import SecuredWebPart from "../@SecuredWebPart";

/**
 * New Project link
 */
export default class NewProjectLink extends SecuredWebPart<INewProjectLinkProps, INewProjectLinkState> {
    public static displayName = "NewProjectLink";
    public static defaultProps = NewProjectLinkDefaultProps;

    /**
     * Constructor
     *
     * @param {INewProjectLinkProps} props Props
     */
    constructor(props: INewProjectLinkProps) {
        super(props, { listDataConfig: {} });
    }

    /**
     * Component did mount. Handling audience.
     */
    public async componentDidMount(): Promise<void> {
        await this.onInit();
        if (this.state.shouldRender) {
            const listDataConfig = await ListDataConfig.RetrieveConfig();
            this.setState({ listDataConfig });
        }
    }

    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this.state.shouldRender ? this._render() : null;
    }

    /**
     * Renders the component
     */
    private _render(): JSX.Element {
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
    private renderLink({ linkClassName, iconProps }: INewProjectLinkProps, { }: INewProjectLinkState) {
        return (
            <div>
                <a
                    className={linkClassName}
                    href={_spPageContextInfo.webAbsoluteUrl}
                    onClick={e => {
                        e.preventDefault();
                        this.setState({ showDialog: true });
                    }}>
                    <Icon { ...iconProps } />
                    <span>{RESOURCE_MANAGER.getResource("NewProjectForm_Header")}</span>
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
    private renderDialog({ }: INewProjectLinkProps, { listDataConfig, showDialog }: INewProjectLinkState) {
        if (showDialog) {
            return (
                <NewProjectDialog
                    listDataConfig={listDataConfig}
                    dialogProps={{
                        onDismiss: () => this.setState({ showDialog: false }),
                    }} />
            );
        }
        return null;
    }
}
