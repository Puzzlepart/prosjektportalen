"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sp_1 = require("@pnp/sp");
const React = require("react");
const Resources_1 = require("../../Resources");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Util = require("../../Util");
const IAnnouncementsProps_1 = require("./IAnnouncementsProps");
const _BaseWebPart_1 = require("../@BaseWebPart");
/**
 * Announcements
 */
class Announcements extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IAnnouncementsProps} props Props
     */
    constructor(props) {
        super(props, {
            isLoading: true,
        });
        /**
         * Render items
         *
         * @param {IAnnouncementsProps} param0 Props
         * @param {IAnnouncementsState} param1 State
         */
        this.renderItems = ({}, { isLoading, entries }) => {
            if (isLoading) {
                return (React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large }));
            }
            else if (entries.length > 0) {
                return (React.createElement("div", { ref: elementToToggle => this.setState({ elementToToggle }) },
                    React.createElement("ul", { className: this.props.listClassName }, entries.map((entry, idx) => React.createElement("li", { key: idx },
                        React.createElement("h5", null,
                            React.createElement("a", { style: { cursor: "pointer" }, onClick: e => this.setState({ showAnnouncement: entry }) }, entry.Title)),
                        React.createElement("span", { className: "ms-metadata" },
                            Resources_1.default.getResource("String_Published"),
                            " ",
                            Util.dateFormat(entry.Created)))))));
            }
            else {
                return (React.createElement("div", { ref: elementToToggle => this.setState({ elementToToggle }) },
                    React.createElement(MessageBar_1.MessageBar, null, Resources_1.default.getResource("WebPart_EmptyMessage"))));
            }
        };
        /**
         * Render modal
         *
         * @param {IAnnouncementsProps} param0 Props
         * @param {IAnnouncementsState} param1 State
        */
        this.renderModal = ({ modalContainerClassName, modalHeaderClassName, modalBodyClassName }, { showAnnouncement }) => {
            if (showAnnouncement) {
                return (React.createElement(Modal_1.Modal, { isOpen: showAnnouncement, isDarkOverlay: true, onDismiss: e => this.setState({ showAnnouncement: null }), containerClassName: modalContainerClassName, isBlocking: false },
                    React.createElement("div", { style: { padding: 50 } },
                        React.createElement("div", { className: modalHeaderClassName },
                            React.createElement("span", null, showAnnouncement.Title)),
                        React.createElement("div", { className: "ms-font-xs", style: { marginTop: 20 } },
                            "Publisert ",
                            Util.dateFormat(showAnnouncement.Created)),
                        React.createElement("div", { className: modalBodyClassName, dangerouslySetInnerHTML: { __html: showAnnouncement.Body } }))));
            }
            return null;
        };
    }
    /**
     * Component did mount
     */
    componentDidMount() {
        const { itemsCount, itemsFilter, itemsOrderBy, } = this.props;
        new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .lists
            .getByTitle(Resources_1.default.getResource("Lists_Announcements_Title"))
            .items
            .filter(itemsFilter)
            .top(itemsCount)
            .orderBy(itemsOrderBy.orderBy, itemsOrderBy.ascending)
            .get().then(entries => {
            this.setState({ entries: entries, isLoading: false });
        });
    }
    /**
     * Renders the component
     */
    render() {
        return (React.createElement("div", null,
            this._renderChrome(Resources_1.default.getResource("WebPart_Announcements_Title"), this.state.elementToToggle, Announcements.displayName),
            this.renderItems(this.props, this.state),
            this.renderModal(this.props, this.state)));
    }
}
Announcements.displayName = "Announcements";
Announcements.defaultProps = IAnnouncementsProps_1.AnnouncementsDefaultProps;
exports.default = Announcements;
