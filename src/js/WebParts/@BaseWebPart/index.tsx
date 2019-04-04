//#region Imports
import __ from "../../Resources";
import * as React from "react";
import ChromeTitle from "../@Components/ChromeTitle";
import IBaseWebPartProps from "./IBaseWebPartProps";
import IBaseWebPartState from "./IBaseWebPartState";
//#endregion

export default class BaseWebPart<P extends IBaseWebPartProps, S extends IBaseWebPartState> extends React.PureComponent<P, S> {
    /**
     * Constructor
     *
     * @param {P} props Props
     * @param {S} initialState State
     */
    constructor(props: P, initialState: S) {
        super(props);
        this.state = initialState;
    }

    /**
     * Update state
     *
     * @param {S} updatedState Updated state
     */
    public async updateState(updatedState: S): Promise<void> {
        this.setState(updatedState, () => {
            return;
        });
    }

    /**
     * Render chrome
     *
     * @param {string} title Title
     * @param {HTMLElement} element Element to toggle
     * @param {string} key Storage key
     * @param {boolean} hideChrome Hide chrome
     */
    public _renderChrome(title: string, element: HTMLElement, key: string, hideChrome = false) {
        return (
            <ChromeTitle
                title={title}
                toggleElement={{
                    element,
                    storage: {
                        key: key,
                        type: "localStorage",
                    },
                }}
                hidden={hideChrome}
            />
        );
    }
}

export { IBaseWebPartProps, IBaseWebPartState };

