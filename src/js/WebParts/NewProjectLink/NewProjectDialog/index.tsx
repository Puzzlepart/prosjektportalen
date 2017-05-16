import * as React from "react";
import ProvisionWeb from "../../../Provision";
import * as ListDataConfig from "../../../Provision/Data/Config";
import {
    Dialog,
    DialogFooter,
    Button,
    ButtonType,
    TextField,
    Toggle,
} from "office-ui-fabric-react/lib";
import * as Util from "../../../Util";
import INewProjectDialogProps from "./INewProjectDialogProps";
import INewProjectDialogState from "./INewProjectDialogState";
import CreationModal from "./CreationModal";

/**
 * New Project dialog
 */
export default class NewProjectDialog extends React.Component<INewProjectDialogProps, INewProjectDialogState> {
    public static defaultProps: Partial<INewProjectDialogProps> = {
        titleMinLength: 4,
        advancedSectionClassName: "advanced",
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            showAdvancedSettings: false,
            formValid: false,
            listDataConfig: null,
            urlInputEnabled: true,
            model: {
                Title: "",
                Description: "",
                Url: "",
                InheritPermissions: false,
            },
            showCreationModal: false,
            provisioning: {
                isCreating: false,
                step: "",
                progress: "",
            },
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        ListDataConfig.RetrieveConfig().then(listDataConfig => {
            this.setState(prevState => ({
                listDataConfig: listDataConfig,
                model: {
                    ...prevState.model,
                    IncludeContent: Object.keys(listDataConfig).filter(key => listDataConfig[key].Default),
                },
            }));
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.state.provisioning.error) {
            return null;
        }
        if (this.state.showCreationModal) {
            return (
                <CreationModal
                    title={String.format(__("CreationModal_Title"), this.state.model.Title)}
                    isBlocking={true}
                    isDarkOverlay={true}
                    progressLabel={this.state.provisioning.step}
                    progressDescription={this.state.provisioning.progress} />
            );
        }
        return (
            <Dialog
                isOpen={this.props.dialogProps.isOpen}
                type={this.props.dialogProps.type}
                isDarkOverlay={this.props.dialogProps.isDarkOverlay}
                isBlocking={this.props.dialogProps.isBlocking}
                title={this.props.dialogProps.title}
                subText={this.props.dialogProps.subText}
                className={this.props.dialogProps.className}
                onDismiss={this.props.dialogProps.onDismiss}>
                {this.renderForm(this.state)}
                {this.renderAdvancedSection(this.state)}
                {this.renderFooter()}
            </Dialog >
        );
    }

    /**
     * Render form
     *
     * @param titlePlaceHolder Placeholder for title field
     * @param descPlaceholder Placeholder for description field
     * @param urlPlaceholder Placeholder for url field
     */
    private renderForm = ({ model, urlInputEnabled }: INewProjectDialogState, titlePlaceHolder = __("NewProjectForm_Title"), descPlaceholder = __("NewProjectForm_Description"), urlPlaceholder = __("NewProjectForm_Url")) => {
        return <div>
            <TextField
                placeholder={titlePlaceHolder}
                onChanged={this.onTitleChanged} />
            <TextField
                placeholder={descPlaceholder}
                multiline
                autoAdjustHeight
                onChanged={newValue => this.setState(prevState => ({
                    model: {
                        ...prevState.model,
                        Description: newValue,
                    },
                }))}
            />
            <TextField
                placeholder={urlPlaceholder}
                value={model.Url}
                onChanged={newValue => this.setState(prevState => ({
                    model: {
                        ...prevState.model,
                        Url: newValue,
                    },
                }))}
                disabled={!urlInputEnabled} />
        </div>;
    }

    /**
     * Render advanced section
     */
    private renderAdvancedSection = ({ showAdvancedSettings, listDataConfig }: INewProjectDialogState) => {
        return (
            <div>
                <Toggle
                    defaultChecked={this.state.showAdvancedSettings}
                    label={__("NewProjectForm_ShowAdvancedSettings")}
                    onText={__("String_Yes")}
                    offText={__("String_No")}
                    onChanged={this.toggleAdvancedSettings} />
                {(showAdvancedSettings && listDataConfig) && (
                    <section
                        className={this.props.advancedSectionClassName}>
                        {Object.keys(listDataConfig).map(key => (
                            <Toggle
                                key={key}
                                defaultChecked={listDataConfig[key].Default}
                                label={listDataConfig[key].Label}
                                onChanged={checked => this.toggleContent(key, checked)}
                                onText={__("String_Yes")}
                                offText={__("String_No")} />
                        ))}
                    </section>
                )}
            </div>
        );
    }

    /**
     * Render footer
     */
    private renderFooter = () => {
        return (
            <DialogFooter>
                <Button
                    buttonType={ButtonType.primary}
                    onClick={this.onSubmit}
                    disabled={!this.state.formValid}>{__("String_Create")}</Button>
                <Button onClick={() => this.props.dialogProps.onDismiss()}>{__("String_Close")}</Button>
            </DialogFooter>
        );
    }

    /**
     * Toggle advanced settings section
     */
    private toggleAdvancedSettings = (): void => {
        this.setState(prevState => ({ showAdvancedSettings: !prevState.showAdvancedSettings }));
    }

    /**
     * Toggle content
     */
    private toggleContent = (key: string, checked: boolean): void => {
        this.setState(prevState => {
            let { IncludeContent } = prevState.model;
            if (checked) {
                IncludeContent.push(key);
            } else {
                IncludeContent.splice(IncludeContent.indexOf(key), 1);
            }
            return {
                model: {
                    ...prevState.model,
                    IncludeContent: IncludeContent,
                },
            };
        });
    }

    /**
     * On title changed
     *
     * @param newTitleValue New Title value
     */
    private onTitleChanged = (newTitleValue: string): void => {
        const url = Util.generateUrl(newTitleValue);
        this.setState(prevState => ({
            formValid: newTitleValue.length >= this.props.titleMinLength,
            model: {
                ...prevState.model,
                Title: newTitleValue,
                Url: url,
            },
        }));
    }

    /**
     * Submit handler
     */
    private onSubmit = (event): void => {
        event.preventDefault();
        this.setState({
            showCreationModal: true,
            provisioning: {
                isCreating: true,
            },
        }, () => {
            ProvisionWeb(this.state.model, (step, progress) => {
                this.setState({
                    provisioning: {
                        isCreating: true,
                        step: step,
                        progress: progress,
                    },
                });
            })
                .then(redirectUrl => {
                    document.location.href = redirectUrl;
                })
                .catch(error => {
                    this.setState({
                        provisioning: {
                            isCreating: false,
                            error: error,
                        },
                    });
                });
        });
    }
}
