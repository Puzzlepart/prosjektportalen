"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const Util = require("../../../Util");
class ChromeTitle extends React.PureComponent {
    /**
     * Constructor
     *
     * @param {IChromeTitleProps} props Props
     */
    constructor(props) {
        super(props);
        /**
         * Toggle storage key
         */
        this.toggleStorageKey = "";
        /**
         * On chrome click
         */
        this.onClick = () => {
            if (!this.props.toggleElement) {
                return;
            }
            const { storage, element } = this.props.toggleElement;
            const { isCollapsed } = this.state;
            let newState = { isCollapsed: !isCollapsed };
            this.setState(newState);
            element.style.display = newState.isCollapsed ? "none" : "block";
            if (storage) {
                window[storage.type].setItem(this.toggleStorageKey, JSON.stringify(newState.isCollapsed));
            }
        };
        this.state = { isCollapsed: false };
    }
    /**
     * Component did mount
     */
    componentDidMount() {
        if (!this.props.toggleElement) {
            return;
        }
        const { storage, element } = this.props.toggleElement;
        if (storage && element) {
            this.toggleStorageKey = Util.generateStorageKey([storage.key, "CollapsedState"]);
            let newState = {
                isCollapsed: this.getCollapsedStateFromStorage(),
            };
            this.setState(newState);
            if (newState.isCollapsed) {
                element.style.display = "none";
            }
        }
    }
    /**
     * Renders the component
     */
    render() {
        return (React.createElement("div", { hidden: this.props.hidden, className: "ms-webpart-chrome-title", onClick: this.onClick, style: { width: this.props.width } },
            React.createElement("span", { title: this.props.title, className: "js-webpart-titleCell" },
                React.createElement("h2", { className: "ms-webpart-titleText", style: {
                        cursor: this.props.toggleElement ? "poiner" : "inherit",
                        textAlign: "justify",
                        position: "relative",
                    } },
                    React.createElement("span", null, this.props.title),
                    this.props.toggleElement && (React.createElement(Icon_1.Icon, { iconName: this.state.isCollapsed ? "ChevronDown" : "ChevronUp", style: {
                            fontSize: 14,
                            position: "absolute",
                            right: 5,
                            top: 10,
                        } }))))));
    }
    /**
     * Get collapsed state from storage (localStorage or sessionStorage)
     */
    getCollapsedStateFromStorage() {
        const { storage } = this.props.toggleElement;
        const value = window[storage.type].getItem(this.toggleStorageKey);
        if (value) {
            try {
                const parsedValue = JSON.parse(value);
                return parsedValue;
            }
            catch (e) {
                return true;
            }
        }
        else {
            return true;
        }
    }
}
ChromeTitle.defaultProps = {
    hidden: false,
    width: "100%",
};
exports.default = ChromeTitle;
