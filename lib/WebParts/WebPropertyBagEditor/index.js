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
const React = require("react");
const Resources_1 = require("../../Resources");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const TextField_1 = require("office-ui-fabric-react/lib/TextField");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const IWebPropertyBagEditorProps_1 = require("./IWebPropertyBagEditorProps");
const Settings_1 = require("../../Settings");
const _BaseWebPart_1 = require("../@BaseWebPart");
/**
 * Component: WebPropertyBagEditor
 */
class WebPropertyBagEditor extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IWebPropertyBagEditorProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const { settings, options } = yield Settings_1.GetSettingsAndOptions();
            this.setState({ settings, options, isLoading: false });
        });
    }
    /**
     * Renders the <WebPropertyBagEditor /> component
     */
    render() {
        if (this.state.isLoading) {
            return React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.large });
        }
        if (Object.keys(this.state.settings).length === 0) {
            return (React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.info }, Resources_1.default.getResource("WebPropertyBagEditor_NoSettings")));
        }
        return (React.createElement("div", null,
            React.createElement(DetailsList_1.DetailsList, { items: this._getItems(), columns: this.props.columns, onRenderItemColumn: this._onRenderItemColumn, constrainMode: DetailsList_1.ConstrainMode.horizontalConstrained, layoutMode: DetailsList_1.DetailsListLayoutMode.justified, selectionMode: DetailsList_1.SelectionMode.none }),
            React.createElement("div", { style: { width: 400, marginTop: 20 } },
                this.state.isSaving
                    ? React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.large })
                    : (React.createElement(Button_1.PrimaryButton, { text: Resources_1.default.getResource("String_SaveChanges"), disabled: this.state.isSaving, style: { margin: 0 }, iconProps: { iconName: "SaveAll" }, onClick: this._onSaveChanges })),
                this.state.statusMessage && (React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(MessageBar_1.MessageBar, { messageBarType: this.state.statusMessage.messageBarType }, this.state.statusMessage.children))))));
    }
    _getItems() {
        return Object.keys(this.state.settings).map(key => ({
            key,
            value: this.state.settings[key],
            options: this.state.options[key],
        }));
    }
    /**
     * On render item column
     *
     * @param {any} item Item
     * @param {number} index index
     * @param {IColumn} column Column
     */
    _onRenderItemColumn(item, index, column) {
        const colValue = item[column.fieldName];
        if (column.fieldName === "value") {
            if (item.options) {
                return (React.createElement("div", { style: { width: 200 } },
                    React.createElement(Dropdown_1.Dropdown, { disabled: this.state.isSaving, onChanged: option => this._onSettingChanged(item, `${option.key}`), defaultSelectedKey: colValue, options: item.options.map(text => ({ key: text, text })) })));
            }
            return (React.createElement("div", { style: { width: 200 } },
                React.createElement(TextField_1.TextField, { disabled: this.state.isSaving, onChanged: newValue => this._onSettingChanged(item, newValue), value: colValue })));
        }
        return colValue;
    }
    /**
     * On setting changed
     *
     * @param {any} setting Setting
     * @param {string} newValue New value
     */
    _onSettingChanged(setting, newValue) {
        let { settings } = this.state;
        settings[setting.key] = newValue;
        this.setState({ settings });
    }
    /**
     * On save changes
     */
    _onSaveChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            let { settings } = this.state;
            this.setState({ isSaving: true }, () => __awaiter(this, void 0, void 0, function* () {
                yield Settings_1.UpdateSettings(settings);
                const statusMessage = {
                    messageBarType: MessageBar_1.MessageBarType.success,
                    children: React.createElement("span", null, Resources_1.default.getResource("String_ChangesWasSaved")),
                };
                this.setState({ isSaving: false, statusMessage });
                window.setTimeout(() => {
                    this.setState({ statusMessage: null });
                }, 5000);
            }));
        });
    }
}
WebPropertyBagEditor.displayName = "WebPropertyBagEditor";
WebPropertyBagEditor.defaultProps = IWebPropertyBagEditorProps_1.WebPropertyBagEditorDefaultProps;
__decorate([
    Utilities_1.autobind
], WebPropertyBagEditor.prototype, "_onRenderItemColumn", null);
__decorate([
    Utilities_1.autobind
], WebPropertyBagEditor.prototype, "_onSaveChanges", null);
exports.default = WebPropertyBagEditor;
