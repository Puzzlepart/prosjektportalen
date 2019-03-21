import * as React from "react";
export default class WebPartComponent<T> {
    component: any;
    name: string;
    container: string;
    defaultProps: any;
    /**
     * Constructor
     *
     * @param {any} webPart Web part
     * @param {string} container Component container
     * @param {any} defaultProps Default props
     */
    constructor(component: any, container: string, defaultProps?: T);
    getComponent(withDefaultProps?: boolean, additionalProps?: {}): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.ComponentElement<any, React.Component<any, React.ComponentState, any>>;
    getElementProps(): any;
    renderOnPage(withDefaultProps?: boolean): boolean;
}
