import * as React from "react";
import RESOURCE_MANAGER from "localization";
import ProvisionWeb, { DoesWebExist } from "../../../Provision";
import * as ListDataConfig from "../../../Provision/Data/Config";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import {
    PrimaryButton,
    DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import {
    Dialog,
    DialogFooter,
    DialogType,
} from "office-ui-fabric-react/lib/Dialog";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as Util from "../../../Util";
import { IProjectModel } from "../../../Model";
import INewProjectDialogProps, { NewProjectDialogDefaultProps } from "./INewProjectDialogProps";
import INewProjectDialogState from "./INewProjectDialogState";
import CreationModal from "./CreationModal";

/**
 * New Project dialog
 */
export default class NewProjectDialog extends React.Component<INewProjectDialogProps, INewProjectDialogState> {
    public static displayName = "NewProjectDialog";
    public static defaultProps = NewProjectDialogDefaultProps;
    private doesWebExistTimer;
    private doesWebExistTimerDelay = 250;

    /**
     * Constructor
     *
     * @param {INewProjectDialogProps} props Props
     */
    constructor(props: INewProjectDialogProps) {
        super(props);
        this.state = {
            isLoading: true,
            errorMessages: {},
            urlInputEnabled: true,
            model: {
                Title: "",
                Description: "",
                Url: "",
                InheritPermissions: false,
            },
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
        ListDataConfig.RetrieveConfig()
            .then(listDataConfig => {
                this.setState(prevState => ({
                    isLoading: false,
                    listDataConfig,
                    model: {
                        ...prevState.model,
                        IncludeContent: Object.keys(listDataConfig).filter(key => listDataConfig[key].Default),
                    },
                }));
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
     * @param {INewProjectDialogProps} param0 Props
     * @param {INewProjectDialogState} param1 State
     */
    public _render({ dialogProps }: INewProjectDialogProps, { isLoading, model, provisioning }: INewProjectDialogState): JSX.Element {
        /**
         * If we have a error in provisioning we show a message in a modal
         */
        if (provisioning.error) {
            return (
                <Modal
                    isOpen={true}
                    isBlocking={false}
                    isDarkOverlay={true}
                    onDismiss={dialogProps.onDismiss}
                    containerClassName="pp-modal"
                >
                    <div style={{ padding: 50 }}>
                        <div
                            style={{ marginBottom: 25 }}
                            className="ms-font-xl">{RESOURCE_MANAGER.getResource("ProvisionWeb_Failed")}</div>
                        <div className="ms-font-m">{RESOURCE_MANAGER.getResource("String_ContactAdmin")}</div>
                    </div>
                </Modal>
            );
        }

        /**
        * During creation we show CreationModal
        */
        if (provisioning.isCreating) {
            return (
                <CreationModal
                    title={String.format(RESOURCE_MANAGER.getResource("CreationModal_Title"), model.Title)}
                    isBlocking={true}
                    isDarkOverlay={true}
                    progressLabel={provisioning.step}
                    progressDescription={provisioning.progress} />
            );
        }

        /**
         * Otherwise we show the new project dialog
         */
        return (
            <Dialog
                hidden={false}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    subText: RESOURCE_MANAGER.getResource("NewProjectForm_SubText"),
                }}
                modalProps={{
                    className: "pp-newprojectdialog",
                    isDarkOverlay: true,
                    isBlocking: true,
                }}
                title={RESOURCE_MANAGER.getResource("NewProjectForm_DialogTitle")}
                onDismiss={dialogProps.onDismiss}>
                {isLoading ?
                    <Spinner type={SpinnerType.large} />
                    :
                    <div>
                        {this.renderForm(this.props, this.state)}
                        {this.renderAdvancedSection(this.props, this.state)}
                        {this.renderFooter(this.props, this.state)}
                    </div>}
            </Dialog >
        );
    }

    /**
     * Render form
     *
     * @param {INewProjectDialogProps} param0 Props
     * @param {INewProjectDialogState} param1 State
     */
    private renderForm = ({ }: INewProjectDialogProps, { model, errorMessages, urlInputEnabled }: INewProjectDialogState) => {
        return (
            <div>
                <TextField
                    placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_Title")}
                    onChanged={newValue => this.onFormChange("Title", newValue)}
                    errorMessage={errorMessages.Title} />
                <TextField
                    placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_Description")}
                    multiline
                    autoAdjustHeight
                    onChanged={newValue => this.onFormChange("Description", newValue)}
                    errorMessage={errorMessages.Description}
                />
                <TextField
                    placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_Url")}
                    value={model.Url}
                    onChanged={newValue => this.onFormChange("Url", newValue)}
                    errorMessage={errorMessages.Url}
                    disabled={!urlInputEnabled} />
            </div>
        );
    }

    /**
     * Render advanced section
     *
     * @param {INewProjectDialogProps} param0 Props
     * @param {INewProjectDialogState} param1 State
     */
    private renderAdvancedSection = ({ advancedSectionClassName }: INewProjectDialogProps, { showAdvancedSettings, listDataConfig }: INewProjectDialogState) => {
        return (
            <div>
                <Toggle
                    defaultChecked={showAdvancedSettings}
                    label={RESOURCE_MANAGER.getResource("NewProjectForm_ShowAdvancedSettings")}
                    onText={RESOURCE_MANAGER.getResource("String_Yes")}
                    offText={RESOURCE_MANAGER.getResource("String_No")}
                    onChanged={this.toggleAdvancedSettings} />
                {(showAdvancedSettings && listDataConfig) && (
                    <section
                        className={advancedSectionClassName}>
                        {Object.keys(listDataConfig).map(key => (
                            <Toggle
                                key={key}
                                defaultChecked={listDataConfig[key].Default}
                                label={listDataConfig[key].Label}
                                onChanged={checked => this.toggleContent(key, checked)}
                                onText={RESOURCE_MANAGER.getResource("String_Yes")}
                                offText={RESOURCE_MANAGER.getResource("String_No")} />
                        ))}
                    </section>
                )}
            </div>
        );
    }

    /**
     * Render footer
     *
     * @param {INewProjectDialogProps} param0 Props
     * @param {INewProjectDialogState} param1 State
     */
    private renderFooter = ({ dialogProps }: INewProjectDialogProps, { formValid }: INewProjectDialogState) => {
        return (
            <DialogFooter>
                <PrimaryButton
                    onClick={this.onSubmit}
                    disabled={!formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                <DefaultButton onClick={() => dialogProps.onDismiss()}>{RESOURCE_MANAGER.getResource("String_Close")}</DefaultButton>
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
     *
     * @param {string} key Key
     * @param {boolean} checked Is checked
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
     * @param {string} input Input (key) that was changed
     * @param {string} newTitleValue New Title value
     */
    private onFormChange = (input: string, newValue: string): void => {
        const {
            model,
            errorMessages,
         } = this.state;

        switch (input) {
            case "Title": {
                const url = Util.generateUrl(newValue, this.props.maxUrlLength);
                if (this.doesWebExistTimer) {
                    window.clearTimeout(this.doesWebExistTimer);
                }
                this.doesWebExistTimer = window.setTimeout(() => {
                    DoesWebExist(url).then(doesExist => {
                        this.setState({
                            errorMessages: {
                                ...errorMessages,
                                Url: doesExist ? RESOURCE_MANAGER.getResource("NewProjectForm_UrlAlreadyInUse") : null,
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
                                    Url: doesExist ? RESOURCE_MANAGER.getResource("NewProjectForm_UrlAlreadyInUse") : null,
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
     *
     * @param {any} Event Click event
     */
    private onSubmit = (event?): void => {
        if (event) {
            event.preventDefault();
        }
        this._onSubmit(this.state.model);
    }

    /**
     * Submits a project model
     *
     * @param {IProjectModel} model Project model
     */
    private _onSubmit = (model: IProjectModel): void => {
        this.setState({
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
                        provisioning: {
                            isCreating: false,
                            error,
                        },
                    });
                });
        });
    }
}
