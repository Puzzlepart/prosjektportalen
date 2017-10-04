import * as React from "react";
import ChromeTitle from "../@Components/ChromeTitle";
import IBaseWebPartProps from "./IBaseWebPartProps";
import IBaseWebPartState from "./IBaseWebPartState";

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
     * Render chrome
     *
     * @param {string} title Title
     * @param {HTMLElement} element Element to toggle
     * @param {string} key Storage key
     * @param {boolean} hideChrome Hide chrome
     */
    public __renderChrome = (title: string, element: HTMLElement, key: string, hideChrome = false) => {
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
}

export {
    IBaseWebPartProps,
    IBaseWebPartState,
};

