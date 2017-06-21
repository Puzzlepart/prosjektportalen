import * as React from "react";
import * as uuid_v1 from "uuid/v1";
import ProvisionWeb, { DoesWebExist } from "../../../Provision";
import * as ListDataConfig from "../../../Provision/Data/Config";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import {
    Dialog,
    DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
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

    private doesWebExistTimer;
    private doesWebExistTimerDelay = 250;

    /**
     * Constructor
     */
    constructor(props: INewProjectDialogProps) {
        super(props);
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
            errorMessages: {},
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
        if (this.props.autoGenerate) {
            let title = uuid_v1();
            this._onSubmit({
                Title: title,
                Url: title,
                Description: "",
                InheritPermissions: false,
                IncludeContent: [],
            });
        }
    }

    /**
     * Component did mount
     */
    public componentDidUpdate(prevProps: INewProjectDialogProps): void {
        if (this.props.autoGenerate !== prevProps.autoGenerate && this.props.autoGenerate) {
            let title = uuid_v1();
            this.setState({
                model: {
                    Title: title,
                    Url: title,
                    Description: "",
                    InheritPermissions: false,
                },
            }, () => {
                this._onSubmit(this.state.model);
            });
        }
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.state.showCreationModal) {
            if (this.state.provisioning.error) {
                return null;
            }
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
    private renderForm = ({ model, errorMessages, urlInputEnabled }: INewProjectDialogState, titlePlaceHolder = __("NewProjectForm_Title"), descPlaceholder = __("NewProjectForm_Description"), urlPlaceholder = __("NewProjectForm_Url")) => {
        return (
            <div>
                <TextField
                    placeholder={titlePlaceHolder}
                    onChanged={newValue => this.onFormChange("Title", newValue)}
                    errorMessage={errorMessages.Title} />
                <TextField
                    placeholder={descPlaceholder}
                    multiline
                    autoAdjustHeight
                    onChanged={newValue => this.onFormChange("Description", newValue)}
                    errorMessage={errorMessages.Description}
                />
                <TextField
                    placeholder={urlPlaceholder}
                    value={model.Url}
                    onChanged={newValue => this.onFormChange("Url", newValue)}
                    errorMessage={errorMessages.Url}
                    disabled={!urlInputEnabled} />
            </div>
        );
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
                <PrimaryButton
                    onClick={this.onSubmit}
                    disabled={!this.state.formValid}>{__("String_Create")}</PrimaryButton>
                <PrimaryButton onClick={() => this.props.dialogProps.onDismiss()}>{__("String_Close")}</PrimaryButton>
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
     * On form change
     *
     * @param input Input (key) that was changed
     * @param newTitleValue New Title value
     */
    private onFormChange = (input: string, newValue: string): void => {
        const {
            model,
            errorMessages,
         } = this.state;

        switch (input) {
            case "Title": {
                const url = Util.generateUrl(newValue);
                if (this.doesWebExistTimer) {
                    window.clearTimeout(this.doesWebExistTimer);
                }
                this.doesWebExistTimer = window.setTimeout(() => {
                    DoesWebExist(url).then(doesExist => {
                        this.setState({
                            errorMessages: {
                                ...errorMessages,
                                Url: doesExist ? __("NewProjectForm_UrlAlreadyInUse") : null,
                            },
                            formValid: (newValue.length >= this.props.titleMinLength) && !doesExist,
                            model: {
                                ...model,
                                Title: newValue,
                                Url: url,
                            },
                        });
                    });
                }, this.doesWebExistTimerDelay);
            }
                break;
            case "Url": {
                if (this.doesWebExistTimer) {
                    window.clearTimeout(this.doesWebExistTimer);
                }
                this.doesWebExistTimer = window.setTimeout(() => {
                    DoesWebExist(newValue)
                        .then(doesExist => {
                            this.setState({
                                errorMessages: {
                                    ...errorMessages,
                                    Url: doesExist ? __("NewProjectForm_UrlAlreadyInUse") : null,
                                },
                                formValid: (model.Title.length >= this.props.titleMinLength) && !doesExist,
                                model: {
                                    ...model,
                                    Url: newValue,
                                },
                            });
                        });
                }, this.doesWebExistTimerDelay);
            }
                break;
            case "Description": {
                this.setState({
                    formValid: (model.Title.length >= this.props.titleMinLength),
                    model: {
                        ...model,
                        Description: newValue,
                    },
                });
            }
                break;
        }
    }

    /**
     * Submit handler
     */
    private onSubmit = (event?): void => {
        if (event) {
            event.preventDefault();
        }
        this._onSubmit(this.state.model);
    }

    private _onSubmit = (model): void => {
        this.setState({
            showCreationModal: true,
            provisioning: {
                isCreating: true,
            },
        }, () => {
            ProvisionWeb(model, (step, progress) => {
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
                        showCreationModal: false,
                        provisioning: {
                            isCreating: false,
                            error: error,
                        },
                    });
                });
        });
    }
}
