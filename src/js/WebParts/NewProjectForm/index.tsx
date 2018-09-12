//#region Imports
import * as React from "react";
import __ from "../../Resources";
import { ProjectModel } from "../../Model";
import ProvisionWeb, { DoesWebExist } from "../../Provision";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
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
 * Component: NewProjectForm
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
            isLoading: true,
            model: new ProjectModel(),
            errorMessages: {},
            provisioning: { status: ProvisionStatus.Idle },
        };
    }

    public async componentDidMount() {
        const config = await this.getRequiredConfig();
        let model = this.state.model;
        model.IncludeContent = config.listData.filter(ld => ld.Default);
        model.Extensions = config.extensions.filter(ext => ext.IsEnabled);
        model.InheritPermissions = config.inheritPermissions;
        this.setState({ isLoading: false, config, model, selectedTemplate: config.defaultTemplate });
    }

    public render(): React.ReactElement<INewProjectFormProps> {
        switch (this.state.provisioning.status) {
            case ProvisionStatus.Idle: {
                switch (this.props.renderMode) {
                    case NewProjectFormRenderMode.Default: {
                        return (
                            <div className={this.props.className} style={this.props.style}>
                                <div className="ms-font-l" style={{ paddingBottom: 15 }}>{this.props.subHeaderText}</div>
                                {this._renderInner()}
                            </div>
                        );
                    }
                    case NewProjectFormRenderMode.Dialog: {
                        return (
                            <Dialog
                                hidden={false}
                                dialogContentProps={{ type: DialogType.largeHeader, subText: this.props.subHeaderText }}
                                modalProps={{ isDarkOverlay: true, isBlocking: true, className: this.props.className }}
                                title={this.props.headerText}
                                onDismiss={this.props.onDialogDismiss}>
                                {this._renderInner()}
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
                            <div style={{ marginBottom: 25 }} className="ms-font-xl">{__.getResource("ProvisionWeb_Failed")}</div>
                            <div className="ms-font-m">{__.getResource("String_ContactAdmin")}</div>
                        </div>
                    </Modal>
                );
            }
        }
    }

    /**
     * Render inner (form inputs, setting section and footer)
     */
    private _renderInner(): React.ReactElement<INewProjectFormProps> {
        if (this.state.isLoading) {
            return <Spinner />;
        }
        return (
            <div>
                {this._renderFormInputSection()}
                {(this.state.config && this.state.config.showSettings) && (
                    <NewProjectFormSettingsSection
                        className={this.props.settingsClassName}
                        listData={this.state.config.listData}
                        extensions={this.state.config.extensions}
                        toggleListContentHandler={this._onToggleListContent}
                        toggleExtensionHandler={this._onToggleExtension} />
                )}
                {this._renderFooter()}
            </div>
        );
    }

    /**
     * Render form input section
     */
    private _renderFormInputSection(): React.ReactElement<INewProjectFormProps> {
        const { inputContainerStyle } = this.props;
        const { errorMessages, model, selectedTemplate, config } = this.state;
        return (
            <section>
                <div style={inputContainerStyle}>
                    <TextField
                        placeholder={__.getResource("NewProjectForm_TitlePlaceholder")}
                        onChanged={newValue => this._onFormInputChange("Title", newValue)}
                        value={model.Title}
                        errorMessage={errorMessages.Title} />
                </div>
                <div style={inputContainerStyle}>
                    <TextField
                        placeholder={__.getResource("NewProjectForm_DescriptionPlaceholder")}
                        multiline
                        autoAdjustHeight
                        onChanged={newValue => this._onFormInputChange("Description", newValue)}
                        value={model.Description}
                        errorMessage={errorMessages.Description} />
                </div>
                <div style={inputContainerStyle}>
                    <TextField
                        placeholder={__.getResource("NewProjectForm_UrlPlaceholder")}
                        onChanged={newValue => this._onFormInputChange("Url", newValue)}
                        value={model.Url}
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
    private _renderFooter(): React.ReactElement<INewProjectFormProps> {
        switch (this.props.renderMode) {
            case NewProjectFormRenderMode.Default: {
                return (
                    <div style={{ paddingTop: 15 }}>
                        <div style={{ float: "right" }}>
                            <PrimaryButton
                                onClick={this._onSubmitForm}
                                disabled={!this.state.formValid}>{__.getResource("String_Create")}</PrimaryButton>
                        </div>
                    </div>
                );
            }
            case NewProjectFormRenderMode.Dialog: {
                return (
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this._onSubmitForm}
                            disabled={!this.state.formValid}>{__.getResource("String_Create")}</PrimaryButton>
                        <DefaultButton onClick={this.props.onDialogDismiss}>{__.getResource("String_Close")}</DefaultButton>
                    </DialogFooter>
                );
            }
        }
    }

    /**
     *
     */
    @autobind
    private _onFormInputChange(inputName: string, newValue: string) {
        const prevModel = this.state.model;
        let model: ProjectModel = { ...this.state.model };
        model[inputName] = newValue;
        switch (inputName) {
            case "Title": {
                model.Url = Util.cleanString(newValue, this.props.maxUrlLength);
            }
        }
        this.setState({ model }, () => {
            if (prevModel.Url !== model.Url) {
                if (this.doesWebExistDelay) {
                    clearTimeout(this.doesWebExistDelay);
                    this.doesWebExistDelay = null;
                }
                this.doesWebExistDelay = setTimeout(async () => {
                    try {
                        const doesExist = await DoesWebExist(model.Url);
                        const errorMessages = { ...this.state.errorMessages };
                        errorMessages.Url = doesExist ? __.getResource("NewProjectForm_UrlPlaceholderAlreadyInUse") : null;
                        const formValid = (model.Title.length >= this.props.titleMinLength) && !doesExist;
                        this.setState({ errorMessages, formValid });
                    } catch (err) {
                        // Catch err
                    }
                }, this.props.doesWebExistDelayMs);
            }
        });
    }

    /**
     * Toggle content
     *
     * @param {ListConfig} lc List config
     * @param {boolean} checked Is checked
     */
    @autobind
    private _onToggleListContent(lc: ListConfig, checked: boolean) {
        this.setState((prevState: INewProjectFormState) => {
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
    @autobind
    private _onToggleExtension(extension: Extension, checked: boolean) {
        this.setState((prevState: INewProjectFormState) => {
            let { Extensions } = prevState.model;
            checked ? Extensions.push(extension) : Extensions.splice(Extensions.indexOf(extension), 1);
            return { model: { ...prevState.model, Extensions } };
        });
    }

    /**
     * Submits the form
     */
    @autobind
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
