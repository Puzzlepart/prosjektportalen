"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../Resources");
const array_unique = require("array-unique");
const array_sort = require("array-sort");
const ScrollablePane_1 = require("office-ui-fabric-react/lib/ScrollablePane");
const Sticky_1 = require("office-ui-fabric-react/lib/Sticky");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
const SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Util = require("../../Util");
const ExportToExcel_1 = require("../../Util/ExportToExcel");
const DynamicPortfolioFieldSelector_1 = require("./DynamicPortfolioFieldSelector");
const DynamicPortfolioFilterPanel_1 = require("./DynamicPortfolioFilterPanel");
const DynamicPortfolioConfiguration = require("./DynamicPortfolioConfiguration");
const DynamicPortfolioSearch_1 = require("./DynamicPortfolioSearch");
const DynamicPortfolioItemColumn_1 = require("./DynamicPortfolioItemColumn");
const ProjectInfo_1 = require("../ProjectInfo");
const IDynamicPortfolioProps_1 = require("./IDynamicPortfolioProps");
const _BaseWebPart_1 = require("../@BaseWebPart");
const jsom_ctx_1 = require("jsom-ctx");
/**
 * Dynamic Portfolio
 */
class DynamicPortfolio extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IDynamicPortfolioProps} props Props
     */
    constructor(props) {
        super(props, {
            isLoading: true,
            searchTerm: "",
            filters: [],
            currentFilters: {},
            showFilterPanel: false,
        });
        /**
         * Acts on filter change.
         *
         * @param {IDynamicPortfolioFilter} filter The filter that was changed
         */
        this._onFilterChange = (filter) => {
            const { items, currentFilters, filters, } = this.state;
            let updatedFilterState = {};
            switch (filter.key) {
                case "Fields":
                    {
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
                    }
                    else {
                        if (currentFilters.hasOwnProperty(filter.key)) {
                            delete currentFilters[filter.key];
                        }
                    }
                    let filterKeys = Object.keys(currentFilters), tempItems = [];
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
                                }
                                else {
                                    if (!Array.contains(currentFilters[filterKey], values[0])) {
                                        shouldInclude = false;
                                    }
                                }
                            });
                            if (shouldInclude) {
                                tempItems.push(item);
                            }
                        });
                    }
                    else {
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
        };
        /**
         * On column sort
         *
         * @param {any} event Event
         * @param {any} column The column config
         */
        this._onColumnSort = (evt, column) => {
            const { filteredItems, selectedColumns, } = this.state;
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
        };
        /**
        * On open project Modal
        *
        * @param {any} event Event
        * @param {any} item The item
        */
        this._onOpenProjectModal = (evt, item) => {
            evt.preventDefault();
            this.setState({ showProjectInfo: item });
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.fetchInitialData();
                yield this.updateState(Object.assign({}, data, { isLoading: false }));
                if (this.props.viewSelectorEnabled) {
                    Util.setUrlHash({ viewId: this.state.currentView.id.toString() });
                }
            }
            catch (errorMessage) {
                this.setState({ errorMessage, isLoading: false });
            }
        });
    }
    /**
     * Renders the component
     */
    render() {
        const { isLoading, errorMessage, isChangingView } = this.state;
        if (errorMessage) {
            return (React.createElement("div", { style: { height: "80vh" } },
                React.createElement(MessageBar_1.MessageBar, { messageBarType: errorMessage.type }, errorMessage.message)));
        }
        if (isLoading) {
            return (React.createElement("div", { style: { height: "80vh" } },
                React.createElement(Spinner_1.Spinner, { label: this.props.loadingText, type: Spinner_1.SpinnerType.large })));
        }
        if (isChangingView) {
            const loadingText = String.format(Resources_1.default.getResource("DynamicPortfolio_LoadingViewText"), isChangingView.name);
            return (React.createElement("div", { style: { height: "80vh" } },
                this.renderCommandBar(),
                React.createElement("div", { style: { paddingTop: 20 } },
                    React.createElement(Spinner_1.Spinner, { label: loadingText, type: Spinner_1.SpinnerType.large }))));
        }
        return (React.createElement("div", { style: { height: "80vh" } },
            React.createElement(ScrollablePane_1.ScrollablePane, null,
                this.renderCommandBar(),
                React.createElement("div", null,
                    this.renderSearchBox(),
                    this.renderStatusBar(),
                    this.renderItems(),
                    this.renderFilterPanel(),
                    this.renderProjectInfoModal()))));
    }
    /**
    * Render status bar
    */
    renderStatusBar() {
        const data = this.getFilteredData();
        if (data.items.length === 0) {
            return null;
        }
        const { currentFilters } = this.state;
        const currentFiltersStr = [].concat.apply([], Object.keys(currentFilters).map(key => currentFilters[key])).join(", ");
        let statusText = String.format(this.props.showCountText, data.items.length, this.state.items.length);
        if (currentFiltersStr) {
            statusText = String.format(this.props.showCountTextWithFilters, data.items.length, this.state.items.length, currentFiltersStr);
        }
        return React.createElement(MessageBar_1.MessageBar, null, statusText);
    }
    /**
     * Render items
     */
    renderItems() {
        const data = this.getFilteredData();
        if (data.items.length === 0) {
            return React.createElement(MessageBar_1.MessageBar, null, Resources_1.default.getResource("DynamicPortfolio_NoResults"));
        }
        return (React.createElement(DetailsList_1.DetailsList, { items: data.items, constrainMode: this.props.constrainMode, layoutMode: this.props.layoutMode, columns: data.columns, groups: data.groups, selectionMode: this.props.selectionMode, onRenderItemColumn: (item, index, column) => DynamicPortfolioItemColumn_1.default(item, index, column, this.state.configuration, evt => this._onOpenProjectModal(evt, item)), onColumnHeaderClick: (col, evt) => this._onColumnSort(col, evt), onRenderDetailsHeader: (detailsHeaderProps, defaultRender) => React.createElement(Sticky_1.Sticky, { stickyPosition: Sticky_1.StickyPositionType.Header }, defaultRender(detailsHeaderProps)) }));
    }
    /**
     * Render Filter Panel
     */
    renderFilterPanel() {
        return (React.createElement(DynamicPortfolioFilterPanel_1.default, { isOpen: this.state.showFilterPanel, onDismiss: () => this.setState({ showFilterPanel: false }), filters: this.state.filters, showIcons: false, onFilterChange: this._onFilterChange }));
    }
    /**
     * Renders the Project Info modal
     */
    renderProjectInfoModal() {
        if (this.state.showProjectInfo) {
            return (React.createElement(ProjectInfo_1.default, { webUrl: this.state.showProjectInfo.Path, hideChrome: true, showActionLinks: false, showMissingPropsWarning: false, filterField: this.props.projectInfoFilterField, labelSize: "l", valueSize: "m", renderMode: ProjectInfo_1.ProjectInfoRenderMode.Modal, modalOptions: {
                    isOpen: this.state.showProjectInfo,
                    isDarkOverlay: true,
                    isBlocking: false,
                    onDismiss: e => this.setState({ showProjectInfo: null }),
                    headerClassName: this.props.modalHeaderClassName,
                    headerStyle: { marginBottom: 20 },
                    title: this.state.showProjectInfo.Title,
                } }));
        }
        return null;
    }
    /**
     * Renders the command bar from office-ui-fabric-react
     */
    renderCommandBar() {
        const items = [];
        const farItems = [];
        if (this.props.showGroupBy) {
            const groupByColumns = this.state.configuration.columns.filter(col => col.groupBy).map((col, idx) => ({
                key: `GroupByCol_${idx.toString()}`,
                name: col.name,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: col });
                },
            }));
            items.push({
                key: "Group",
                name: this.state.groupBy ? this.state.groupBy.name : Resources_1.default.getResource("String_NoGrouping"),
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenu_1.ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: [
                        {
                            key: "NoGrouping",
                            name: Resources_1.default.getResource("String_NoGrouping"),
                            onClick: e => {
                                e.preventDefault();
                                this.setState({ groupBy: null });
                            },
                        },
                        ...groupByColumns,
                    ],
                },
            });
        }
        if (this.props.excelExportEnabled && this.props.excelExportConfig) {
            items.push({
                key: "ExcelExport",
                name: this.props.excelExportConfig.buttonLabel,
                iconProps: {
                    iconName: this.props.excelExportConfig.buttonIcon,
                    styles: { root: { color: "green !important" } },
                },
                disabled: this.state.excelExportStatus === ExportToExcel_1.ExcelExportStatus.Exporting,
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
                    name: Resources_1.default.getResource("DynamicPortfolio_CreateNewView"),
                    iconProps: { iconName: "CirclePlus" },
                    itemType: ContextualMenu_1.ContextualMenuItemType.Normal,
                    onClick: e => {
                        e.preventDefault();
                        SP.UI.ModalDialog.showModalDialog({
                            url: `${_spPageContextInfo.siteAbsoluteUrl}/Lists/DynamicPortfolioViews/NewForm.aspx`,
                            title: Resources_1.default.getResource("DynamicPortfolio_CreateNewView"),
                        });
                    },
                });
            }
            farItems.push({
                key: "View",
                name: this.state.currentView.name,
                iconProps: { iconName: "List" },
                itemType: ContextualMenu_1.ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: this.state.configuration.views.map((qc, idx) => ({
                        key: `View_${idx.toString()}`,
                        name: qc.name,
                        iconProps: { iconName: qc.iconName },
                        onClick: e => {
                            e.preventDefault();
                            this._onChangeView(qc);
                        },
                    })),
                },
            });
        }
        farItems.push({
            key: "Filters",
            name: "",
            iconProps: { iconName: "Filter" },
            itemType: ContextualMenu_1.ContextualMenuItemType.Normal,
            onClick: e => {
                e.preventDefault();
                this.setState({ showFilterPanel: true });
            },
        });
        return (React.createElement(CommandBar_1.CommandBar, { items: items, farItems: farItems }));
    }
    /**
     * Renders search box
     */
    renderSearchBox() {
        return (React.createElement("div", { style: { marginTop: 10 } },
            React.createElement(SearchBox_1.SearchBox, { onChange: newValue => {
                    let searchTerm = newValue.toLowerCase();
                    this.setState({ searchTerm });
                }, placeholder: this.props.searchBoxLabelText })));
    }
    /**
     * Fetch initial data
     */
    fetchInitialData() {
        return __awaiter(this, void 0, void 0, function* () {
            let hashState = Util.getUrlHash();
            const jsomCtx = yield jsom_ctx_1.CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
            const permissions = new SP.BasePermissions();
            permissions.set(31);
            const canUserManageWeb = jsomCtx.web.doesUserHavePermissions(permissions);
            yield jsom_ctx_1.ExecuteJsomQuery(jsomCtx);
            const configuration = yield DynamicPortfolioConfiguration.getConfig();
            let currentView;
            if (this.props.defaultView) {
                currentView = this.props.defaultView;
            }
            else {
                let viewIdUrlParam = GetUrlKeyValue("viewId");
                if (viewIdUrlParam !== "") {
                    [currentView] = configuration.views.filter(qc => qc.id === parseInt(viewIdUrlParam, 10));
                    if (!currentView) {
                        throw {
                            message: Resources_1.default.getResource("DynamicPortfolio_ViewNotFound"),
                            type: MessageBar_1.MessageBarType.error,
                        };
                    }
                }
                else if (hashState.viewId) {
                    [currentView] = configuration.views.filter(qc => qc.id === parseInt(hashState.viewId, 10));
                    if (!currentView) {
                        throw {
                            message: Resources_1.default.getResource("DynamicPortfolio_ViewNotFound"),
                            type: MessageBar_1.MessageBarType.error,
                        };
                    }
                }
                else {
                    [currentView] = configuration.views.filter(qc => qc.default);
                    if (!currentView) {
                        throw {
                            message: Resources_1.default.getResource("DynamicPortfolio_NoDefaultView"),
                            type: MessageBar_1.MessageBarType.error,
                        };
                    }
                }
            }
            const fieldNames = configuration.columns.map(f => f.fieldName);
            const response = yield DynamicPortfolioSearch_1.queryProjects(currentView, configuration);
            // Populates DynamicPortfolioFieldSelector with items from this.configuration.columns
            DynamicPortfolioFieldSelector_1.default.items = configuration.columns.map(col => ({
                name: col.name,
                value: col.fieldName,
                defaultSelected: Array.contains(currentView.fields, col.name),
                readOnly: col.readOnly,
            }));
            // Sort the columns as they are added to the view
            let selectedColumns = currentView.fields.map(f => configuration.columns.filter(fc => fc.name === f)[0]);
            // Get selected filters
            let filters = this.getSelectedFiltersWithItems(response.refiners, configuration, currentView).concat([DynamicPortfolioFieldSelector_1.default]);
            // Sorts items from response.primarySearchResults
            let items = response.primarySearchResults.sort(this.props.defaultSortFunction);
            let updatedState = {
                selectedColumns,
                fieldNames,
                items,
                filters,
                currentView,
                configuration,
                canUserManageWeb: canUserManageWeb.get_value(),
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
        });
    }
    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     */
    getFilteredData() {
        let groups = null;
        if (this.state.groupBy) {
            const itemsSort = {
                props: [this.state.groupBy.fieldName],
                opts: {},
            };
            if (this.state.currentSort) {
                itemsSort.props.push(this.state.currentSort.fieldName);
                itemsSort.opts.reverse = !this.state.currentSort.isSortedDescending;
            }
            const groupItems = array_sort(this.state.filteredItems, itemsSort.props, itemsSort.opts);
            const groupNames = groupItems.map(g => g[this.state.groupBy.fieldName] ? g[this.state.groupBy.fieldName] : Resources_1.default.getResource("String_NotSet"));
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
        let items = this.state.filteredItems
            ? this.state.filteredItems.filter(item => {
                const fieldNames = this.state.selectedColumns.map(col => col.fieldName);
                return fieldNames.filter(fieldName => {
                    return item[fieldName] && item[fieldName].toLowerCase().indexOf(this.state.searchTerm) !== -1;
                }).length > 0;
            })
            : [];
        return {
            items,
            columns: this.state.selectedColumns,
            groups: groups,
        };
    }
    /**
     * Export current view to Excel (xlsx)
     */
    exportToExcel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ excelExportStatus: ExportToExcel_1.ExcelExportStatus.Exporting });
            const data = this.getFilteredData();
            const sheet = {
                name: this.props.excelExportConfig.sheetName,
                data: [
                    data.columns.map(col => col.name),
                    ...data.items.map(item => data.columns.map(col => item[col.fieldName])),
                ],
            };
            const fileName = String.format(this.props.excelExportConfig.fileName, this.state.currentView.name, Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
            yield ExportToExcel_1.default({
                sheets: [sheet],
                fileName,
            });
            this.setState({ excelExportStatus: ExportToExcel_1.ExcelExportStatus.Idle });
        });
    }
    /**
     * Get selected filters with items. Based on refiner configuration retrieved from the config list,
     * the filters are checked against refiners retrieved by search.
     *
     * @param {any[]} refiners Refiners retrieved by search
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig} viewConfig View configuration
     */
    getSelectedFiltersWithItems(refiners, configuration, viewConfig) {
        return configuration.refiners
            .filter(ref => (refiners.filter(r => r.Name === ref.key).length > 0) && (Array.contains(viewConfig.refiners, ref.name)))
            .map(ref => {
            let entries = refiners.filter(r => r.Name === ref.key)[0].Entries;
            let items = entries.results
                .map(entry => ({
                name: entry.RefinementName,
                value: entry.RefinementValue,
            }))
                .sort((a, b) => a.value > b.value ? 1 : -1);
            return Object.assign({}, ref, { items });
        });
    }
    /**
     * Changes view, doing a new search
     *
     * @param {DynamicPortfolioConfiguration.IDynamicPortfolioViewConfig} viewConfig View configuration
     */
    _onChangeView(viewConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.currentView.id === viewConfig.id) {
                return;
            }
            yield this.updateState({ isChangingView: viewConfig });
            const response = yield DynamicPortfolioSearch_1.queryProjects(viewConfig, this.state.configuration);
            DynamicPortfolioFieldSelector_1.default.items = this.state.configuration.columns.map(col => ({
                name: col.name,
                value: col.fieldName,
                defaultSelected: Array.contains(viewConfig.fields, col.name),
                readOnly: col.readOnly,
            }));
            let filters = this.getSelectedFiltersWithItems(response.refiners, this.state.configuration, viewConfig).concat([DynamicPortfolioFieldSelector_1.default]);
            let updatedState = {
                isChangingView: null,
                items: [
                    ...response.primarySearchResults,
                ],
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
            yield this.updateState(updatedState);
            if (this.props.viewSelectorEnabled) {
                Util.setUrlHash({ viewId: this.state.currentView.id.toString() });
            }
        });
    }
}
DynamicPortfolio.displayName = "DynamicPortfolio";
DynamicPortfolio.defaultProps = IDynamicPortfolioProps_1.DynamicPortfolioDefaultProps;
exports.default = DynamicPortfolio;
