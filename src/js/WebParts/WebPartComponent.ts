import * as React from "react";
import * as ReactDOM from "react-dom";

export default class WebPartComponent {
    public component: any;
    public name: string;
    public container: string;
    public defaultProps: { [key: string]: any };

    /**
     * Constructor
     *
     * @param {any} webPart Web part
     * @param {string} container Component container
     * @param {any} defaultProps Default props
     */
    constructor(component, container: string, defaultProps: { [key: string]: any } = {}) {
        this.component = component;
        this.name = this.component.displayName;
        this.container = container;
        this.defaultProps = defaultProps;
    }

    public getComponent(withDefaultProps = true) {
        if (withDefaultProps) {
            return React.createElement(this.component, this.defaultProps);
        } else {
            return React.createElement(this.component, {});
        }
    }

    public renderOnPage(withDefaultProps = true): boolean {
        if (document.getElementById(this.container) !== null) {
            ReactDOM.render(this.getComponent(withDefaultProps), document.getElementById(this.container));
            return true;
        }
        return false;
    }
}
