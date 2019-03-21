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
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const ModalLinkIconPosition_1 = require("./ModalLinkIconPosition");
exports.ModalLinkIconPosition = ModalLinkIconPosition_1.default;
const IModalLinkProps_1 = require("./IModalLinkProps");
const jsom_ctx_1 = require("jsom-ctx");
/**
 * Modal Link
 */
class ModalLink extends React.PureComponent {
    /**
     * Constructor
     *
     * @param {IModalLinkProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = {};
    }
    /**
     * Component did mount
     */
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.permissionKind) {
                const jsomCtx = yield jsom_ctx_1.CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
                const permissions = new SP.BasePermissions();
                permissions.set(this.props.permissionKind);
                const userHasPermission = jsomCtx.web.doesUserHavePermissions(permissions);
                yield jsom_ctx_1.ExecuteJsomQuery(jsomCtx);
                this.setState({ shouldRender: userHasPermission.get_value() });
            }
            else {
                this.setState({ shouldRender: true });
            }
            return;
        });
    }
    /**
     * Renders the <ModalLink /> component
     */
    render() {
        if (this.state.shouldRender) {
            let iconPosition = ModalLinkIconPosition_1.default.Left;
            if (this.props.icon && this.props.icon.hasOwnProperty("position")) {
                iconPosition = this.props.icon.position;
            }
            return (React.createElement("a", { href: this.props.url, hidden: this.props.hidden, onClick: this.showModalDialog, id: this.props.id, className: this.props.className, style: this.props.style },
                this.props.icon && iconPosition === ModalLinkIconPosition_1.default.Left && (React.createElement(Icon_1.Icon, { iconName: this.props.icon.iconName, style: { marginRight: 5 } })),
                (this.props.label && this.props.showLabel) && this.props.label,
                this.props.icon && iconPosition === ModalLinkIconPosition_1.default.Right && (React.createElement(Icon_1.Icon, { iconName: this.props.icon.iconName, style: { marginLeft: 5 } }))));
        }
        return null;
    }
    /**
     * Show Modal Dialog
     *
     * @param {React.MouseEvent<HTMLAnchorElement>} event Event
     */
    showModalDialog(event) {
        event.preventDefault();
        event.stopPropagation();
        let modalOptions = {
            title: this.props.title || this.props.label,
            url: this.props.url,
        };
        if (this.props.width) {
            modalOptions.width = this.props.width;
        }
        if (this.props.height) {
            modalOptions.height = this.props.height;
        }
        let urlParams = [];
        if (this.props.options) {
            Object.keys(this.props.options).forEach(key => {
                let value = this.props.options[key];
                if (value === true) {
                    value = "1";
                }
                else if (value === false) {
                    value = "0";
                }
                urlParams.push(`${key}=${value}`);
            });
            if (urlParams.length > 0) {
                let u = this.props.url.indexOf("?") === -1 ? "?" : "&";
                modalOptions.url = `${modalOptions.url}${u}${urlParams.join("&")}`;
            }
        }
        if (this.props.onDialogReturnValueCallback) {
            modalOptions.dialogReturnValueCallback = this.props.onDialogReturnValueCallback;
        }
        else if (this.props.reloadOnSubmit || this.props.reloadOnCancel) {
            modalOptions.dialogReturnValueCallback = result => {
                if (result === 1 && this.props.reloadOnSubmit) {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
                }
                if (result === 0 && this.props.reloadOnCancel) {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
                }
            };
        }
        SP.UI.ModalDialog.showModalDialog(modalOptions);
    }
}
ModalLink.displayName = "ModalLink";
ModalLink.defaultProps = IModalLinkProps_1.ModalLinkDefaultProps;
__decorate([
    Utilities_1.autobind
], ModalLink.prototype, "showModalDialog", null);
exports.default = ModalLink;
exports.ModalLink = ModalLink;
