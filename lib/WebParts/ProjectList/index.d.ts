/// <reference types="react" />
import IProjectListProps from "./IProjectListProps";
import IProjectListState from "./IProjectListState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Project information
 */
export default class ProjectList extends BaseWebPart<IProjectListProps, IProjectListState> {
    static displayName: string;
    static defaultProps: Partial<IProjectListProps>;
    private _searchTimeout;
    /**
     * Constructor
     *
     * @param {IProjectListProps} props Props
     */
    constructor(props: IProjectListProps);
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
    /**
     * Render project cards
     */
    private renderCards;
    /**
     * Renders the project info modal
     */
    private renderProjectInfoModal;
    /**
     * Get class name for a ProjectListModel. Combines props.tileClassName and props.propertyClassNames.
     *
    * @param {ProjectListModel} project Project list model
    */
    private getClassName;
    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive
     */
    private getFilteredData;
    private _onSearch;
    /**
     * Fetch data using @pnp/sp search
     */
    private fetchData;
}
export { IProjectListProps, IProjectListState, };
