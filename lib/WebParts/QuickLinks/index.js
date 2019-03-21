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
const Resources_1 = require("../../Resources");
const sp_1 = require("@pnp/sp");
const React = require("react");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const _BaseWebPart_1 = require("../@BaseWebPart");
/**
 * Component: QuickLinks
 */
class QuickLinks extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IQuickLinksProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true });
        /**
        * Render items
        *
        * @param {IQuickLinksProps} param0 Props
        * @param {IQuickLinksState} param1 State
        */
        this.renderItems = ({ listClassName }, { isLoading, links }) => {
            if (isLoading) {
                return React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large });
            }
            else if (links.length > 0) {
                return (React.createElement("div", { ref: this._containerRef },
                    React.createElement("ul", { className: listClassName }, links.map((lnk, idx) => (React.createElement("li", { key: idx },
                        React.createElement("h5", null,
                            React.createElement("a", { href: lnk.URL.Url, target: "_blank" }, lnk.URL.Description)),
                        React.createElement("span", { className: "ms-metadata" }, lnk.Comments)))))));
            }
            else {
                return (React.createElement("div", { ref: this._containerRef },
                    React.createElement(MessageBar_1.MessageBar, null, Resources_1.default.getResource("WebPart_EmptyMessage"))));
            }
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
            const links = yield rootWeb
                .lists
                .getByTitle(Resources_1.default.getResource("Lists_QuickLinks_Title"))
                .items
                .orderBy(this.props.orderBy, this.props.orderAsc)
                .top(this.props.itemsCount)
                .select("URL", "Comments")
                .get();
            this.setState({ links: links, isLoading: false });
        });
    }
    /**
     * Renders the <QuickLinks /> component
     */
    render() {
        return (React.createElement("div", null,
            this._renderChrome(Resources_1.default.getResource("WebPart_Links_Title"), this.state.elementToToggle, QuickLinks.displayName),
            this.renderItems(this.props, this.state)));
    }
    _containerRef(div) {
        this.setState({ elementToToggle: div });
    }
}
QuickLinks.displayName = "QuickLinks";
QuickLinks.defaultProps = {
    itemsCount: 10,
    orderBy: "GtSortOrder",
    orderAsc: true,
    listClassName: "pp-simpleList spacing-m",
};
__decorate([
    Utilities_1.autobind
], QuickLinks.prototype, "_containerRef", null);
exports.default = QuickLinks;
