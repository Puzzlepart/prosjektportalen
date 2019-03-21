import * as React from "react";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import IMatrixCell from "../../Model/IMatrixCell";
import RiskElementModel from "./RiskElementModel";
import IRiskMatrixData from "./IRiskMatrixData";
import IRiskMatrixProps from "./IRiskMatrixProps";
import IRiskMatrixState from "./IRiskMatrixState";
/**
 * Risk Matrix
 */
export default class RiskMatrix extends React.Component<IRiskMatrixProps, IRiskMatrixState> {
    static displayName: string;
    static defaultProps: Partial<IRiskMatrixProps>;
    private tableElementRef;
    private uncertaintiesList;
    private dataSourcesList;
    /**
     * Constructor
     *
     * @param {IRiskMatrixProps} props Props
     */
    constructor(props: IRiskMatrixProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the <RiskMatrix /> component
     */
    render(): React.ReactElement<IRiskMatrixProps>;
    /**
     * Get items
     */
    protected getItems(): RiskElementModel[];
    /**
     * Render rows
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     */
    protected renderRows(riskItems: Array<RiskElementModel>): JSX.Element[];
    /**
     * Get initial state
     *
     * @param {IRiskMatrixProps} props Props
     */
    protected getInitState(props: IRiskMatrixProps): {
        isLoading: boolean;
        data: {
            items: RiskElementModel[];
        };
    } | {
        isLoading: boolean;
        data?: undefined;
    };
    /**
     * Get risk elements for cell post action
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    protected getRiskElementsPostActionForCell(riskItems: Array<RiskElementModel>, cell: IMatrixCell): JSX.Element[];
    /**
     * Get risk elements
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    protected getRiskElementsForCell(riskItems: Array<RiskElementModel>, cell: IMatrixCell): JSX.Element[];
    /**
     * Get project options
     */
    protected getProjectOptions(): Array<IDropdownOption>;
    /**
     * Transform SP list views to IDropdownOption[]
     */
    protected getViewOptions(): IDropdownOption[];
    /**
     * On view changed
     *
     * @param {IDropdownOption} opt Dropdown option
     */
    protected onViewChanged(opt: IDropdownOption): Promise<void>;
    /**
     * Create CamlQuery
     *
     * @param {string} viewQuery View query
     */
    protected makeCamlQuery(viewQuery: string): {
        ViewXml: string;
    };
    /**
     * Map items to RiskElementModel
     *
     * @param {Array<any>} spListItems SP list items
     */
    protected mapSpItems(spListItems: Array<any>): Array<RiskElementModel>;
    /**
     * Fetch data
     */
    protected fetchData(): Promise<{
        data: IRiskMatrixData;
        selectedViewId?: string;
    }>;
    /**
    * Fetch data from data source
    *
    * @param {string} name Data source name
    */
    protected searchItems(name: string): Promise<Array<any>>;
}
export { IRiskMatrixProps, IRiskMatrixState, };
