/// <reference types="react" />
import IDynamicPortfolioProps from "./IDynamicPortfolioProps";
import IDynamicPortfolioState from "./IDynamicPortfolioState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Dynamic Portfolio
 */
export default class DynamicPortfolio extends BaseWebPart<IDynamicPortfolioProps, IDynamicPortfolioState> {
    static displayName: string;
    static defaultProps: Partial<IDynamicPortfolioProps>;
    /**
     * Constructor
     *
     * @param {IDynamicPortfolioProps} props Props
     */
    constructor(props: IDynamicPortfolioProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the component
     */
    render(): JSX.Element;
    /**
    * Render status bar
    */
    private renderStatusBar;
    /**
     * Render items
     */
    private renderItems;
    /**
     * Render Filter Panel
     */
    private renderFilterPanel;
    /**
     * Renders the Project Info modal
     */
    private renderProjectInfoModal;
    /**
     * Renders the command bar from office-ui-fabric-react
     */
    private renderCommandBar;
    /**
     * Renders search box
     */
    private renderSearchBox;
    /**
     * Fetch initial data
     */
    private fetchInitialData;
    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     */
    private getFilteredData;
    /**
     * Export current view to Excel (xlsx)
     */
    private exportToExcel;
    /**
     * Get selected filters with items. Based on refiner configuration retrieved from the config list,
     * the filters are checked against refiners retrieved by search.
     *
     * @param {any[]} refiners Refiners retrieved by search
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig} viewConfig View configuration
     */
    private getSelectedFiltersWithItems;
    /**
     * Acts on filter change.
     *
     * @param {IDynamicPortfolioFilter} filter The filter that was changed
     */
    private _onFilterChange;
    /**
     * On column sort
     *
     * @param {any} event Event
     * @param {any} column The column config
     */
    private _onColumnSort;
    /**
    * On open project Modal
    *
    * @param {any} event Event
    * @param {any} item The item
    */
    private _onOpenProjectModal;
    /**
     * Changes view, doing a new search
     *
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig} viewConfig View configuration
     */
    private _onChangeView;
}
export { IDynamicPortfolioProps, IDynamicPortfolioState, };
