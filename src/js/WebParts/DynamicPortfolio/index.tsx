import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import pnp, { PermissionKind } from "sp-pnp-js";
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
import DynamicPortfolioFieldSelector from "./DynamicPortfolioFieldSelector";
import DynamicPortfolioFilterPanel, { IDynamicPortfolioFilter } from "./DynamicPortfolioFilterPanel";
import * as DynamicPortfolioConfiguration from "./DynamicPortfolioConfiguration";
import { queryProjects } from "./DynamicPortfolioSearch";
import DynamicPortfolioItemColumn from "./DynamicPortfolioItemColumn";
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
    public async componentDidMount() {
        try {
            const data = await this.fetchInitialData();
            await this.updateState({ ...data, isLoading: false });
            if (this.props.viewSelectorEnabled) {
                Util.setUrlHash({ viewId: this.state.currentView.id.toString() });
            }
        } catch (errorMessage) {
            this.setState({ errorMessage, isLoading: false });
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
                <Spinner label={this.props.loadingText} type={SpinnerType.large} />
            );
        }
        return (
            <div>
                {this.renderCommandBar()}
                {this.state.isChangingView
                    ? <div style={{ paddingTop: 20 }}>
                        <Spinner
                            label={String.format(RESOURCE_MANAGER.getResource("DynamicPortfolio_LoadingViewText"), this.state.isChangingView.name)}
                            type={SpinnerType.large} />
                    </div>
                    : <div>
                        {this.renderSearchBox()}
                        {this.renderStatusBar()}
                        {this.renderItems()}
                        {this.renderFilterPanel()}
                        {this.renderProjectInfoModal()}
                    </div>}
            </div>
        );
    }

    /**
     * Fetch initial data
     */
    private async fetchInitialData(): Promise<Partial<IDynamicPortfolioState>> {
        let hashState = Util.getUrlHash();

        const [configuration, canUserManageWeb] = await Promise.all([
            DynamicPortfolioConfiguration.getConfig(),
            pnp.sp.web.usingCaching().currentUserHasPermissions(PermissionKind.ManageWeb),
        ]);

        let currentView;

        if (this.props.defaultView) {
            currentView = this.props.defaultView;
        } else {
            /**
             * If we have a viewId present in the URL hash, we'll attempt to use that
             */
            if (hashState.viewId) {
                [currentView] = configuration.views.filter(qc => qc.id === parseInt(hashState.viewId, 10));
                if (!currentView) {
                    throw {
                        message: RESOURCE_MANAGER.getResource("DynamicPortfolio_ViewNotFound"),
                        type: MessageBarType.error,
                    };
                }
            } else {
                /**
                 * Otherwise we"ll use the default view from the configuration list
                 */
                [currentView] = configuration.views.filter(qc => qc.default);
                if (!currentView) {
                    throw {
                        message: RESOURCE_MANAGER.getResource("DynamicPortfolio_NoDefaultView"),
                        type: MessageBarType.error,
                    };
                }
            }
        }
        const fieldNames = configuration.columns.map(f => f.fieldName);
        const response = await queryProjects(currentView, configuration);

        // Populates DynamicPortfolioFieldSelector with items from this.configuration.columns
        DynamicPortfolioFieldSelector.items = configuration.columns.map(col => ({
            name: col.name,
            value: col.fieldName,
            defaultSelected: Array.contains(currentView.fields, col.name),
            readOnly: col.readOnly,
        }));

        // Sort the columns as they are added to the view
        let selectedColumns = currentView.fields.map(f => configuration.columns.filter(fc => fc.name === f)[0]);

        // Get selected filters
        let filters = this.getSelectedFiltersWithItems(response.refiners, configuration, currentView).concat([DynamicPortfolioFieldSelector]);

        // Sorts items from response.primarySearchResults
        let items = response.primarySearchResults.sort(this.props.defaultSortFunction);

        let updatedState: Partial<IDynamicPortfolioState> = {
            selectedColumns,
            fieldNames,
            items,
            filters,
            currentView,
            configuration,
            canUserManageWeb,
            filteredItems: items,
        };

        // Check if current view has group by set
        if (currentView.groupBy) {
            let [groupByColumn] = configuration.columns.filter(fc => fc.name === currentView.groupBy);
            if (groupByColumn) {
                updatedState.groupBy = groupByColumn;
            }
        }

        return updatedState;
    }

    /**
    * Render status bar
    */
    private renderStatusBar() {
        const data = this.getFilteredData();
        if (data.items.length === 0) {
            return null;
        }
        return <MessageBar>{String.format(this.props.showCountText, data.items.length, this.state.items.length)}</MessageBar>;
    }

    /**
     * Render items
     */
    private renderItems() {
        const data = this.getFilteredData();

        if (data.items.length === 0) {
            return (
                <MessageBar>{RESOURCE_MANAGER.getResource("DynamicPortfolio_NoResults")}</MessageBar>
            );
        }

        return (
            <DetailsList
                items={data.items}
                constrainMode={this.props.constrainMode}
                layoutMode={this.props.layoutMode}
                columns={data.columns}
                groups={data.groups}
                selectionMode={this.props.selectionMode}
                onRenderItemColumn={(item, index, column: any) => DynamicPortfolioItemColumn(item, index, column, this.state.configuration, evt => this._onOpenProjectModal(evt, item))}
                onColumnHeaderClick={(col, evt) => this._onColumnSort(col, evt)}
            />
        );
    }

    /**
     * Render Filter Panel
     */
    private renderFilterPanel() {
        return (
            <DynamicPortfolioFilterPanel
                isOpen={this.state.showFilterPanel}
                onDismiss={() => this.setState({ showFilterPanel: false })}
                filters={this.state.filters}
                showIcons={false}
                onFilterChange={this._onFilterChange} />
        );
    }

    /**
     * Renders the Project Info modal
     */
    private renderProjectInfoModal() {
        if (this.state.showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={this.state.showProjectInfo.Path}
                    hideChrome={true}
                    showActionLinks={false}
                    showMissingPropsWarning={false}
                    filterField={this.props.projectInfoFilterField}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: this.state.showProjectInfo,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: e => this.setState({ showProjectInfo: null }),
                        headerClassName: this.props.modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: this.state.showProjectInfo.Title,
                    }} />
            );
        }
        return null;
    }

    /**
     * Renders the command bar from office-ui-fabric-react
     */
    private renderCommandBar() {
        const items: IContextualMenuItem[] = [];
        const farItems: IContextualMenuItem[] = [];

        if (this.props.showGroupBy) {
            const groupByColumns = this.state.configuration.columns.filter(col => col.groupBy).map((col, idx) => ({
                key: idx.toString(),
                name: col.name,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: col });
                },
            }));
            items.push({
                key: "Group",
                name: this.state.groupBy ? this.state.groupBy.name : RESOURCE_MANAGER.getResource("String_NoGrouping"),
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

        if (this.props.excelExportEnabled && this.props.excelExportConfig) {
            items.push({
                key: "ExcelExport",
                name: this.props.excelExportConfig.buttonLabel,
                iconProps: { iconName: this.props.excelExportConfig.buttonIcon },
                disabled: this.state.excelExportStatus === ExcelExportStatus.Exporting,
                onClick: e => {
                    e.preventDefault();
                    this.exportToExcel();
                },
            });
        }

        if (this.props.viewSelectorEnabled) {
            if (this.state.canUserManageWeb) {
                farItems.push({
                    key: "NewView",
                    name: RESOURCE_MANAGER.getResource("DynamicPortfolio_CreateNewView"),
                    iconProps: { iconName: "CirclePlus" },
                    itemType: ContextualMenuItemType.Normal,
                    onClick: e => {
                        e.preventDefault();
                        SP.UI.ModalDialog.showModalDialog({
                            url: `${_spPageContextInfo.siteAbsoluteUrl}/Lists/DynamicPortfolioViews/NewForm.aspx`,
                            title: RESOURCE_MANAGER.getResource("DynamicPortfolio_CreateNewView"),
                        });
                    },
                });
            }
            farItems.push({
                key: "View",
                name: this.state.currentView.name,
                iconProps: { iconName: "List" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                items: this.state.configuration.views.map((qc, idx) => ({
                    key: idx.toString(),
                    name: qc.name,
                    iconProps: { iconName: qc.iconName },
                    onClick: e => {
                        e.preventDefault();
                        this.changeView(qc);
                    },
                })),
            });
        }

        farItems.push({
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
        const data = this.getFilteredData();
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
        this.setState({ excelExportStatus: ExcelExportStatus.Idle });
    }

    /**
     * Renders search box
     */
    private renderSearchBox() {
        return (
            <div style={{ marginTop: 10 }}>
                <SearchBox
                    onChange={newValue => {
                        let searchTerm = newValue.toLowerCase();
                        this.setState({ searchTerm });
                    }}
                    labelText={this.props.searchBoxLabelText} />
            </div>
        );
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     */
    private getFilteredData() {
        let groups: IGroup[] = null;
        if (this.state.groupBy) {
            const itemsSort: any = {
                props: [this.state.groupBy.fieldName],
                opts: {},
            };
            if (this.state.currentSort) {
                itemsSort.props.push(this.state.currentSort.fieldName);
                itemsSort.opts.reverse = !this.state.currentSort.isSortedDescending;
            }
            const groupItems = array_sort(this.state.filteredItems, itemsSort.props, itemsSort.opts);
            const groupNames = groupItems.map(g => g[this.state.groupBy.fieldName] ? g[this.state.groupBy.fieldName] : RESOURCE_MANAGER.getResource("String_NotSet"));
            groups = array_unique([].concat(groupNames)).sort((a, b) => a > b ? 1 : -1).map((name, idx) => ({
                key: idx,
                name: `${this.state.groupBy.name}: ${name}`,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));
        }
        let items = this.state.filteredItems ? this.state.filteredItems.filter(item => item[this.props.searchProperty].toString().toLowerCase().indexOf(this.state.searchTerm) !== -1) : [];
        return {
            items: items,
            columns: this.state.selectedColumns,
            groups: groups,
        };
    }

    /**
     * Get selected filters with items. Based on refiner configuration retrieved from the config list,
     * the filters are checked against refiners retrieved by search.
     *
     * @param {any[]} refiners Refiners retrieved by search
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig} viewConfig View configuration
     */
    private getSelectedFiltersWithItems(refiners: any[], configuration: DynamicPortfolioConfiguration.IDynamicPortfolioConfiguration, viewConfig: DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig): any {
        return configuration.refiners
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
     * @param {IDynamicPortfolioFilter} filter The filter that was changed
     */
    private _onFilterChange = (filter: IDynamicPortfolioFilter): void => {
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
                    selectedColumns: this.state.configuration.columns.filter(field => Array.contains(filter.selected, field.fieldName)),
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
    private _onColumnSort = (evt, column): void => {
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

    private _onOpenProjectModal = (evt, item) => {
        evt.preventDefault();
        this.setState({ showProjectInfo: item });
    }

    /**
     * Changes view, doing a new search
     *
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig} viewConfig View configuration
     */
    private async changeView(viewConfig: DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig): Promise<void> {
        if (this.state.currentView.id === viewConfig.id) {
            return;
        }

        await this.updateState({ isChangingView: viewConfig });
        const response = await queryProjects(viewConfig, this.state.configuration);
        DynamicPortfolioFieldSelector.items = this.state.configuration.columns.map(col => ({
            name: col.name,
            value: col.fieldName,
            defaultSelected: Array.contains(viewConfig.fields, col.name),
            readOnly: col.readOnly,
        }));
        let filters = this.getSelectedFiltersWithItems(response.refiners, this.state.configuration, viewConfig).concat([DynamicPortfolioFieldSelector]);

        let updatedState: Partial<IDynamicPortfolioState> = {
            isChangingView: null,
            items: response.primarySearchResults,
            filteredItems: response.primarySearchResults,
            filters: filters,
            currentView: viewConfig,
            selectedColumns: this.state.configuration.columns.filter(fc => Array.contains(viewConfig.fields, fc.name)),
            groupBy: null,
        };

        // Check if the new view has group by set
        if (viewConfig.groupBy) {
            let [groupByColumn] = this.state.configuration.columns.filter(fc => fc.name === viewConfig.groupBy);
            if (groupByColumn) {
                updatedState.groupBy = groupByColumn;
            }
        }

        await this.updateState(updatedState);
        if (this.props.viewSelectorEnabled) {
            Util.setUrlHash({ viewId: this.state.currentView.id.toString() });
        }
    }
}

export {
    IDynamicPortfolioProps,
    IDynamicPortfolioState,
};
