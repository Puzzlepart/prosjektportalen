import * as React from "react";
import IBaseWebPartProps from "./IBaseWebPartProps";
import IBaseWebPartState from "./IBaseWebPartState";

export default class BaseWebPart<P extends IBaseWebPartProps, S extends IBaseWebPartState> extends React.PureComponent<P, S> {
    /**
     * Constructor
     *
     * @param {IBaseWebPartProps} props Props
     */
    constructor(props: P) {
        super(props);
    }
}

export {
    IBaseWebPartProps,
    IBaseWebPartState,
};

