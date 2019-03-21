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
const jsom_ctx_1 = require("jsom-ctx");
const _BaseWebPart_1 = require("../@BaseWebPart");
class SecuredWebPart extends _BaseWebPart_1.default {
    /**
    * Constructor
    *
    * @param {P} props Props
    * @param {S} initialState State
    */
    constructor(props, initialState) {
        super(props, initialState);
    }
    /**
     * On init
     */
    onInit() {
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
}
exports.default = SecuredWebPart;
