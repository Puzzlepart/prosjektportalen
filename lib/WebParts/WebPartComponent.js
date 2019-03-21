"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
class WebPartComponent {
    /**
     * Constructor
     *
     * @param {any} webPart Web part
     * @param {string} container Component container
     * @param {any} defaultProps Default props
     */
    constructor(component, container, defaultProps) {
        this.component = component;
        this.name = this.component.displayName;
        this.container = container;
        this.defaultProps = defaultProps;
    }
    getComponent(withDefaultProps = true, additionalProps = {}) {
        if (withDefaultProps) {
            return React.createElement(this.component, Object.assign({}, this.defaultProps, additionalProps));
        }
        else {
            return React.createElement(this.component, additionalProps);
        }
    }
    getElementProps() {
        const containerElement = document.getElementById(this.container);
        try {
            const elementProps = JSON.parse(containerElement.attributes["data-props"].value);
            return elementProps;
        }
        catch (_a) {
            return {};
        }
    }
    renderOnPage(withDefaultProps = true) {
        if (document.getElementById(this.container) !== null) {
            const containerElement = document.getElementById(this.container);
            ReactDOM.render(this.getComponent(withDefaultProps, this.getElementProps()), containerElement);
            return true;
        }
        return false;
    }
}
exports.default = WebPartComponent;
