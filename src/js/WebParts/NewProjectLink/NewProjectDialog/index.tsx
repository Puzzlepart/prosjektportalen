import * as React from "react";
import RESOURCE_MANAGER from "localization";
import * as delay from "delay";
import ProvisionWeb, { DoesWebExist } from "../../../Provision";
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
import { Icon } from "office-ui-fabric-react/lib/Icon";
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
    private doesWebExistDelay;

    /**
     * Constructor
     *
     * @param {INewProjectDialogProps} props Props
     */
    constructor(props: INewProjectDialogProps) {
        super(props);
        this.state = {
            errorMessages: {},
            urlInputEnabled: true,
            model: {
                Title: "",
                Description: "",
                Url: "",
                InheritPermissions: false,
                IncludeContent: Object.keys(this.props.listDataConfig).filter(key => this.props.listDataConfig[key].Default),
            },
            provisioning: {
                isCreating: false,
                step: "",
                progress: "",
            },
        };
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
    public _render({ dialogProps, className }: INewProjectDialogProps, { model, provisioning }: INewProjectDialogState): JSX.Element {
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
                    containerClassName="pp-modal" >
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
                    isDarkOverlay: true,
                    isBlocking: true,
                    className,
                }}
                title={RESOURCE_MANAGER.getResource("NewProjectForm_DialogTitle")}
                onDismiss={dialogProps.onDismiss}>
                <div>
                    {this.renderForm(this.props, this.state)}
                    {this.renderAdvancedSection(this.props, this.state)}
                    {this.renderFooter(this.props, this.state)}
                </div>
            </Dialog >
        );
    }

    /**
     * Render form
     *
     * @param {INewProjectDialogProps} param0 Props
     * @param {INewProjectDialogState} param1 State
     */
    private renderForm({ }: INewProjectDialogProps, { model, errorMessages, urlInputEnabled }: INewProjectDialogState): JSX.Element {
        return (
            <section>
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
            </section>
        );
    }

    /**
     * Render advanced section
     *
     * @param {INewProjectDialogProps} param0 Props
     * @param {INewProjectDialogState} param1 State
     */
    private renderAdvancedSection({ listDataConfig, advancedSettingsClassName }: INewProjectDialogProps, { showListContentSettings }: INewProjectDialogState) {
        return (
            <div className={advancedSettingsClassName}>
                <div
                    onClick={e => this.setState({ showListContentSettings: !showListContentSettings })}
                    className="ms-font-l toggle-section">
                    <span>{RESOURCE_MANAGER.getResource("NewProjectForm_ShowListContentSettings")}</span>
                    <span className={showListContentSettings ? "ChevronUp" : "ChevronDown"}>
                        <Icon iconName={showListContentSettings ? "ChevronUp" : "ChevronDown"} />
                    </span>
                </div>
                <section hidden={!showListContentSettings}>
                    {Object.keys(listDataConfig).map(key => {
                        const { Default, Label } = listDataConfig[key];
                        return (
                            <Toggle
                                key={key}
                                defaultChecked={Default}
                                label={Label}
                                onChanged={checked => this.toggleContent(key, checked)}
                                onText={RESOURCE_MANAGER.getResource("String_Yes")}
                                offText={RESOURCE_MANAGER.getResource("String_No")} />
                        );
                    })}
                </section>
            </div>
        );
    }

    /**
     * Render footer
     *
     * @param {INewProjectDialogProps} param0 Props
     * @param {INewProjectDialogState} param1 State
     */
    private renderFooter({ dialogProps }: INewProjectDialogProps, { formValid }: INewProjectDialogState) {
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
    private async onFormChange(input: string, newValue: string) {
        const self = this;

        const {
            model,
            errorMessages,
         } = this.state;

        switch (input) {
            case "Title": {
                const url = Util.cleanString(newValue, this.props.maxUrlLength);
                if (this.doesWebExistDelay) {
                    this.doesWebExistDelay.cancel();
                    this.doesWebExistDelay = null;
                }
                this.doesWebExistDelay = delay(250);
                try {
                    await this.doesWebExistDelay;
                    const doesExist = await DoesWebExist(url);
                    self.setState({
                        errorMessages: {
                            ...errorMessages,
                            Url: doesExist ? RESOURCE_MANAGER.getResource("NewProjectForm_UrlAlreadyInUse") : null,
                        },
                        formValid: (newValue.length >= self.props.titleMinLength) && !doesExist,
                        model: {
                            ...model,
                            Title: newValue,
                            Url: url,
                        },
                    });
                } catch (err) {
                    // Timeout cancelled
                }
            }
                break;
            case "Url": {
                if (this.doesWebExistDelay) {
                    this.doesWebExistDelay.cancel();
                    this.doesWebExistDelay = null;
                }
                this.doesWebExistDelay = delay(250);
                try {
                    await this.doesWebExistDelay;
                    const doesExist = await DoesWebExist(newValue);
                    self.setState({
                        errorMessages: {
                            ...errorMessages,
                            Url: doesExist ? RESOURCE_MANAGER.getResource("NewProjectForm_UrlAlreadyInUse") : null,
                        },
                        formValid: (model.Title.length >= self.props.titleMinLength) && !doesExist,
                        model: {
                            ...model,
                            Url: newValue,
                        },
                    });
                } catch (err) {
                    // Timeout cancelled
                }
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
    private async _onSubmit(model: IProjectModel): Promise<void> {
        this.setState({ provisioning: { isCreating: true } });
        try {
            const redirectUrl = await ProvisionWeb(model, (step, progress) => {
                this.setState({
                    provisioning: {
                        isCreating: true,
                        step: step,
                        progress: progress,
                    },
                });
            });
            document.location.href = redirectUrl;
        } catch (error) {
            this.setState({
                provisioning: {
                    isCreating: false,
                    error,
                },
            });
        }
    }
}
