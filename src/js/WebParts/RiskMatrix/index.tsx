import __ from "../../Resources";
import * as React from "react";
import { sp, Site } from "@pnp/sp";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import RiskMatrixCells from "./RiskMatrixCells";
import MatrixCellType from "../../Model/MatrixCellType";
import IMatrixCell from "../../Model/IMatrixCell";
import MatrixRow from "./MatrixRow";
import MatrixHeaderCell from "./MatrixHeaderCell";
import MatrixCell from "./MatrixCell";
import RiskElement from "./RiskElement";
import RiskElementModel from "./RiskElementModel";
import IRiskMatrixData from "./IRiskMatrixData";
import IRiskMatrixProps, { RiskMatrixDefaultProps } from "./IRiskMatrixProps";
import IRiskMatrixState from "./IRiskMatrixState";
import List from "../@Components/List";
import { loadJsonConfiguration } from "../../Util";

/**
 * Risk Matrix
 */
export default class RiskMatrix extends React.Component<IRiskMatrixProps, IRiskMatrixState> {
    public static displayName = "RiskMatrix";
    public static defaultProps = RiskMatrixDefaultProps;
    private tableElementRef: HTMLTableElement;
    private uncertaintiesList;
    private dataSourcesList;

    /**
     * Constructor
     *
     * @param {IRiskMatrixProps} props Props
     */
    constructor(props: IRiskMatrixProps) {
        super(props);
        this.state = this.getInitState(props);
        this.uncertaintiesList = sp.web.lists.getByTitle(__.getResource("Lists_Uncertainties_Title"));
        this.dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
    }

    public async componentDidMount() {
        let matrixCells = await loadJsonConfiguration<Array<IMatrixCell[]>>("risk-matrix-cells");
        if (matrixCells == null || !matrixCells.length) {
            matrixCells = RiskMatrixCells;
        }
        if (this.state.data) {
            this.setState({ matrixCells });
        } else {
            const { data, selectedViewId } = await this.fetchData();
            this.setState({
                isLoading: false,
                data,
                hideLabels: this.tableElementRef.offsetWidth < this.props.hideLabelsBreakpoint,
                selectedViewId,
                matrixCells,
            });
        }
    }

    /**
     * Renders the <RiskMatrix /> component
     */
    public render(): React.ReactElement<IRiskMatrixProps> {
        const {
            id,
            className,
            loadingText,
            showViewSelector,
            dataSource,
            columns,
        } = this.props;

        const {
            isLoading,
            matrixCells,
            selectedViewId,
            hideLabels,
        } = this.state;

        let tableProps: React.HTMLAttributes<HTMLElement> = { id };

        if (isLoading) {
            return (
                <div className={className}>
                    <Spinner
                        label={loadingText}
                        size={SpinnerSize.large} />
                    <table {...tableProps} ref={ele => this.tableElementRef = ele}></table>
                </div>
            );
        }

        if (hideLabels) {
            tableProps.className = "hide-labels";
        }

        if (matrixCells) {
            const viewOptions = this.getViewOptions();
            const items = this.getItems();

            return (
                <div className={className}>
                    <div hidden={!showViewSelector || viewOptions.length < 2}>
                        <Dropdown
                            label={__.getResource("RiskMatrix_ViewSelectorLabel")}
                            defaultSelectedKey={selectedViewId}
                            options={viewOptions}
                            onChanged={this.onViewChanged} />
                    </div>
                    {items.length === 0
                        ? (
                            <div style={{ marginTop: 20 }}>
                                <MessageBar>{__.getResource("RiskMatrix_EmptyMessage")}</MessageBar>
                            </div>
                        )
                        : (
                            <div>
                                <div>
                                    <table {...tableProps} ref={ele => this.tableElementRef = ele}>
                                        <tbody>
                                            {this.renderRows(items)}
                                        </tbody>
                                    </table>
                                    <Toggle
                                        onChanged={postAction => this.setState({ postAction })}
                                        label={__.getResource("ProjectStatus_RiskShowPostActionLabel")}
                                        onText={__.getResource("String_Yes")}
                                        offText={__.getResource("String_No")} />
                                </div>
                                <div hidden={!dataSource}>
                                    <Dropdown
                                        label={__.getResource("String_Select_Project_Name")}
                                        defaultSelectedKey="AllProjects"
                                        options={this.getProjectOptions()}
                                        onChanged={opt => this.setState({ selectedProject: opt })} />
                                    <List
                                        items={items}
                                        columns={columns}
                                        webUrlKey="webUrl"
                                        pathKey="url"
                                        showCommandBar={false} />
                                </div>
                            </div>
                        )}
                </div>
            );
        }
        return null;
    }

