import * as React from "react";
import IWebPropertyBagEditorProps from "./IWebPropertyBagEditorProps";
import IWebPropertyBagEditorState from "./IWebPropertyBagEditorState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Component: WebPropertyBagEditor
 */
export default class WebPropertyBagEditor extends BaseWebPart<IWebPropertyBagEditorProps, IWebPropertyBagEditorState> {
    static displayName: string;
    static defaultProps: Partial<IWebPropertyBagEditorProps>;
    /**
     * Constructor
     *
     * @param {IWebPropertyBagEditorProps} props Props
     */
    constructor(props: IWebPropertyBagEditorProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the <WebPropertyBagEditor /> component
     */
    render(): React.ReactElement<IWebPropertyBagEditorProps>;
    private _getItems;
    /**
     * On render item column
     *
     * @param {any} item Item
     * @param {number} index index
     * @param {IColumn} column Column
     */
    private _onRenderItemColumn;
    /**
     * On setting changed
     *
     * @param {any} setting Setting
     * @param {string} newValue New value
     */
    private _onSettingChanged;
    /**
     * On save changes
     */
    private _onSaveChanges;
}
export { IWebPropertyBagEditorProps, IWebPropertyBagEditorState, };
