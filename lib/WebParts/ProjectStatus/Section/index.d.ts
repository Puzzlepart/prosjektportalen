import * as React from "react";
import ISectionProps from "./ISectionProps";
import ISectionState from "./ISectionState";
export default class Section extends React.PureComponent<ISectionProps, ISectionState> {
    /**
     * Constructor
     */
    constructor(props: ISectionProps);
    componentDidMount(): void;
    /**
     * Renders the component
     */
    render(): React.ReactElement<ISectionProps>;
    /**
     * Render header
     *
     * @param {ISectionProps} param0 Props
     * @param {ISectionState} param1 State
     */
    private renderHeader;
    /**
     * Render inner
     *
     * @param {ISectionProps} param0 Props
     * @param {ISectionState} param1 State
     */
    private renderInner;
    /**
     * Renders custom component
     *
     * @param {string} customComponentName Custom component name
     */
    private renderCustomComponent;
    /**
     * Should the component fetch data (if listTitle is specified)
     *
     * @param {ISectionProps} param0 Props
     */
    private shouldFetchListData;
    /**
    * Fetches required data
     *
     * @param {ISectionProps} param0 Props
    */
    private fetchListData;
    /**
     * Create column from sp field
     *
     * @param {SP.Field} field The field
     */
    private createColumnFromSpField;
}
