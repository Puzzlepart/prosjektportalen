import * as React from "react";
import RESOURCE_MANAGER from "localization";
import * as array_unique from "array-unique";
import * as array_sort from "array-sort";
import {
    IGroup,
    DetailsList,
} from "office-ui-fabric-react/lib/DetailsList";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import {
    ContextualMenuItemType,
    IContextualMenuItem,
} from "office-ui-fabric-react/lib/ContextualMenu";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import {
    MessageBar,
    MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import * as Util from "../../Util";
import ExportToExcel, { ExcelExportStatus } from "../../Util/ExportToExcel";
import FieldSelector from "./FieldSelector";
import FilterPanel from "./FilterPanel";
import IFilter from "./FilterPanel/Filter/IFilter";
import * as Configuration from "./Configuration";
import { queryProjects } from "./DynamicPortfolioSearch";
import _onRenderItemColumn from "./ItemColumn";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import IDynamicPortfolioProps, { DynamicPortfolioDefaultProps } from "./IDynamicPortfolioProps";
import IDynamicPortfolioState from "./IDynamicPortfolioState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Dynamic Portfolio
 */
export default class DynamicPortfolio extends BaseWebPart<IDynamicPortfolioProps, IDynamicPortfolioState> {
    public static displayName = "DynamicPortfolio";
    public static defaultProps = DynamicPortfolioDefaultProps;
    private configuration: Configuration.IConfiguration = null;

    /**
     * Constructor
     *
     * @param {IDynamicPortfolioProps} props Props
     */
    constructor(props: IDynamicPortfolioProps) {
        super(props, {
            isLoading: true,
            searchTerm: "",
            filters: [],
            currentFilters: {},
            showFilterPanel: false,
        });
    }

    /**
     * Component did mount
     */
    public async componentDidMount(): Promise<void> {
        try {
            const data = await this.fetchInitialData();
            await this.updateState({
                ...data,
                isLoading: false,
            });
            Util.setUrlHash({ viewId: this.state.currentView.id.toString() });
        } catch (errorMessage) {
            this.setState({
                errorMessage,
                isLoading: false,
            });
        }
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.state.errorMessage) {
            return (
                <div>
                    <MessageBar messageBarType={this.state.errorMessage.type}>{this.state.errorMessage.message}</MessageBar>
                </div>
            );
        }
        if (this.state.isLoading) {
            return (
                <Spinner label={RESOURCE_MANAGER.getResource("DynamicPortfolio_LoadingText")} type={SpinnerType.large} />
            );
        }
        return (
            <div>
                {this.renderCommandBar(this.props, this.state)}
                {this.renderSearchBox(this.props, this.state)}
                {this.renderItems(this.props, this.state)}
                {this.renderFilterPanel(this.props, this.state)}
                {this.renderProjectInfoModal(this.props, this.state)}
            </div>
        );
    }

    /**
     * Fetch initial data
     */
    private async fetchInitialData(): Promise<Partial<IDynamicPortfolioState>> {
        let hashState = Util.getUrlHash();
        const config = await Configuration.getConfig();
        this.configuration = config;
        let currentView;

        /**
         * If we have a viewId present in the URL hash, we'll attempt use that
         */
        if (hashState.viewId) {
            [currentView] = this.configuration.views.filter(qc => qc.id === parseInt(hashState.viewId, 10));
            if (!currentView) {
                throw {
                    message: RESOURCE_MANAGER.getResource("DynamicPortfolio_ViewNotFound"),
                    type: MessageBarType.error,
                };
            }
        } else {
            /**
             * Otherwise we'll use the default view from the configuration list
             */
            [currentView] = this.configuration.views.filter(qc => qc.default);
            if (!currentView) {
                throw {
                    message: RESOURCE_MANAGER.getResource("DynamicPortfolio_NoDefaultView"),
                    type: MessageBarType.error,
                };
            }
        }
        const fieldNames = this.configuration.columns.map(f => f.fieldName);
        const response = await queryProjects(currentView, this.configuration);
        // Populates FieldSelector with items from this.configuration.columns
        FieldSelector.items = this.configuration.columns.map(col => ({
            name: col.name,
            value: col.fieldName,
            defaultSelected: Array.contains(currentView.fields, col.name),
            readOnly: col.readOnly,
        }));
        // Sort the columns as they are added to the view
        let selectedColumns = currentView.fields.map(f => this.configuration.columns.filter(fc => fc.name === f)[0]);

        // Get selected filters
        let filters = this.getSelectedFiltersWithItems(response.refiners, currentView).concat([FieldSelector]);

        // Sorts items from response.primarySearchResults
        let items = response.primarySearchResults.sort(this.props.defaultSortFunction);

        return ({
            selectedColumns,
            fieldNames,
            items,
            filters,
            currentView,
            filteredItems: items,
        });
    }

    /**
     * Render items
     *
     * @param {IDynamicPortfolioProps} param0 Props
     * @param {IDynamicPortfolioState} param1 State
     */
    private renderItems({ constrainMode, layoutMode, selectionMode }: IDynamicPortfolioProps, { }: IDynamicPortfolioState) {
        const data = this.getFilteredData(this.props, this.state);

        if (data.items.length === 0) {
            return (
                <MessageBar>{RESOURCE_MANAGER.getResource("DynamicPortfolio_NoResults")}</MessageBar>
            );
        }

        return (
            <DetailsList
                items={data.items}
                constrainMode={constrainMode}
                layoutMode={layoutMode}
                columns={data.columns}
                groups={data.groups}
                selectionMode={selectionMode}
                onRenderItemColumn={(item, index, column: any) => _onRenderItemColumn(item, index, column, (evt) => {
                    evt.preventDefault();
                    this.setState({ showProjectInfo: item });
                })}
                onColumnHeaderClick={(col, evt) => this._onColumnSort(col, evt)}
            />
        );
    }

    /**
     * Render Filter Panel
     *
     * @param {IDynamicPortfolioProps} param0 Props
     * @param {IDynamicPortfolioState} param1 State
     */
    private renderFilterPanel({ }: IDynamicPortfolioProps, { filters, showFilterPanel }: IDynamicPortfolioState) {

        return (
            <FilterPanel
                isOpen={showFilterPanel}
                onDismiss={() => this.setState({ showFilterPanel: false })}
                filters={filters}
                showIcons={false}
                onFilterChange={this._onFilterChange} />
        );
    }

    /**
     * Renders the command bar from office-ui-fabric-react
     *
     * @param {IDynamicPortfolioProps} param0 Props
     * @param {IDynamicPortfolioState} param1 State
     */
    private renderCommandBar({ showGroupBy, excelExportEnabled, excelExportConfig }: IDynamicPortfolioProps, { currentView, selectedColumns, groupBy }: IDynamicPortfolioState) {
        if (!currentView) {
            return null;
        }
        const items: IContextualMenuItem[] = [];
        const farItems: IContextualMenuItem[] = [];

        if (showGroupBy) {
            const groupByColumns = this.configuration.columns.filter(col => col.groupBy).map((col, idx) => ({
                key: idx.toString(),
                name: col.name,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: col });
                },
            }));
            items.push({
                key: "Group",
                name: groupBy ? groupBy.name : RESOURCE_MANAGER.getResource("String_NoGrouping"),
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                items: [
                    {
                        key: "NoGrouping",
                        name: RESOURCE_MANAGER.getResource("String_NoGrouping"),
                        onClick: e => {
                            e.preventDefault();
                            this.setState({ groupBy: null });
                        },
                    },
                    ...groupByColumns,
                ],
            });
        }

        if (excelExportEnabled && excelExportConfig) {
            items.push({
                key: "ExcelExport",
                name: excelExportConfig.buttonLabel,
                iconProps: { iconName: excelExportConfig.buttonIcon },
                disabled: this.state.excelExportStatus === ExcelExportStatus.Exporting,
                onClick: e => {
                    e.preventDefault();
                    this.exportToExcel();
                },
            });
        }

        farItems.push(
            {
                key: "View",
                name: currentView.name,
                iconProps: { iconName: "List" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                items: this.configuration.views.map((qc, idx) => ({
                    key: idx.toString(),
                    name: qc.name,
                    iconProps: { iconName: qc.iconName },
                    onClick: e => {
                        e.preventDefault();
                        this.executeSearch(qc);
                    },
                })),
            },
            {
                key: "Filters",
                name: "",
                iconProps: { iconName: "Filter" },
                itemType: ContextualMenuItemType.Normal,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ showFilterPanel: true });
                },
            });

        return (
            <CommandBar
                items={items}
                farItems={farItems}
            />
        );
    }

    /**
     * Export current view to Excel (xlsx)
     */
    private async exportToExcel() {
        this.setState({ excelExportStatus: ExcelExportStatus.Exporting });
        const data = this.getFilteredData(this.props, this.state);
        const sheet = {
            name: this.props.excelExportConfig.sheetName,
            data: [
                data.columns.map(col => col.name),
                ...data.items.map(item => data.columns.map(col => item[col.fieldName])),
            ],
        };
        const fileName = String.format(this.props.excelExportConfig.fileName, this.state.currentView.name, Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
        await ExportToExcel({
            sheets: [sheet],
            fileName,
        });
        console.log(sheet.data);
        this.setState({ excelExportStatus: ExcelExportStatus.Idle });
    }

    /**
     * Renders search box
     *
     * @param {IDynamicPortfolioProps} param0 Props
     * @param {IDynamicPortfolioState} param1 State
     */
    private renderSearchBox({ }: IDynamicPortfolioProps, { }: IDynamicPortfolioState) {
        return (
            <div style={{ marginTop: 10 }}>
                <SearchBox
                    onChange={newValue => {
                        let searchTerm = newValue.toLowerCase();
                        this.setState({ searchTerm });
                    }}
                    labelText={RESOURCE_MANAGER.getResource("DynamicPortfolio_SearchBox_Placeholder")} />
            </div>
        );
    }

    /**
     * Renders the Project Info modal
     *
     * @param {IDynamicPortfolioProps} param0 Props
     * @param {IDynamicPortfolioState} param1 State
     */
    private renderProjectInfoModal({ modalHeaderClassName, projectInfoFilterField }: IDynamicPortfolioProps, { showProjectInfo }: IDynamicPortfolioState) {
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.Path}
                    hideChrome={true}
                    showActionLinks={false}
                    showMissingPropsWarning={false}
                    filterField={projectInfoFilterField}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: this.state.showProjectInfo,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: e => this.setState({ showProjectInfo: null }),
                        headerClassName: modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.Title,
                    }} />
            );
        }
        return null;
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param {IDynamicPortfolioProps} param0 Props
     * @param {IDynamicPortfolioState} param1 State
     */
    private getFilteredData({ searchProperty }: IDynamicPortfolioProps, { selectedColumns, filteredItems, groupBy, searchTerm, currentSort }: IDynamicPortfolioState) {
        let groups: IGroup[] = null;
        if (groupBy) {
            const itemsSort: any = {
                props: [groupBy.fieldName],
                opts: {},
            };
            if (currentSort) {
                itemsSort.props.push(currentSort.fieldName);
                itemsSort.opts.reverse = !currentSort.isSortedDescending;
            }
            const groupItems = array_sort(filteredItems, itemsSort.props, itemsSort.opts);
            const groupNames = groupItems.map(g => g[groupBy.fieldName] ? g[groupBy.fieldName] : RESOURCE_MANAGER.getResource("String_NotSet"));
            groups = array_unique([].concat(groupNames)).sort((a, b) => a > b ? 1 : -1).map((name, idx) => ({
                key: idx,
                name: `${groupBy.name}: ${name}`,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));
        }
        let items = filteredItems ? filteredItems.filter(item => item[searchProperty].toString().toLowerCase().indexOf(searchTerm) !== -1) : [];
        return {
            items: items,
            columns: selectedColumns,
            groups: groups,
        };
    }

    /**
     * Get selected filters with items. Based on refiner configuration retrieved from the config list,
     * the filters are checked against refiners retrieved by search.
     *
     * @param {any[]} refiners Refiners retrieved by search
     * @param {Configuration.IViewConfig} viewConfig View configuration
     */
    private getSelectedFiltersWithItems(refiners: any[], viewConfig: Configuration.IViewConfig): any {
        return this.configuration.refiners
            .filter(ref => (refiners.filter(r => r.Name === ref.key).length > 0) && (Array.contains(viewConfig.refiners, ref.name)))
            .map(ref => {
                let entries = refiners.filter(r => r.Name === ref.key)[0].Entries;
                return {
                    ...ref,
                    items: entries.results.map(entry => ({
                        name: entry.RefinementName,
                        value: entry.RefinementValue,
                    })),
                };
            });
    }

    /**
     * Acts on filter change.
     *
     * @param {IFilter} filter The filter that was changed
     */
    private _onFilterChange = (filter: IFilter): void => {
        const {
            items,
            currentFilters,
            filters,
        } = this.state;

        let updatedFilterState: Partial<IDynamicPortfolioState> = {};

        switch (filter.key) {
            case "Fields": {
                updatedFilterState = {
                    fieldNames: filter.selected,
                    selectedColumns: this.configuration.columns.filter(field => Array.contains(filter.selected, field.fieldName)),
                    filters: filters.map(f => (f.key === filter.key) ? filter : f),
                };
            }
                break;
            default: {
                if (filter.selected.length > 0) {
                    currentFilters[filter.key] = filter.selected;
                } else {
                    if (currentFilters.hasOwnProperty(filter.key)) {
                        delete currentFilters[filter.key];
                    }
                }
                let filterKeys = Object.keys(currentFilters),
                    tempItems = [];
                if (filterKeys.length > 0) {
                    items.forEach(item => {
                        let shouldInclude = true;
                        filterKeys.forEach(filterKey => {
                            let values = item[filterKey].split(";");
                            if (values.length > 1) {
                                let matches = values.filter(value => Array.contains(currentFilters[filterKey], value));
                                if (matches.length === 0) {
                                    shouldInclude = false;
                                }
                            } else {
                                if (!Array.contains(currentFilters[filterKey], values[0])) {
                                    shouldInclude = false;
                                }
                            }
                        });
                        if (shouldInclude) {
                            tempItems.push(item);
                        }
                    });
                } else {
                    tempItems = items;
                }
                updatedFilterState = {
                    currentFilters: currentFilters,
                    filteredItems: tempItems,
                    filters: filters.map(f => (f.key === filter.key) ? filter : f),
                };
            }
        }

        this.setState(updatedFilterState);
    }

    /**
     * On column sort
     *
     * @param {any} event Event
     * @param {any} column The column config
     */
    private _onColumnSort = (event, column): void => {
        const {
            filteredItems,
            selectedColumns,
         } = this.state;

        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        const items = array_sort(filteredItems, [column.fieldName], { reverse: !isSortedDescending });
        this.setState({
            currentSort: { fieldName: column.fieldName, isSortedDescending: isSortedDescending },
            filteredItems: items,
            selectedColumns: selectedColumns.map(col => {
                col.isSorted = (col.key === column.key);
                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }
                return col;
            }),
        });
    }

    /**
     * Does a new search using queryProjects, then updates component's state
     *
     * @param {Configuration.IViewConfig} viewConfig View configuration
     */
    private async executeSearch(viewConfig: Configuration.IViewConfig): Promise<void> {
        const { currentView } = this.state;

        if (currentView.id === viewConfig.id) {
            return;
        }

        await this.updateState({ isLoading: true });
        const response = await queryProjects(viewConfig, this.configuration);
        FieldSelector.items = this.configuration.columns.map(col => ({
            name: col.name,
            value: col.fieldName,
            defaultSelected: Array.contains(viewConfig.fields, col.name),
            readOnly: col.readOnly,
        }));
        let filters = this.getSelectedFiltersWithItems(response.refiners, viewConfig).concat([FieldSelector]);
        await this.updateState({
            isLoading: false,
            items: response.primarySearchResults,
            filteredItems: response.primarySearchResults,
            filters: filters,
            currentView: viewConfig,
            selectedColumns: this.configuration.columns.filter(fc => Array.contains(viewConfig.fields, fc.name)),
        });
        Util.setUrlHash({ viewId: this.state.currentView.id.toString() });
    }
}

export {
    IDynamicPortfolioProps,
    IDynamicPortfolioState,
};
