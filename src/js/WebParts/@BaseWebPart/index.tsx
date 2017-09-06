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
     * @param {string} selector Selector for toggle
     * @param {string} key Storage key
     */
    public __renderChrome = (title: string, selector: string, key: string) => {
        console.log(title, selector, key);
        return (
            <ChromeTitle
                title={title}
                toggleElement={{
                    selector: selector,
                    animationDelay: 100,
                    animation: "slideToggle",
                    storage: {
                        key: key,
                        type: "localStorage",
                    },
                }}
            />
        );
    }
}

export {
    IBaseWebPartProps,
    IBaseWebPartState,
};

