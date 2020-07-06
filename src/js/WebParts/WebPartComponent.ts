import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default class WebPartComponent<T> {
    public component: any;
    public name: string;
    public container: string;
    public defaultProps;

    /**
     * Constructor
     *
     * @param {any} webPart Web part
     * @param {string} container Component container
     * @param {any} defaultProps Default props
     */
    constructor(component, container: string, defaultProps?: T) {
        this.component = component
        this.name = this.component.displayName
        this.container = container
        this.defaultProps = defaultProps
    }

    public getComponent(withDefaultProps = true, additionalProps = {}) {
        if (withDefaultProps) {
            return React.createElement(this.component, { ...this.defaultProps, ...additionalProps })
        } else {
            return React.createElement(this.component, additionalProps)
        }
    }

    public getElementProps() {
        const containerElement = document.getElementById(this.container)
        try {
            const elementProps = JSON.parse(containerElement.attributes['data-props'].value)
            return elementProps
        } catch {
            return {}
        }
    }

    public renderOnPage(withDefaultProps = true): boolean {
        if (document.getElementById(this.container) !== null) {
            const containerElement = document.getElementById(this.container)
            ReactDOM.render(this.getComponent(withDefaultProps, this.getElementProps()), containerElement)
            return true
        }
        return false
    }
}
