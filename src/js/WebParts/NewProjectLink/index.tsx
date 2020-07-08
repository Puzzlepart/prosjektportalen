//#region Imports
import * as React from 'react'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import INewProjectLinkProps, { NewProjectLinkDefaultProps } from './INewProjectLinkProps'
import INewProjectLinkState from './INewProjectLinkState'
import SecuredWebPart from '../@SecuredWebPart'
import NewProjectForm, { NewProjectFormRenderMode } from '../NewProjectForm'
//#endregion

/**
 * New Project link
 */
export default class NewProjectLink extends SecuredWebPart<INewProjectLinkProps, INewProjectLinkState> {
    public static displayName = 'NewProjectLink';
    public static defaultProps = NewProjectLinkDefaultProps;

    /**
     * Constructor
     *
     * @param {INewProjectLinkProps} props Props
     */
    constructor(props: INewProjectLinkProps) {
        super(props, { listDataConfig: {} })
        this._onDialogDismiss = this._onDialogDismiss.bind(this)
        this._onOpenDialog = this._onOpenDialog.bind(this)
    }

    /**
     * Component did mount
     */
    public async componentDidMount(): Promise<void> {
        await this.onInit()
    }

    public render(): JSX.Element {
        return (
            <div>
                <ActionButton
                    disabled={!this.state.shouldRender}
                    style={{ margin: 0 }}
                    iconProps={this.props.iconProps}
                    text={this.props.linkText}
                    onClick={this._onOpenDialog} />
                {this.renderDialog()}
            </div>
        )
    }

    /**
     * Renders the dialog
     */
    private renderDialog() {
        if (this.state.showDialog) {
            return (
                <NewProjectForm
                    renderMode={NewProjectFormRenderMode.Dialog}
                    onDialogDismiss={this._onDialogDismiss}
                    headerText={this.props.dlgHeaderText}
                    subHeaderText={this.props.dlgSubHeaderText}
                    creationModalTitle={this.props.creationModalTitle} />
            )
        }
        return null
    }

    private _onOpenDialog() {
        this.setState({ showDialog: true })
    }

    private _onDialogDismiss() {
        this.setState({ showDialog: false })
    }
}

export {
    INewProjectLinkProps,
    INewProjectLinkState,
}
