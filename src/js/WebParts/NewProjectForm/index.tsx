import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import * as delay from "delay";
import ProvisionWeb, { DoesWebExist } from "../../Provision";
import {
    PrimaryButton,
    DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import {
    Dialog,
    DialogFooter,
    DialogType,
} from "office-ui-fabric-react/lib/Dialog";
import { IProjectModel } from "../../Model";
import * as ListDataConfig from "../../Provision/Data/Config";
import * as Util from "../../Util";
import NewProjectFormRenderMode from "./NewProjectFormRenderMode";
import INewProjectFormProps, { NewProjectFormDefaultProps } from "./INewProjectFormProps";
import INewProjectFormState, { ProvisionStatus } from "./INewProjectFormState";
import CreationModal from "./CreationModal";

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
            model: {
                Title: "",
                Description: "",
                Url: "",
                InheritPermissions: false,
            },
            errorMessages: {},
            listDataConfig: {},
            urlInputEnabled: true,
            provisioning: { status: ProvisionStatus.Idle },
        };
    }

    /**
  * Component did mount
  */
    public async componentDidMount(): Promise<void> {
        const listDataConfig = await ListDataConfig.RetrieveConfig();
        let model = this.state.model;
        model.IncludeContent = Object.keys(listDataConfig).filter(key => listDataConfig[key].Default);
        this.setState({
            listDataConfig,
            model,
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        switch (this.state.provisioning.status) {
            case ProvisionStatus.Idle: {
                switch (this.props.renderMode) {
                    case NewProjectFormRenderMode.Default: {
                        return (
                            <div
                                className={this.props.className}
                                style={this.props.style}>
                                <div
                                    className="ms-font-l"
                                    style={{ paddingBottom: 15 }}>{this.props.subHeaderText}</div>
                                {this.renderFormInput(this.props, this.state)}
                                {this.renderSettingsSection(this.props, this.state)}
                                {this.renderFooter(this.props, this.state)}
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
                                    {this.renderFormInput(this.props, this.state)}
                                    {this.renderSettingsSection(this.props, this.state)}
                                    {this.renderFooter(this.props, this.state)}
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
                        title={String.format(RESOURCE_MANAGER.getResource("CreationModal_Title"), this.state.model.Title)}
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
        }
    }

    /**
     * Render form input field
     *
     * @param {INewProjectFormProps} param0 Props
     * @param {INewProjectFormState} param1 State
     */
    private renderFormInput({ }: INewProjectFormProps, { model, errorMessages, urlInputEnabled }: INewProjectFormState): JSX.Element {
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
     * Render settings section
     *
     * @param {INewProjectFormProps} param0 Props
     * @param {INewProjectFormState} param1 State
     */
    private renderSettingsSection({ settingsClassName }: INewProjectFormProps, { listDataConfig, showListContentSettings }: INewProjectFormState) {
        return (
            <div className={settingsClassName}>
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
     * @param {INewProjectFormProps} param0 Props
     * @param {INewProjectFormState} param1 State
     */
    private renderFooter({ renderMode, onDialogDismiss }: INewProjectFormProps, { formValid }: INewProjectFormState) {
        switch (renderMode) {
            case NewProjectFormRenderMode.Default: {
                return (
                    <div style={{ paddingTop: 15 }}>
                        <div style={{ float: "right" }}>
                            <PrimaryButton
                                onClick={this.onSubmit}
                                disabled={!formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                        </div>
                    </div>
                );
            }
            case NewProjectFormRenderMode.Dialog: {
                return (
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this.onSubmit}
                            disabled={!formValid}>{RESOURCE_MANAGER.getResource("String_Create")}</PrimaryButton>
                        <DefaultButton onClick={() => onDialogDismiss()}>{RESOURCE_MANAGER.getResource("String_Close")}</DefaultButton>
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
        this.setState({ provisioning: { status: ProvisionStatus.Creating } });
        try {
            const redirectUrl = await ProvisionWeb(model, (step, progress) => {
                this.setState({
                    provisioning: {
                        status: ProvisionStatus.Creating,
                        step: step,
                        progress: progress,
                    },
                });
            });
            document.location.href = redirectUrl;
        } catch (error) {
            this.setState({
                provisioning: { status: ProvisionStatus.Error },
            });
        }
    }
}

export {
    NewProjectFormRenderMode,
    INewProjectFormProps,
    INewProjectFormState,
};
