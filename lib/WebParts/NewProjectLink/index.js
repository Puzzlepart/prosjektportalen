"use strict";
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
const Button_1 = require("office-ui-fabric-react/lib/Button");
const INewProjectLinkProps_1 = require("./INewProjectLinkProps");
const _SecuredWebPart_1 = require("../@SecuredWebPart");
const NewProjectForm_1 = require("../NewProjectForm");
//#endregion
/**
 * New Project link
 */
class NewProjectLink extends _SecuredWebPart_1.default {
    /**
     * Constructor
     *
     * @param {INewProjectLinkProps} props Props
     */
    constructor(props) {
        super(props, { listDataConfig: {} });
        this._onDialogDismiss = this._onDialogDismiss.bind(this);
        this._onOpenDialog = this._onOpenDialog.bind(this);
    }
    /**
     * Component did mount
     */
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onInit();
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Button_1.ActionButton, { disabled: !this.state.shouldRender, style: { margin: 0 }, iconProps: this.props.iconProps, text: this.props.linkText, onClick: this._onOpenDialog }),
            this.renderDialog()));
    }
    /**
     * Renders the dialog
     */
    renderDialog() {
        if (this.state.showDialog) {
            return (React.createElement(NewProjectForm_1.default, { renderMode: NewProjectForm_1.NewProjectFormRenderMode.Dialog, onDialogDismiss: this._onDialogDismiss, headerText: this.props.dlgHeaderText, subHeaderText: this.props.dlgSubHeaderText, creationModalTitle: this.props.creationModalTitle }));
        }
        return null;
    }
    _onOpenDialog() {
        this.setState({ showDialog: true });
    }
    _onDialogDismiss() {
        this.setState({ showDialog: false });
    }
}
NewProjectLink.displayName = "NewProjectLink";
NewProjectLink.defaultProps = INewProjectLinkProps_1.NewProjectLinkDefaultProps;
exports.default = NewProjectLink;
