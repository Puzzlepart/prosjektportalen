import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import * as React from 'react'
import { ProjectModel } from '../../Model'
import ProvisionWeb, { DoesWebExist } from '../../Provision'
import { RetrieveListContentConfig } from '../../Provision/Data/Config'
import ListConfig from '../../Provision/Data/Config/ListConfig'
import { RetrieveProjectTypes } from '../../Provision/Data/ProjectTypes'
import ProjectType from '../../Provision/Data/ProjectTypes/ProjectType'
import Extension from '../../Provision/Extensions/Extension'
import GetSelectableExtensions from '../../Provision/Extensions/GetSelectableExtensions'
import GetSelectableTemplates from '../../Provision/Template/GetSelectableTemplates'
import ITemplateFile from '../../Provision/Template/ITemplateFile'
import __ from '../../Resources'
import { GetSetting } from '../../Settings'
import * as Util from '../../Util'
import CreationModal from './CreationModal'
import INewProjectFormConfig from './INewProjectFormConfig'
import INewProjectFormProps, { NewProjectFormDefaultProps } from './INewProjectFormProps'
import INewProjectFormState, { ProvisionStatus } from './INewProjectFormState'
import NewProjectFormRenderMode from './NewProjectFormRenderMode'
import NewProjectFormSettingsSection from './NewProjectFormSettingsSection'

/**
 * @class NewProjectForm
 */
export default class NewProjectForm extends React.Component<INewProjectFormProps, INewProjectFormState> {
    public static displayName = 'NewProjectForm';
    public static defaultProps = NewProjectFormDefaultProps;
    private doesWebExistDelay: any;

    /**
     * Constructor
     *
     * @param {INewProjectFormProps} props Props
     */
    constructor(props: INewProjectFormProps) {
        super(props)
        this.state = {
            isLoading: true,
            model: new ProjectModel(),
            config: { templates: [] },
            errorMessages: {},
            provisioning: { status: ProvisionStatus.Idle },
        }
    }

    public async componentDidMount() {
        const config = await this.getRequiredConfig()
        const model = this.state.model
        model.includeContent = config.listData.filter(ld => ld.Default)
        model.extensions = config.extensions.filter(ext => ext.IsEnabled)
        model.inheritPermissions = config.inheritPermissions
        this.setState({ isLoading: false, config, model, selectedTemplate: config.defaultTemplate })
    }

    public render(): React.ReactElement<INewProjectFormProps> {
        // eslint-disable-next-line default-case
        switch (this.state.provisioning.status) {
            case ProvisionStatus.Idle: {
                // eslint-disable-next-line default-case
                switch (this.props.renderMode) {
                    case NewProjectFormRenderMode.Default: {
                        return (
                            <div className={this.props.className} style={this.props.style}>
                                <div className='ms-font-l' style={{ paddingBottom: 15 }}>{this.props.subHeaderText}</div>
                                {this.renderInner()}
                            </div>
                        )
                    }
                    case NewProjectFormRenderMode.Dialog: {
                        return (
                            <Dialog
                                hidden={false}
                                dialogContentProps={{ type: DialogType.largeHeader, subText: this.props.subHeaderText }}
                                modalProps={{ isDarkOverlay: true, isBlocking: true, className: this.props.className }}
                                title={this.props.headerText}
                                onDismiss={this.props.onDialogDismiss}>
                                {this.renderInner()}
                            </Dialog >
                        )
                    }
                }
            }
                break
            case ProvisionStatus.Creating: {
                return (
                    <CreationModal
                        title={String.format(this.props.creationModalTitle, this.state.model.title)}
                        isBlocking={true}
                        isDarkOverlay={true}
                        progressLabel={this.state.provisioning.step}
                        progressDescription={this.state.provisioning.progress} />
                )
            }
            case ProvisionStatus.Error: {
                return (
                    <Modal
                        isOpen={true}
                        isBlocking={false}
                        isDarkOverlay={true}
                        onDismiss={this.props.onDialogDismiss}
                        containerClassName='pp-modal' >
                        <div style={{ padding: 50 }}>
                            <div style={{ marginBottom: 25 }} className='ms-font-xl'>{__.getResource('ProvisionWeb_Failed')}</div>
                            <div className='ms-font-m'>{__.getResource('String_ContactAdmin')}</div>
                        </div>
                    </Modal>
                )
            }
        }
    }

