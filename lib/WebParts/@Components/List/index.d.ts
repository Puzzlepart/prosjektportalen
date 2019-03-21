import * as React from "react";
import IListProps from "./IListProps";
import IListState from "./IListState";
export default class List extends React.PureComponent<IListProps, IListState> {
    static defaultProps: Partial<IListProps>;
    /**
     * Constructor
     *
     * @param {IListProps} props Props
     */
    constructor(props: IListProps);
    /**
     * Renders the <List /> component
     */
    render(): React.ReactElement<IListProps>;
    /**
     * Renders command bar
     */
    private _renderCommandBar;
    /**
     * On render item column
     *
     * @param {any} item The item
     * @param {number} index The index
     * @param {IColumn} column The column
     */
    private _onRenderItemColumn;
    /**
     * Open project in modal
     *
     * @param {any} project The project
     */
    private _openProject;
    /**
     * Dismiss project modal
     */
    private _dismissProjectInfoModal;
    /**
     * On search
     *
     * @param {string} searchTerm Search term
     */
    private _onSearch;
    /**
     * Renders the Project Info modal
     */
    private _renderProjectInfoModal;
    /**
     * Get filtered data based on groupBy and searchTerm (search is case-insensitive)
     */
    private _getFilteredData;
    /**
     * Export to Excel
     */
    private _exportToExcel;
}
export { IListProps, IListState, };
