import * as React from "react";
import NewProjectFormRenderMode from "./NewProjectFormRenderMode";
import INewProjectFormProps from "./INewProjectFormProps";
import INewProjectFormState from "./INewProjectFormState";
/**
 * Component: NewProjectForm
 */
export default class NewProjectForm extends React.Component<INewProjectFormProps, INewProjectFormState> {
    static displayName: string;
    static defaultProps: Partial<INewProjectFormProps>;
    private doesWebExistDelay;
    /**
     * Constructor
     *
     * @param {INewProjectFormProps} props Props
     */
    constructor(props: INewProjectFormProps);
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<INewProjectFormProps>;
    /**
     * Render inner (form inputs, setting section and footer)
     */
    private renderInner;
    /**
     * Render form input section
     */
    private renderFormInputSection;
    /**
     * Render footer
     */
    private renderFooter;
    /**
     *
     */
    private onFormInputChange;
    /**
     * Toggle content
     *
     * @param {ListConfig} lc List config
     * @param {boolean} checked Is checked
     */
    private onToggleListContent;
    /**
     * Toggle extension
     *
     * @param {Extension} extension Extension
     * @param {boolean} checked Is checked
     */
    private onToggleExtension;
    /**
     * Submits the form
     */
    private onSubmitForm;
    /**
     * Get required config for the component
     *
     * @returns {INewProjectFormConfig} An object of interface INewProjectFormConfig
     */
    private getRequiredConfig;
}
export { NewProjectFormRenderMode, INewProjectFormProps, INewProjectFormState, };
