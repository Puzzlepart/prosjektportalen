//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import * as delay from "delay";
import ProvisionWeb, { DoesWebExist } from "../../Provision";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { IProjectModel } from "../../Model";
import GetSelectableExtensions from "../../Provision/Extensions/GetSelectableExtensions";
import Extension from "../../Provision/Extensions/Extension";
import * as ListDataConfig from "../../Provision/Data/Config";
import * as Util from "../../Util";
import NewProjectFormRenderMode from "./NewProjectFormRenderMode";
import INewProjectFormProps, { NewProjectFormDefaultProps } from "./INewProjectFormProps";
import INewProjectFormState, { ProvisionStatus } from "./INewProjectFormState";
import INewProjectFormConfig from "./INewProjectFormConfig";
import NewProjectFormSettingsSection from "./NewProjectFormSettingsSection";
import CreationModal from "./CreationModal";
//#endregion

/**
 * New Project Form
 */
export default class NewProjectForm extends React.Component<INewProjectFormProps, INewProjectFormState> {
    public static displayName = "NewProjectForm";
    public static defaultProps = NewProjectFormDefaultProps;
    private doesWebExistDelay;

    /**
     * Constructor
     *
     * @param {INewProjectFormProps} props Props
     */
    constructor(props: INewProjectFormProps) {
        super(props);
        this.state = {
            model: { Title: "", Description: "", Url: "", InheritPermissions: false },
            errorMessages: {},
            provisioning: { status: ProvisionStatus.Idle },
            config: { listData: {} },
        };

        this.toggleListContent = this.toggleListContent.bind(this);
        this.toggleExtension = this.toggleExtension.bind(this);
    }

    public async componentDidMount() {
        const config = await this.getRequiredConfig();
        const listDataConfigKeys = Object.keys(config.listData);
        let model = this.state.model;
        model.IncludeContent = listDataConfigKeys.filter(key => config.listData[key].Default);
        model.Extensions = config.extensions.filter(ext => ext.IsEnabled);
        this.setState({ config, model });
    }

    public render(): JSX.Element {
        switch (this.state.provisioning.status) {
            case ProvisionStatus.Idle: {
                switch (this.props.renderMode) {
                    case NewProjectFormRenderMode.Default: {
                        return (
                            <div className={this.props.className} style={this.props.style}>
                                <div className="ms-font-l" style={{ paddingBottom: 15 }}>{this.props.subHeaderText}</div>
                                {this.renderFormInput()}
                                {this.state.config.showSettings && (
                                    <NewProjectFormSettingsSection
                                        className={this.props.settingsClassName}
                                        listData={this.state.config.listData}
                                        extensions={this.state.config.extensions}
                                        toggleListContentHandler={this.toggleListContent}
                                        toggleExtensionHandler={this.toggleExtension} />
                                )}
                                {this.renderFooter()}
                            </div>
                        );
                    }
                    case NewProjectFormRenderMode.Dialog: {
                        return (
                            <Dialog
                                hidden={false}
                                dialogContentProps={{
                                    type: DialogType.largeHeader,
                                    subText: this.props.subHeaderText,
                                }}
                                modalProps={{
                                    isDarkOverlay: true,
                                    isBlocking: true,
                                    className: this.props.className,
                                }}
                                title={this.props.headerText}
                                onDismiss={this.props.onDialogDismiss}>
                                <div>
                                    {this.renderFormInput()}
                                    {this.state.config.showSettings && (
                                        <NewProjectFormSettingsSection
                                            className={this.props.settingsClassName}
                                            listData={this.state.config.listData}
                                            extensions={this.state.config.extensions}
                                            toggleListContentHandler={this.toggleListContent}
                                            toggleExtensionHandler={this.toggleExtension} />
                                    )}
                                    {this.renderFooter()}
                                </div>
                            </Dialog >
                        );
                    }
                }
            }
                break;
            case ProvisionStatus.Creating: {
                return (
                    <CreationModal
                        title={String.format(this.props.creationModalTitle, this.state.model.Title)}
                        isBlocking={true}
                        isDarkOverlay={true}
                        progressLabel={this.state.provisioning.step}
                        progressDescription={this.state.provisioning.progress} />
                );
            }
            case ProvisionStatus.Error: {
                return (
                    <Modal
                        isOpen={true}
                        isBlocking={false}
                        isDarkOverlay={true}
                        onDismiss={this.props.onDialogDismiss}
                        containerClassName="pp-modal" >
                        <div style={{ padding: 50 }}>
                            <div style={{ marginBottom: 25 }} className="ms-font-xl">{RESOURCE_MANAGER.getResource("ProvisionWeb_Failed")}</div>
                            <div className="ms-font-m">{RESOURCE_MANAGER.getResource("String_ContactAdmin")}</div>
                        </div>
                    </Modal>
                );
            }
        }
    }

