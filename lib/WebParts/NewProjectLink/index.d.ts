/// <reference types="react" />
import INewProjectLinkProps from "./INewProjectLinkProps";
import INewProjectLinkState from "./INewProjectLinkState";
import SecuredWebPart from "../@SecuredWebPart";
/**
 * New Project link
 */
export default class NewProjectLink extends SecuredWebPart<INewProjectLinkProps, INewProjectLinkState> {
    static displayName: string;
    static defaultProps: Partial<INewProjectLinkProps>;
    /**
     * Constructor
     *
     * @param {INewProjectLinkProps} props Props
     */
    constructor(props: INewProjectLinkProps);
    /**
     * Component did mount
     */
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
    /**
     * Renders the dialog
     */
    private renderDialog;
    private _onOpenDialog;
    private _onDialogDismiss;
}
export { INewProjectLinkProps, INewProjectLinkState, };
