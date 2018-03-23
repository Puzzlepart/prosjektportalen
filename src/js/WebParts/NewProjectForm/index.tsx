//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../Resources";
import * as delay from "delay";
import ProvisionWeb, { DoesWebExist } from "../../Provision";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import GetSelectableExtensions from "../../Provision/Extensions/GetSelectableExtensions";
import GetSelectableTemplates from "../../Provision/Template/GetSelectableTemplates";
import Extension from "../../Provision/Extensions/Extension";
import ListConfig from "../../Provision/Data/Config/ListConfig";
import * as ListDataConfig from "../../Provision/Data/Config";
import * as Util from "../../Util";
import { GetSetting } from "../../Settings";
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
        };
        this._onToggleListContent = this._onToggleListContent.bind(this);
        this._onToggleExtension = this._onToggleExtension.bind(this);
        this._onSubmitForm = this._onSubmitForm.bind(this);
    }

    public async componentDidMount() {
        const config = await this.getRequiredConfig();
        let model = this.state.model;
        model.IncludeContent = config.listData.filter(ld => ld.Default);
        model.Extensions = config.extensions.filter(ext => ext.IsEnabled);
        model.InheritPermissions = config.inheritPermissions;
        this.setState({
            config,
            model,
            selectedTemplate: config.defaultTemplate,
        });
    }

    public render(): React.ReactElement<INewProjectFormProps> {
        switch (this.state.provisioning.status) {
            case ProvisionStatus.Idle: {
                switch (this.props.renderMode) {
                    case NewProjectFormRenderMode.Default: {
                        return (
                            <div className={this.props.className} style={this.props.style}>
                                <div className="ms-font-l" style={{ paddingBottom: 15 }}>{this.props.subHeaderText}</div>
                                {this.renderInner()}
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
                                {this.renderInner()}
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
     * Render inner (form inputs, setting section and footer)
     */
    private renderInner(): React.ReactElement<INewProjectFormProps> {
        return (
            <div>
                {this.renderFormInput()}
                {(this.state.config && this.state.config.showSettings) && (
                    <NewProjectFormSettingsSection
                        className={this.props.settingsClassName}
                        listData={this.state.config.listData}
                        extensions={this.state.config.extensions}
                        toggleListContentHandler={this._onToggleListContent}
                        toggleExtensionHandler={this._onToggleExtension} />
                )}
                {this.renderFooter()}
            </div>
        );
    }

    /**
     * Render form input fields
     */
    private renderFormInput(): React.ReactElement<INewProjectFormProps> {
        const { inputContainerStyle } = this.props;
        const { errorMessages, model, selectedTemplate, config } = this.state;
        return (
            <section>
                <div style={inputContainerStyle}>
                    <TextField
                        placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_TitlePlaceholder")}
                        onChanged={newValue => this.onFormChange("Title", newValue)}
                        errorMessage={errorMessages.Title} />
                </div>
                <div style={inputContainerStyle}>
                    <TextField
                        placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_DescriptionPlaceholder")}
                        multiline
                        autoAdjustHeight
                        onChanged={newValue => this.onFormChange("Description", newValue)}
                        errorMessage={errorMessages.Description} />
                </div>
                <div style={inputContainerStyle}>
                    <TextField
                        placeholder={RESOURCE_MANAGER.getResource("NewProjectForm_UrlPlaceholder")}
                        value={model.Url}
                        onChanged={newValue => this.onFormChange("Url", newValue)}
                        errorMessage={errorMessages.Url} />
                </div>
                {this.state.config && (
                    <div style={inputContainerStyle} hidden={config.templates.length < 2}>
                        <Dropdown
                            disabled={!config.siteTemplateSelectorEnabled}
                            defaultSelectedKey={config.defaultTemplate ? config.defaultTemplate.FileRef : ""}
                            options={config.templates.map(t => ({ key: t.FileRef, text: t.Title, data: t }))}
                            onChanged={opt => this.setState({ selectedTemplate: opt.data })} />
                        <div style={{ marginTop: 10 }} hidden={!selectedTemplate.Comments || !config.siteTemplateSelectorEnabled}>
                            <MessageBar><i>{selectedTemplate.Comments}</i></MessageBar>
                        </div>
                    </div>
                )}
            </section >
        );
    }

    /**
     * Render footer
     */
    private renderFooter(): React.ReactElement<INewProjectFormProps> {
        switch (this.props.renderMode) {
            case NewProjectFormRenderMode.Default: {
                return (
                    <div style={{ paddingTop: 15 }}>
                        <div style={{ float: "right" }}>
                            <PrimaryButton
                                onClick={this._onSubmitForm}
                                disabled={!this.state.formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                        </div>
                    </div>
                );
            }
            case NewProjectFormRenderMode.Dialog: {
                return (
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this._onSubmitForm}
                            disabled={!this.state.formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                        <DefaultButton onClick={this.props.onDialogDismiss}>{RESOURCE_MANAGER.getResource("String_Close")}</DefaultButton>
                    </DialogFooter>
                );
            }
        }
    }

    /**
     * Toggle content
     *
     * @param {ListConfig} lc List config
     * @param {boolean} checked Is checked
     */
    private _onToggleListContent(lc: ListConfig, checked: boolean) {
        this.setState(prevState => {
            let { IncludeContent } = prevState.model;
            checked ? IncludeContent.push(lc) : IncludeContent.splice(IncludeContent.indexOf(lc), 1);
            return { model: { ...prevState.model, IncludeContent } };
        });
    }

    /**
     * Toggle extension
     *
     * @param {Extension} extension Extension
     * @param {boolean} checked Is checked
     */
    private _onToggleExtension(extension: Extension, checked: boolean) {
        this.setState(prevState => {
            let { Extensions } = prevState.model;
            checked ? Extensions.push(extension) : Extensions.splice(Extensions.indexOf(extension), 1);
            return { model: { ...prevState.model, Extensions } };
        });
    }

    /**
     * On form change
     *
     * @param {string} input Input (key) that was changed
     * @param {string} newValue New value
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
                        model: { ...prevState.model, Title: newValue, Url: url },
                    }));
                } catch (err) {
                    throw err;
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
                        model: { ...prevState.model, Url: newValue },
                    }));
                } catch (err) {
                    throw err;
                }
            }
                break;
            case "Description": {
                this.setState(prevState => ({
                    formValid: (prevState.model.Title.length >= this.props.titleMinLength),
                    model: { ...prevState.model, Description: newValue },
                }));
            }
                break;
        }
    }

    /**
     * Submits a project model
     */
    private async _onSubmitForm() {
        this.setState({ provisioning: { status: ProvisionStatus.Creating } });
        try {
            const redirectUrl = await ProvisionWeb(this.state.model, (step, progress) => {
                this.setState({ provisioning: { status: ProvisionStatus.Creating, step, progress } });
            }, this.state.selectedTemplate);
            document.location.href = redirectUrl;
        } catch {
            this.setState({ provisioning: { status: ProvisionStatus.Error } });
        }
    }

    /**
     * Get required config for the component
     *
     * @returns {INewProjectFormConfig} An object of interface INewProjectFormConfig
     */
    private async getRequiredConfig(): Promise<INewProjectFormConfig> {
        const [listData, extensions, templates, inheritPermissionsString, siteTemplateSelectorEnabledString] = await Promise.all([
            ListDataConfig.RetrieveConfig(),
            GetSelectableExtensions(),
            GetSelectableTemplates(),
            GetSetting("PROJECT_INHERIT_PERMISSIONS", true),
            GetSetting("SITE_TEMPLATE_SELECTOR_ENABLED", true),
        ]);
        let defaultTemplate;
        const listDataKeys = Object.keys(listData);
        const showSettings = this.props.showSettings && listDataKeys.length > 0;
        if (templates.length > 0) {
            [defaultTemplate] = templates.filter(t => t.GtIsDefault);
        }
        return {
            showSettings,
            listData,
            extensions,
            templates,
            defaultTemplate,
            inheritPermissions: inheritPermissionsString === "on",
            siteTemplateSelectorEnabled: siteTemplateSelectorEnabledString === "on",
        };
    }
}

export {
    NewProjectFormRenderMode,
    INewProjectFormProps,
    INewProjectFormState,
};
