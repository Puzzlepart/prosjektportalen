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
const Resources_1 = require("../../Resources");
const jsom_ctx_1 = require("jsom-ctx");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const Util = require("../../Util");
const ILatestProjectsProps_1 = require("./ILatestProjectsProps");
const _BaseWebPart_1 = require("../@BaseWebPart");
//#endregion
class LatestProjects extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {ILatestProjectsProps} props Props
     */
    constructor(props) {
        super(props, {
            isLoading: true,
            subwebs: null,
        });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subwebs = yield this.fetchSubwebsForCurrentUser();
                this.setState({ subwebs, isLoading: false });
            }
            catch (err) {
                this.setState({ isLoading: false });
            }
        });
    }
    componentWillUnmount() {
        window.clearInterval(this.reloadInterval);
    }
    /**
     * Renders the <LatestProjects /> component
     */
    render() {
        return (React.createElement("div", null,
            this._renderChrome(this.props.chromeTitle, this.state.elementToToggle, LatestProjects.displayName),
            this.renderItems()));
    }
    /**
     * Render items
     */
    renderItems() {
        const { isLoading, subwebs } = this.state;
        if (isLoading) {
            return React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: this.props.loadingText });
        }
        else if (subwebs == null) {
            return (React.createElement("div", { className: "ms-font-xs" },
                React.createElement(Icon_1.Icon, { iconName: "Error", style: { color: "#000" } }),
                "  ",
                Resources_1.default.getResource("WebPart_FailedMessage")));
        }
        else if (subwebs.length > 0) {
            return (React.createElement("div", { ref: elementToToggle => this.setState({ elementToToggle }) },
                React.createElement("ul", { className: this.props.listClassName }, subwebs.map(({ Title, Url, Created }, index) => (React.createElement("li", { key: `Project_${index}` },
                    React.createElement("div", null,
                        React.createElement("h5", null,
                            React.createElement("a", { href: Url }, Title)),
                        React.createElement("div", { className: "ms-font-xs" },
                            Resources_1.default.getResource("String_Created"),
                            " ",
                            Util.dateFormat(Created)))))))));
        }
        else {
            return (React.createElement("div", { ref: elementToToggle => this.setState({ elementToToggle }) },
                React.createElement(MessageBar_1.MessageBar, null, Resources_1.default.getResource("WebPart_EmptyMessage"))));
        }
    }
    /**
     * Fetch subwebs for current user using JSOM
     */
    fetchSubwebsForCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsomCtx = yield jsom_ctx_1.CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
            const webCollection = yield jsomCtx.web.getSubwebsForCurrentUser(null);
            yield jsom_ctx_1.ExecuteJsomQuery(jsomCtx, [{ clientObject: webCollection }]);
            const subwebs = webCollection.get_data()
                .map(web => ({
                Title: web.get_title(),
                Url: web.get_url(),
                Created: web.get_created(),
            }))
                .sort((a, b) => {
                const aCreatedTime = a.Created.getTime();
                const bCreatedTime = b.Created.getTime();
                if (aCreatedTime < bCreatedTime) {
                    return 1;
                }
                if (aCreatedTime > bCreatedTime) {
                    return -1;
                }
                return 0;
            })
                .splice(0, this.props.itemsCount);
            return subwebs;
        });
    }
}
LatestProjects.displayName = "LatestProjects";
LatestProjects.defaultProps = ILatestProjectsProps_1.LatestProjectsDefaultProps;
exports.default = LatestProjects;
