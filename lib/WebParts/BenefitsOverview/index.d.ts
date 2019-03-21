/// <reference types="react" />
import IBenefitsOverviewProps from "./IBenefitsOverviewProps";
import IBenefitsOverviewState from "./IBenefitsOverviewState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Benefits Overview
 */
export default class BenefitsOverview extends BaseWebPart<IBenefitsOverviewProps, IBenefitsOverviewState> {
    static displayName: string;
    static defaultProps: Partial<IBenefitsOverviewProps>;
    /**
     * Constructor
     *
     * @param {IBenefitsOverviewProps} props Props
     */
    constructor(props: IBenefitsOverviewProps);
    componentDidMount(): Promise<void>;
    /**
     * Render the <BenefitsOverview /> component
     */
    render(): JSX.Element;
    private onRenderItemColumn;
    /**
     * Renders the command bar from office-ui-fabric-react
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private renderCommandBar;
    /**
     * Renders the Project Info modal
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private renderProjectInfoModal;
    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private getFilteredData;
    /**
     * Sorting on column click
     *
     * @param {React.MouseEvent} event Event
     * @param {IColumn} column Column
     */
    private onColumnClick;
    /**
     * Export current view to Excel (xlsx)
     */
    private exportToExcel;
}
export { IBenefitsOverviewProps, IBenefitsOverviewState };
