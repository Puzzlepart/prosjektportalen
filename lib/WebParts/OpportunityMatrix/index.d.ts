import * as React from "react";
import IOpportunityMatrixProps from "./IOpportunityMatrixProps";
import IOpportunityMatrixState from "./IOpportunityMatrixState";
/**
 * Opportunity Matrix
 */
export default class OpportunityMatrix extends React.Component<IOpportunityMatrixProps, IOpportunityMatrixState> {
    static displayName: string;
    static defaultProps: Partial<IOpportunityMatrixProps>;
    private _tableElement;
    private _pnpList;
    /**
     * Constructor
     *
     * @param {IOpportunityMatrixProps} props Props
     */
    constructor(props: IOpportunityMatrixProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the <OpportunityMatrix /> component
     */
    render(): React.ReactElement<IOpportunityMatrixProps>;
    /**
     * Render rows
     *
     * @param {any[]} opportunityItems Opportunity items
     */
    private renderRows;
    /**
     * Helper function to get opportunity elements for cell post action
     *
     * @param {Array<any>} items Items
     * @param {IMatrixCell} cell The cell
     */
    private getOpportunityElementsPostActionForCell;
    /**
     * Helper function to get opportunity elements
     *
     * @param {Array<any>} items Items
     * @param {IMatrixCell} cell The cell
     */
    private getOpportunityElementsForCell;
    /**
     * Transform SP list views to IDropdownOption[]
     */
    private getViewOptions;
    /**
     * On view changed
     *
     * @param {string} viewQuery View query
     */
    private onViewChanged;
    /**
     * Create CamlQuery
     *
     * @param {string} viewQuery View query
     */
    private createCamlQuery;
    /**
     * Fetch data
     */
    private fetchData;
}
export { IOpportunityMatrixProps, IOpportunityMatrixState, };