    /**
     * Get items
     */
    protected getItems() {
        const { selectedProject, data } = this.state;
        if (selectedProject && selectedProject.key !== "AllProjects") {
            return data.items.filter(i => i.siteTitle === selectedProject.text);
        }
        return data.items;
    }

    /**
     * Render rows
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     */
    protected renderRows(riskItems: Array<RiskElementModel>) {
        const { matrixCells } = this.state;
        const riskMatrixRows = matrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = matrixCells[i][j];
                const riskElements = this.getRiskElementsForCell(riskItems, cell);
                const riskElementsPostAction = this.getRiskElementsPostActionForCell(riskItems, cell);
                switch (cell.cellType) {
                    case MatrixCellType.Cell: {
                        return (
                            <MatrixCell
                                key={`MatrixCell_${j}`}
                                style={cell.style}
                                className={cell.className}>
                                {riskElements}
                                {riskElementsPostAction}
                            </MatrixCell>
                        );
                    }
                    case MatrixCellType.Header: {
                        return (
                            <MatrixHeaderCell
                                key={`MatrixHeaderCell_${j}`}
                                label={c.cellValue}
                                className={cell.className} />
                        );
                    }
                }
            });
            return (
                <MatrixRow key={i}>
                    {cells}
                </MatrixRow>
            );
        });
        return riskMatrixRows;
    }

    /**
     * Get initial state
     *
     * @param {IRiskMatrixProps} props Props
     */
    protected getInitState(props: IRiskMatrixProps) {
        if (props.data) {
            return {
                isLoading: false,
                data: { items: this.mapSpItems(props.data.items) },
            };
        } else {
            return { isLoading: true };
        }
    }

    /**
     * Get risk elements for cell post action
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    protected getRiskElementsPostActionForCell(riskItems: Array<RiskElementModel>, cell: IMatrixCell) {
        if (!this.state.postAction) {
            return [];
        }
        const itemsForCell = riskItems.filter(risk => cell.probability === risk.probabilityPostAction && cell.consequence === risk.consequencePostAction);
        const riskElementsStyle: React.CSSProperties = {};
        if (this.state.postAction && this.props.postActionShowOriginal) {
            riskElementsStyle.opacity = 0.5;
        }
        const riskElements = itemsForCell.map(risk => {
            return (
                <RiskElement
                    key={`${risk.getKey("PostAction")}`}
                    model={risk}
                    style={riskElementsStyle} />
            );
        });
        return riskElements;
    }

    /**
     * Get risk elements
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    protected getRiskElementsForCell(riskItems: Array<RiskElementModel>, cell: IMatrixCell) {
        if (this.state.postAction && !this.props.postActionShowOriginal) {
            return [];
        }
        const itemsForCell = riskItems.filter(risk => cell.probability === risk.probability && cell.consequence === risk.consequence);
        const riskElements = itemsForCell.map(risk => {
            return <RiskElement key={risk.getKey()} model={risk} />;
        });
        return riskElements;
    }

    /**
     * Get project options
     */
    protected getProjectOptions(): Array<IDropdownOption> {
        const projectOptions = this.state.data.items
            .map(i => i.siteTitle)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(p => ({ key: p, text: p }));
        return [
            { key: "AllProjects", text: __.getResource("String_AllProjects") },
            ...projectOptions,
        ];
    }

    /**
     * Transform SP list views to IDropdownOption[]
     */
    protected getViewOptions(): IDropdownOption[] {
        const { views } = this.state.data;
        if (views) {
            const viewOptions = views
                .filter(view => view.Title)
                .map(view => ({
                    key: view.Id,
                    text: view.Title,
                    data: { viewQuery: view.ViewQuery },
                }));
            return viewOptions;
        } else {
            return [];
        }
    }

    /**
     * On view changed
     *
     * @param {IDropdownOption} opt Dropdown option
     */
    @autobind
    protected async onViewChanged(opt: IDropdownOption) {
        let { data } = this.state;
        const camlQuery = this.makeCamlQuery(opt.data.viewQuery);
        const spListItems = await this.uncertaintiesList.getItemsByCAMLQuery(camlQuery);
        data.items = this.mapSpItems(spListItems);
        this.setState({ data });
    }

    /**
     * Create CamlQuery
     *
     * @param {string} viewQuery View query
     */
    protected makeCamlQuery(viewQuery: string) {
        return { ViewXml: `<View><Query>${viewQuery}</Query></View>` };
    }

    /**
     * Map items to RiskElementModel
     *
     * @param {Array<any>} spListItems SP list items
     */
    protected mapSpItems(spListItems: Array<any>): Array<RiskElementModel> {
        const riskItems: Array<RiskElementModel> = spListItems
            .filter(item => item.ContentTypeId.indexOf(this.props.contentTypeId) !== -1)
            .map(item => {
                return new RiskElementModel(item.ID, item.Title, item.GtRiskProbability, item.GtRiskConsequence, item.GtRiskProbabilityPostAction, item.GtRiskConsequencePostAction);
            });
        return riskItems;
    }

    /**
     * Fetch data
     */
    protected async fetchData(): Promise<{ data: IRiskMatrixData, selectedViewId?: string }> {
        const { dataSource, viewName } = this.props;

        let data = { ...this.state.data };

        if (!data) {
            data = { items: [], views: null };
        }

        let selectedView;

        if (this.props.dataSource) {
            const spSearchItems = await this.searchItems(dataSource);
            data.items = spSearchItems.map(item => {
                const risk = new RiskElementModel(item.ListItemID, item.Title, item.GtRiskProbabilityOWSNMBR, item.GtRiskConsequenceOWSNMBR, item.GtRiskProbabilityPostActionOWSNMBR, item.GtRiskConsequencePostActionOWSNMBR);
                risk.url = item.Path;
                risk.webId = item.WebId;
                risk.siteTitle = item.SiteTitle;
                risk.webUrl = item.SPWebUrl;
                risk.action = item.GtRiskActionOWSMTXT;
                return risk;
            });
        } else {
            if (!data.views) {
                data.views = await this.uncertaintiesList.views.select("Id", "Title", "DefaultView", "ViewQuery").get();
            }
            if (viewName) {
                [selectedView] = data.views.filter(view => view.Title === viewName);
            } else {
                [selectedView] = data.views.filter(view => view.DefaultView);
            }
            const camlQuery = this.makeCamlQuery(selectedView.ViewQuery);
            const spListItems = await this.uncertaintiesList.getItemsByCAMLQuery(camlQuery);
            data.items = this.mapSpItems(spListItems);
        }

        return { data, selectedViewId: selectedView ? selectedView.Id : null };
    }

    /**
    * Fetch data from data source
    *
    * @param {string} name Data source name
    */
    protected async searchItems(name: string): Promise<Array<any>> {
        const [dataSource] = await this.dataSourcesList.items.filter(`Title eq '${name}'`).get();
        if (dataSource) {
            const searchResults = await sp.search({
                Querytext: "*",
                RowLimit: this.props.rowLimit,
                TrimDuplicates: false,
                SelectProperties: [
                    "ListItemID",
                    "Path",
                    "SPWebUrl",
                    "WebId",
                    "Title",
                    "GtRiskProbabilityOWSNMBR",
                    "GtRiskConsequenceOWSNMBR",
                    "GtRiskProbabilityPostActionOWSNMBR",
                    "GtRiskConsequencePostActionOWSNMBR",
                    "GtRiskActionOWSMTXT",
                    "SiteTitle",
                ],
                QueryTemplate: dataSource.GtDpSearchQuery,
            });
            return searchResults.PrimarySearchResults;
        } else {
            return [];
        }
    }
}

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