    /**
     * Render inner (form inputs, setting section and footer)
     */
    private renderInner(): React.ReactElement<INewProjectFormProps> {
        return (
            <div>
                {this.renderFormInputSection()}
                {(this.state.config.showSettings && !this.state.isLoading) && (
                    <NewProjectFormSettingsSection
                        className={this.props.settingsClassName}
                        config={this.state.config}
                        model={this.state.model}
                        onListContentChanged={this.onListContentChanged}
                        onExtensionsChanged={this.onExtensionsChanged}
                        onProjectTypeChanged={this.onProjectTypeChanged} />
                )}
                {this.renderFooter()}
            </div>
        )
    }

    /**
     * Render form input section
     */
    private renderFormInputSection(): React.ReactElement<INewProjectFormProps> {
        const { inputContainerStyle } = this.props
        const { errorMessages, model, selectedTemplate, config } = this.state
        return (
            <section>
                <div style={inputContainerStyle}>
                    <TextField
                        autoComplete='off'
                        placeholder={__.getResource('NewProjectForm_TitlePlaceholder')}
                        onChanged={newValue => this.onFormInputChange('title', newValue)}
                        value={model.title}
                        errorMessage={errorMessages.Title} />
                </div>
                <div style={inputContainerStyle}>
                    <TextField
                        autoComplete='off'
                        placeholder={__.getResource('NewProjectForm_DescriptionPlaceholder')}
                        multiline
                        autoAdjustHeight
                        onChanged={newValue => this.onFormInputChange('description', newValue)}
                        value={model.description}
                        errorMessage={errorMessages.Description} />
                </div>
                <div style={inputContainerStyle}>
                    <TextField
                        autoComplete='off'
                        placeholder={__.getResource('NewProjectForm_UrlPlaceholder')}
                        onChanged={newValue => this.onFormInputChange('url', newValue)}
                        value={model.url}
                        errorMessage={errorMessages.Url} />
                </div>
                {(config.templates && config.templates.length > 1 && config.siteTemplateSelectorEnabled) && (
                    <div style={inputContainerStyle}>
                        <Dropdown
                            defaultSelectedKey={config.defaultTemplate ? config.defaultTemplate.FileRef : ''}
                            options={config.templates.map(t => ({ key: t.FileRef, text: t.Title, data: t }))}
                            onChanged={opt => this.setState({ selectedTemplate: opt.data })} />
                        <div style={{ marginTop: 10 }} hidden={!selectedTemplate.Comments || !config.siteTemplateSelectorEnabled}>
                            <MessageBar><i>{selectedTemplate.Comments}</i></MessageBar>
                        </div>
                    </div>
                )}
            </section >
        )
    }

