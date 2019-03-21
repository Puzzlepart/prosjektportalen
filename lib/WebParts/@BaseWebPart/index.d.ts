import * as React from "react";
import IBaseWebPartProps from "./IBaseWebPartProps";
import IBaseWebPartState from "./IBaseWebPartState";
export default class BaseWebPart<P extends IBaseWebPartProps, S extends IBaseWebPartState> extends React.PureComponent<P, S> {
    /**
     * Constructor
     *
     * @param {P} props Props
     * @param {S} initialState State
     */
    constructor(props: P, initialState: S);
    /**
     * Update state
     *
     * @param {S} updatedState Updated state
     */
    updateState(updatedState: S): Promise<void>;
    /**
     * Render chrome
     *
     * @param {string} title Title
     * @param {HTMLElement} element Element to toggle
     * @param {string} key Storage key
     * @param {boolean} hideChrome Hide chrome
     */
    _renderChrome(title: string, element: HTMLElement, key: string, hideChrome?: boolean): JSX.Element;
}
export { IBaseWebPartProps, IBaseWebPartState, };