    /**
     * Get required config for the component
     */
    private async getRequiredConfig(): Promise<INewProjectFormConfig> {
        const listData = await ListDataConfig.RetrieveConfig();
        const extensions = await GetSelectableExtensions();
        const listDataKeys = Object.keys(listData);
        const showSettings = this.props.showSettings && listDataKeys.length > 0;
        return { showSettings, listData, extensions };
    }

    /**
     * Render form input field
     */
    private renderFormInput(): JSX.Element {
        return (
            <section>
                <div style={this.props.inputContainerStyle}>
                    <TextField
                        placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_TitlePlaceholder")}
                        onChanged={newValue => this.onFormChange("Title", newValue)}
                        errorMessage={this.state.errorMessages.Title} />
                </div>
                <div style={this.props.inputContainerStyle}>
                    <TextField
                        placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_DescriptionPlaceholder")}
                        multiline
                        autoAdjustHeight
                        onChanged={newValue => this.onFormChange("Description", newValue)}
                        errorMessage={this.state.errorMessages.Description} />
                </div>
                <div style={this.props.inputContainerStyle}>
                    <TextField
                        placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_UrlPlaceholder")}
                        value={this.state.model.Url}
                        onChanged={newValue => this.onFormChange("Url", newValue)}
                        errorMessage={this.state.errorMessages.Url} />
                </div>
            </section>
        );
    }

    /**
     * Render footer
     */
    private renderFooter() {
        switch (this.props.renderMode) {
            case NewProjectFormRenderMode.Default: {
                return (
                    <div style={{ paddingTop: 15 }}>
                        <div style={{ float: "right" }}>
                            <PrimaryButton
                                onClick={this.onSubmit}
                                disabled={!this.state.formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                        </div>
                    </div>
                );
            }
            case NewProjectFormRenderMode.Dialog: {
                return (
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this.onSubmit}
                            disabled={!this.state.formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                        <DefaultButton onClick={() => this.props.onDialogDismiss()}>{RESOURCE_MANAGER.getResource("String_Close")}</DefaultButton>
                    </DialogFooter>
                );
            }
        }
    }

    /**
     * Toggle content
     *
     * @param {string} key Key
     * @param {boolean} checked Is checked
     */
    private toggleListContent(key: string, checked: boolean) {
        this.setState(prevState => {
            let { IncludeContent } = prevState.model;
            checked ? IncludeContent.push(key) : IncludeContent.splice(IncludeContent.indexOf(key), 1);
            return {
                model: {
                    ...prevState.model,
                    IncludeContent,
                },
            };
        });
    }

    /**
     * Toggle extension
     *
     * @param {string} key Key
     * @param {boolean} checked Is checked
     * @param {Extension} extension Extension
     */
    private toggleExtension(key: string, checked: boolean, extension: Extension) {
        this.setState(prevState => {
            let { Extensions } = prevState.model;
            checked ? Extensions.push(extension) : Extensions.splice(Extensions.indexOf(extension), 1);
            return {
                model: {
                    ...prevState.model,
                    Extensions,
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
                    self.setState(prevState => ({
                        errorMessages: {
                            ...prevState.errorMessages,
                            Url: doesExist ? RESOURCE_MANAGER.getResource("NewProjectForm_UrlPlaceholderAlreadyInUse") : null,
                        },
                        formValid: (newValue.length >= self.props.titleMinLength) && !doesExist,
                        model: {
                            ...prevState.model,
                            Title: newValue,
                            Url: url,
                        },
                    }));
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
                    self.setState(prevState => ({
                        errorMessages: {
                            ...prevState.errorMessages,
                            Url: doesExist ? RESOURCE_MANAGER.getResource("NewProjectForm_UrlPlaceholderAlreadyInUse") : null,
                        },
                        formValid: (prevState.model.Title.length >= self.props.titleMinLength) && !doesExist,
                        model: {
                            ...prevState.model,
                            Url: newValue,
                        },
                    }));
                } catch (err) {
                    // Timeout cancelled
                }
            }
                break;
            case "Description": {
                this.setState(prevState => ({
                    formValid: (prevState.model.Title.length >= this.props.titleMinLength),
                    model: {
                        ...prevState.model,
                        Description: newValue,
                    },
                }));
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
        this.setState({ provisioning: { status: ProvisionStatus.Creating } });
        try {
            const redirectUrl = await ProvisionWeb(model, (step, progress) => {
                this.setState({ provisioning: { status: ProvisionStatus.Creating, step, progress } });
            });
            document.location.href = redirectUrl;
        } catch {
            this.setState({ provisioning: { status: ProvisionStatus.Error } });
        }
    }
}

export {
    NewProjectFormRenderMode,
    INewProjectFormProps,
    INewProjectFormState,
};
