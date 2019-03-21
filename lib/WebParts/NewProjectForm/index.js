"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const React = require("react");
const Resources_1 = require("../../Resources");
const Model_1 = require("../../Model");
const Provision_1 = require("../../Provision");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
const TextField_1 = require("office-ui-fabric-react/lib/TextField");
const Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const GetSelectableExtensions_1 = require("../../Provision/Extensions/GetSelectableExtensions");
const GetSelectableTemplates_1 = require("../../Provision/Template/GetSelectableTemplates");
const ListDataConfig = require("../../Provision/Data/Config");
const Util = require("../../Util");
const Settings_1 = require("../../Settings");
const NewProjectFormRenderMode_1 = require("./NewProjectFormRenderMode");
exports.NewProjectFormRenderMode = NewProjectFormRenderMode_1.default;
const INewProjectFormProps_1 = require("./INewProjectFormProps");
const INewProjectFormState_1 = require("./INewProjectFormState");
const NewProjectFormSettingsSection_1 = require("./NewProjectFormSettingsSection");
const CreationModal_1 = require("./CreationModal");
//#endregion
/**
 * Component: NewProjectForm
 */
class NewProjectForm extends React.Component {
    /**
     * Constructor
     *
     * @param {INewProjectFormProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            model: new Model_1.ProjectModel(),
            config: { templates: [] },
            errorMessages: {},
            provisioning: { status: INewProjectFormState_1.ProvisionStatus.Idle },
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.getRequiredConfig();
            let model = this.state.model;
            model.IncludeContent = config.listData.filter(ld => ld.Default);
            model.Extensions = config.extensions.filter(ext => ext.IsEnabled);
            model.InheritPermissions = config.inheritPermissions;
            this.setState({ isLoading: false, config, model, selectedTemplate: config.defaultTemplate });
        });
    }
    render() {
        switch (this.state.provisioning.status) {
            case INewProjectFormState_1.ProvisionStatus.Idle:
                {
                    switch (this.props.renderMode) {
                        case NewProjectFormRenderMode_1.default.Default: {
                            return (React.createElement("div", { className: this.props.className, style: this.props.style },
                                React.createElement("div", { className: "ms-font-l", style: { paddingBottom: 15 } }, this.props.subHeaderText),
                                this.renderInner()));
                        }
                        case NewProjectFormRenderMode_1.default.Dialog: {
                            return (React.createElement(Dialog_1.Dialog, { hidden: false, dialogContentProps: { type: Dialog_1.DialogType.largeHeader, subText: this.props.subHeaderText }, modalProps: { isDarkOverlay: true, isBlocking: true, className: this.props.className }, title: this.props.headerText, onDismiss: this.props.onDialogDismiss }, this.renderInner()));
                        }
                    }
                }
                break;
            case INewProjectFormState_1.ProvisionStatus.Creating: {
                return (React.createElement(CreationModal_1.default, { title: String.format(this.props.creationModalTitle, this.state.model.Title), isBlocking: true, isDarkOverlay: true, progressLabel: this.state.provisioning.step, progressDescription: this.state.provisioning.progress }));
            }
            case INewProjectFormState_1.ProvisionStatus.Error: {
                return (React.createElement(Modal_1.Modal, { isOpen: true, isBlocking: false, isDarkOverlay: true, onDismiss: this.props.onDialogDismiss, containerClassName: "pp-modal" },
                    React.createElement("div", { style: { padding: 50 } },
                        React.createElement("div", { style: { marginBottom: 25 }, className: "ms-font-xl" }, Resources_1.default.getResource("ProvisionWeb_Failed")),
                        React.createElement("div", { className: "ms-font-m" }, Resources_1.default.getResource("String_ContactAdmin")))));
            }
        }
    }
    /**
     * Render inner (form inputs, setting section and footer)
     */
    renderInner() {
        return (React.createElement("div", null,
            this.renderFormInputSection(),
            (this.state.config.showSettings && !this.state.isLoading) && (React.createElement(NewProjectFormSettingsSection_1.default, { className: this.props.settingsClassName, listData: this.state.config.listData, extensions: this.state.config.extensions, toggleListContentHandler: this.onToggleListContent, toggleExtensionHandler: this.onToggleExtension })),
            this.renderFooter()));
    }
    /**
     * Render form input section
     */
    renderFormInputSection() {
        const { inputContainerStyle } = this.props;
        const { errorMessages, model, selectedTemplate, config } = this.state;
        return (React.createElement("section", null,
            React.createElement("div", { style: inputContainerStyle },
                React.createElement(TextField_1.TextField, { autoComplete: "off", placeholder: Resources_1.default.getResource("NewProjectForm_TitlePlaceholder"), onChanged: newValue => this.onFormInputChange("Title", newValue), value: model.Title, errorMessage: errorMessages.Title })),
            React.createElement("div", { style: inputContainerStyle },
                React.createElement(TextField_1.TextField, { autoComplete: "off", placeholder: Resources_1.default.getResource("NewProjectForm_DescriptionPlaceholder"), multiline: true, autoAdjustHeight: true, onChanged: newValue => this.onFormInputChange("Description", newValue), value: model.Description, errorMessage: errorMessages.Description })),
            React.createElement("div", { style: inputContainerStyle },
                React.createElement(TextField_1.TextField, { autoComplete: "off", placeholder: Resources_1.default.getResource("NewProjectForm_UrlPlaceholder"), onChanged: newValue => this.onFormInputChange("Url", newValue), value: model.Url, errorMessage: errorMessages.Url })),
            (config.templates && config.templates.length > 1 && config.siteTemplateSelectorEnabled) && (React.createElement("div", { style: inputContainerStyle },
                React.createElement(Dropdown_1.Dropdown, { defaultSelectedKey: config.defaultTemplate ? config.defaultTemplate.FileRef : "", options: config.templates.map(t => ({ key: t.FileRef, text: t.Title, data: t })), onChanged: opt => this.setState({ selectedTemplate: opt.data }) }),
                React.createElement("div", { style: { marginTop: 10 }, hidden: !selectedTemplate.Comments || !config.siteTemplateSelectorEnabled },
                    React.createElement(MessageBar_1.MessageBar, null,
                        React.createElement("i", null, selectedTemplate.Comments)))))));
    }
    /**
     * Render footer
     */
    renderFooter() {
        switch (this.props.renderMode) {
            case NewProjectFormRenderMode_1.default.Default: {
                return (React.createElement("div", { style: { paddingTop: 15 } },
                    React.createElement("div", { style: { float: "right" } },
                        React.createElement(Button_1.PrimaryButton, { onClick: this.onSubmitForm, disabled: !this.state.formValid }, Resources_1.default.getResource("String_Create")))));
            }
            case NewProjectFormRenderMode_1.default.Dialog: {
                return (React.createElement(Dialog_1.DialogFooter, null,
                    React.createElement(Button_1.PrimaryButton, { onClick: this.onSubmitForm, disabled: !this.state.formValid }, Resources_1.default.getResource("String_Create")),
                    React.createElement(Button_1.DefaultButton, { onClick: this.props.onDialogDismiss }, Resources_1.default.getResource("String_Close"))));
            }
        }
    }
    /**
     *
     */
    onFormInputChange(inputName, newValue) {
        const prevModel = this.state.model;
        let model = Object.assign({}, this.state.model);
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
                this.doesWebExistDelay = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const doesExist = yield Provision_1.DoesWebExist(model.Url);
                        const errorMessages = Object.assign({}, this.state.errorMessages);
                        errorMessages.Url = doesExist ? Resources_1.default.getResource("NewProjectForm_UrlPlaceholderAlreadyInUse") : null;
                        const formValid = (model.Title.length >= this.props.titleMinLength) && !doesExist;
                        this.setState({ errorMessages, formValid });
                    }
                    catch (err) {
                        // Catch err
                    }
                }), this.props.doesWebExistDelayMs);
            }
        });
    }
    /**
     * Toggle content
     *
     * @param {ListConfig} lc List config
     * @param {boolean} checked Is checked
     */
    onToggleListContent(lc, checked) {
        this.setState((prevState) => {
            let { IncludeContent } = prevState.model;
            checked ? IncludeContent.push(lc) : IncludeContent.splice(IncludeContent.indexOf(lc), 1);
            return { model: Object.assign({}, prevState.model, { IncludeContent }) };
        });
    }
    /**
     * Toggle extension
     *
     * @param {Extension} extension Extension
     * @param {boolean} checked Is checked
     */
    onToggleExtension(extension, checked) {
        this.setState((prevState) => {
            let { Extensions } = prevState.model;
            checked ? Extensions.push(extension) : Extensions.splice(Extensions.indexOf(extension), 1);
            return { model: Object.assign({}, prevState.model, { Extensions }) };
        });
    }
    /**
     * Submits the form
     */
    onSubmitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ provisioning: { status: INewProjectFormState_1.ProvisionStatus.Creating } });
            try {
                const redirectUrl = yield Provision_1.default(this.state.model, (step, progress) => {
                    this.setState({ provisioning: { status: INewProjectFormState_1.ProvisionStatus.Creating, step, progress } });
                }, this.state.selectedTemplate);
                document.location.href = redirectUrl;
            }
            catch (_a) {
                this.setState({ provisioning: { status: INewProjectFormState_1.ProvisionStatus.Error } });
            }
        });
    }
    /**
     * Get required config for the component
     *
     * @returns {INewProjectFormConfig} An object of interface INewProjectFormConfig
     */
    getRequiredConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const [listData, extensions, templates, inheritPermissionsString, siteTemplateSelectorEnabledString] = yield Promise.all([
                ListDataConfig.RetrieveConfig(),
                GetSelectableExtensions_1.default(),
                GetSelectableTemplates_1.default(),
                Settings_1.GetSetting("PROJECT_INHERIT_PERMISSIONS", true),
                Settings_1.GetSetting("SITE_TEMPLATE_SELECTOR_ENABLED", true),
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
        });
    }
}
NewProjectForm.displayName = "NewProjectForm";
NewProjectForm.defaultProps = INewProjectFormProps_1.NewProjectFormDefaultProps;
__decorate([
    Utilities_1.autobind
], NewProjectForm.prototype, "onFormInputChange", null);
__decorate([
    Utilities_1.autobind
], NewProjectForm.prototype, "onToggleListContent", null);
__decorate([
    Utilities_1.autobind
], NewProjectForm.prototype, "onToggleExtension", null);
__decorate([
    Utilities_1.autobind
], NewProjectForm.prototype, "onSubmitForm", null);
exports.default = NewProjectForm;