    /**
     * Render footer
     */
    private renderFooter(): React.ReactElement<INewProjectFormProps> {
        // eslint-disable-next-line default-case
        switch (this.props.renderMode) {
            case NewProjectFormRenderMode.Default: {
                return (
                    <div style={{ paddingTop: 15 }}>
                        <div style={{ float: 'right' }}>
                            <PrimaryButton
                                onClick={this.onSubmitForm}
                                disabled={!this.state.formValid}>{__.getResource('String_Create')}</PrimaryButton>
                        </div>
                    </div>
                )
            }
            case NewProjectFormRenderMode.Dialog: {
                return (
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this.onSubmitForm}
                            disabled={!this.state.formValid}>{__.getResource('String_Create')}</PrimaryButton>
                        <DefaultButton onClick={this.props.onDialogDismiss}>{__.getResource('String_Close')}</DefaultButton>
                    </DialogFooter>
                )
            }
        }
    }

    /**
     *
     */
    @autobind
    private onFormInputChange(inputName: 'title' | 'description' | 'url', newValue: string) {
        const prevModel = this.state.model
        const model = this.state.model.clone()
        model[inputName] = newValue
        // eslint-disable-next-line default-case
        switch (inputName) {
            case 'title': {
                model.url = Util.cleanString(newValue, this.props.maxUrlLength)
            }
        }
        this.setState({ model }, () => {
            if (prevModel.url !== model.url) {
                if (this.doesWebExistDelay) {
                    clearTimeout(this.doesWebExistDelay)
                    this.doesWebExistDelay = null
                }
                this.doesWebExistDelay = setTimeout(async () => {
                    try {
                        const doesExist = await DoesWebExist(model.url)
                        const errorMessages = { ...this.state.errorMessages }
                        errorMessages.Url = doesExist ? __.getResource('NewProjectForm_UrlPlaceholderAlreadyInUse') : null
                        const formValid = (model.title.length >= this.props.titleMinLength) && !doesExist
                        this.setState({ errorMessages, formValid })
                    } catch (err) {
                        // Catch err
                    }
                }, this.props.doesWebExistDelayMs)
            }
        })
    }

    /**
     * Toggle content
     *
     * @param {ListConfig} lc List config
     * @param {boolean} checked Is checked
     */
    @autobind
    private onListContentChanged(lc: ListConfig, checked: boolean) {
        this.setState((prevState: INewProjectFormState) => {
            const model = prevState.model.clone()
            if (checked) {
                model.includeContent.push(lc)
            } else {
                model.includeContent.splice(model.includeContent.indexOf(lc), 1)
            }
            return { model }
        })
    }

    /**
     * On project type changed
     *
     * @param {ProjectType} projectType Project type
     */
    @autobind
    private onProjectTypeChanged(projectType: ProjectType) {
        const model = this.state.model.clone()
        model.projectType = projectType
        model.includeContent = this.state.config.listData.filter(ld => ld.Default)
        model.extensions = this.state.config.extensions.filter(ext => ext.IsEnabled)
        let selectedTemplate = this.state.config.defaultTemplate

        if (projectType) {
            model.includeContent = this.state.config.listData.filter(l => projectType.listContentIds.indexOf(l.Id) !== -1)
            model.extensions = this.state.config.extensions.filter(l => projectType.extensionIds.indexOf(l.Id) !== -1)
            selectedTemplate = this.state.config.templates.filter(t => t.Id === projectType.templateId)[0]
        }
        this.setState({ model, selectedTemplate })
    }

    /**
     * Toggle extension
     *
     * @param {Extension} extension Extension
     * @param {boolean} checked Is checked
     */
    @autobind
    private onExtensionsChanged(extension: Extension, checked: boolean) {
        this.setState((prevState: INewProjectFormState) => {
            const model = prevState.model.clone()
            if (checked) {
                model.extensions.push(extension)
            } else {
                model.extensions.splice(model.extensions.indexOf(extension), 1)
            }
            return { model }
        })
    }

    /**
     * Submits the form
     */
    @autobind
    private async onSubmitForm() {
        this.setState({ provisioning: { status: ProvisionStatus.Creating } })
        try {
            const redirectUrl = await ProvisionWeb(this.state.model, (step, progress) => {
                this.setState({ provisioning: { status: ProvisionStatus.Creating, step, progress } })
            }, this.state.selectedTemplate)
            document.location.href = redirectUrl
        } catch {
            this.setState({ provisioning: { status: ProvisionStatus.Error } })
        }
    }

    /**
     * Get required config for the component
     *
     * @returns {INewProjectFormConfig} An object of interface INewProjectFormConfig
     */
    private async getRequiredConfig(): Promise<INewProjectFormConfig> {
        const [listData, listProjectTypes, extensions, templates, inheritPermissionsString, siteTemplateSelectorEnabledString] = await Promise.all([
            RetrieveListContentConfig(),
            RetrieveProjectTypes(),
            GetSelectableExtensions(),
            GetSelectableTemplates(),
            GetSetting('PROJECT_INHERIT_PERMISSIONS', true),
            GetSetting('SITE_TEMPLATE_SELECTOR_ENABLED', true),
        ])
        let defaultTemplate: ITemplateFile
        const listDataKeys = Object.keys(listData)
        const listProjectTypesKeys = Object.keys(listProjectTypes)
        const showSettings = this.props.showSettings && listDataKeys.length > 0
        const showProjectTypes = this.props.showProjectTypes && listProjectTypesKeys.length > 0
        if (templates.length > 0) {
            [defaultTemplate] = templates.filter(t => t.GtIsDefault)
        }
        return {
            showSettings,
            showProjectTypes,
            listData,
            projectTypes: listProjectTypes,
            extensions,
            templates,
            defaultTemplate,
            inheritPermissions: inheritPermissionsString === 'on',
            siteTemplateSelectorEnabled: siteTemplateSelectorEnabledString === 'on',
        }
    }
}

export { NewProjectFormRenderMode, INewProjectFormProps, INewProjectFormState }

