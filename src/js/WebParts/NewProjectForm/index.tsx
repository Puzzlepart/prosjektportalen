//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import * as delay from "delay";
import ProvisionWeb, { DoesWebExist } from "../../Provision";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import GetSelectableExtensions from "../../Provision/Extensions/GetSelectableExtensions";
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
            config: {},
        };

        this.toggleListContent = this.toggleListContent.bind(this);
        this.toggleExtension = this.toggleExtension.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    public async componentDidMount() {
        const config = await this.getRequiredConfig();
        let model = this.state.model;
        model.IncludeContent = config.listData.filter(ld => ld.Default);
        model.Extensions = config.extensions.filter(ext => ext.IsEnabled);
        model.InheritPermissions = config.inheritPermissions;
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
     * Get required config for the component
     */
    private async getRequiredConfig(): Promise<INewProjectFormConfig> {
        const [listData, extensions, inheritPermissionsString] = await Promise.all([
            ListDataConfig.RetrieveConfig(),
            GetSelectableExtensions(),
            GetSetting("PROJECT_INHERIT_PERMISSIONS", true),
        ]);
        const listDataKeys = Object.keys(listData);
        const showSettings = this.props.showSettings && listDataKeys.length > 0;
        return { showSettings, listData, extensions, inheritPermissions: inheritPermissionsString === "on" };
    }

    /**
     * Render inner (form inputs, setting section and footer)
     */
    private renderInner() {
        return (
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
        );
    }

    /**
     * Render form input field
     */
    private renderFormInput() {
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
                                onClick={this._onSubmit}
                                disabled={!this.state.formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                        </div>
                    </div>
                );
            }
            case NewProjectFormRenderMode.Dialog: {
                return (
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this._onSubmit}
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
     * @param {ListConfig} lc List config
     * @param {boolean} checked Is checked
     */
    private toggleListContent(lc: ListConfig, checked: boolean) {
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
    private toggleExtension(extension: Extension, checked: boolean) {
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
     * Submits a project model
     */
    private async _onSubmit() {
        this.setState({ provisioning: { status: ProvisionStatus.Creating } });
        try {
            const redirectUrl = await ProvisionWeb(this.state.model, (step, progress) => {
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
