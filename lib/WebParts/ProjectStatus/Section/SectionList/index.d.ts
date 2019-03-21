import * as React from "react";
import ISectionListProps from "./ISectionListProps";
import ISectionListState from "./ISectionListState";
/**
 * Section List
 */
export default class SectionList extends React.Component<ISectionListProps, ISectionListState> {
    /**
     * Constructor
     *
     * @param {ISectionListProps} props Props
     */
    constructor(props: ISectionListProps);
    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    render(): JSX.Element;
    /**
     * Renders the component
     *
     * @param {ISectionListProps} param0 Props
     * @param {ISectionListState} param1 State
     */
    _render({ id }: ISectionListProps, { listData }: ISectionListState): JSX.Element;
    /**
     * On render item column
     *
     * @param {any} item Item
     * @param {number} index Index
     * @param {IColumn} col Column
     * @param {ISectionListProps} param3 Props
     * @param {ISectionListState} param4 State
     */
    private _onRenderItemColumn;
    /**
     * On render item column
     *
     * @param {any} event Event
     * @param {IColumn} column Column
     * @param {ISectionListProps} param2 Props
     * @param {ISectionListState} param3 State
     */
    private _onColumnSort;
}
