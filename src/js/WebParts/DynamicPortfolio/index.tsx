// #region Imports
import * as React from "react";
import * as array_unique from "array-unique";
import * as array_sort from "array-sort";
import {
    IGroup,
    DetailsList,
    SelectionMode,
    Spinner,
    SpinnerType,
    SearchBox,
    ContextualMenuItemType,
    CommandBar,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react";
import { IFilter } from "./Filter";
import FieldSelector from "./FieldSelector";
import FilterPanel from "./FilterPanel";
import * as Configuration from "./Configuration";
import * as Search from "./Search";
import _onRenderItemColumn from "./ItemColumn";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import IDynamicPortfolioProps from "./IDynamicPortfolioProps";
import IDynamicPortfolioState from "./IDynamicPortfolioState";
// #endregion

/**
 * Dynamic Portfolio
 */
export default class DynamicPortfolio extends React.Component<IDynamicPortfolioProps, IDynamicPortfolioState> {
    public static defaultProps: Partial<IDynamicPortfolioProps> = {
        searchProperty: "Title",
        showGroupBy: true,
        modalHeaderClassName: "ms-font-xxl",
        projectInfoFilterField: "GtPcPortfolioPage",
        constrainMode: ConstrainMode.horizontalConstrained,
        layoutMode: DetailsListLayoutMode.fixedColumns,
        selectionMode: SelectionMode.single,
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
            currentFilters: {},
            viewConfig: [],
            showFilterPanel: false,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchInitialData()
            .then(updatedState => this.setState({
                ...updatedState,
                isLoading: false,
            }))
            .catch(_ => this.setState({ isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const { isLoading } = this.state;

        const {
            constrainMode,
            layoutMode,
            selectionMode,
        } = this.props;

        const {
            items,
            columns,
            groups,
        } = this.getFilteredData();

        return (<div>
            <div>
                {this.renderCommandBar()}
                <div style={{ height: 10 }}></div>
                <SearchBox
                    onChange={st => this.setState({ searchTerm: st.toLowerCase() })}
                    labelText={__("DynamicPortfolio_SearchBox_Placeholder")} />
                {isLoading ?
                    <Spinner type={SpinnerType.large} />
                    :
                    <DetailsList
                        items={items}
                        constrainMode={constrainMode}
                        layoutMode={layoutMode}
                        columns={columns}
                        groups={groups}
                        selectionMode={selectionMode}
                        onItemInvoked={item => this.setState({ showProjectInfo: item })}
                        onRenderItemColumn={(item, index, column: any) => _onRenderItemColumn(item, index, column)}
                        onColumnHeaderClick={(col, evt) => this._onColumnSort(col, evt)}
                    />
                }
            </div>
            {this.renderFilterPanel()}
            {this.renderProjectInfoModal()}
        </div>);
    }

    /**
     * Fetch initial data
     */
    private fetchInitialData = () => new Promise<Partial<IDynamicPortfolioState>>((resolve, reject) => {
        Configuration.getConfig()
            .then(({ columnConfig, refinerConfig, viewConfig }) => {
                const fieldNames = columnConfig.map(f => f.fieldName);
                const [defaultViewConfig] = viewConfig.filter(qc => qc.default);
                if (!defaultViewConfig) {
                    return;
                }
                Search.query(defaultViewConfig, fieldNames, refinerConfig.map(ref => ref.key).join(","))
                    .then(({ primarySearchResults, refiners }) => {
                        FieldSelector.items = columnConfig.map(col => ({
                            name: col.name,
                            value: col.fieldName,
                            defaultSelected: Array.contains(defaultViewConfig.fields, col.name),
                            readOnly: col.readOnly,
                        }));
                        let filters = [FieldSelector].concat(this.getSelectedFiltersWithItems(refinerConfig, refiners, defaultViewConfig));
                        resolve({
                            columns: columnConfig,
                            selectedColumns: columnConfig.filter(fc => Array.contains(defaultViewConfig.fields, fc.name)),
                            fieldNames: fieldNames,
                            items: primarySearchResults,
                            filteredItems: primarySearchResults,
                            filters: filters,
                            viewConfig: viewConfig,
                            currentView: defaultViewConfig,
                            refinerConfig: refinerConfig,
                        });
                    })
                    .catch(reject);
            }).catch(reject);
    })

    /**
     * Render Filter Panel
     */
    private renderFilterPanel = () => {
        const {
            filters,
            showFilterPanel,
        } = this.state;

        if (filters) {
            return (
                <FilterPanel
                    isOpen={showFilterPanel}
                    onDismiss={() => this.setState({ showFilterPanel: false })}
                    filters={filters}
                    showIcons={false}
                    onFilterChange={this._onFilterChange} />
            );
        }
        return null;
    }

    /**
     * Renders the command bar from office-ui-fabric-react
     */
    private renderCommandBar = () => {
        const {
            viewConfig,
            currentView,
            selectedColumns,
            groupBy,
         } = this.state;

        const { showGroupBy } = this.props;

        if (!currentView) {
            return null;
        }

        const items = [];
        const farItems = [];

        if (showGroupBy) {
            const groupByColumns = selectedColumns.filter(col => col.groupBy).map((col, idx) => ({
                key: idx.toString(),
                name: col.name,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: col });
                },
            }));
            items.push({
                key: "Group",
                name: groupBy ? groupBy.name : __("String_NoGrouping"),
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                items: [
                    {
                        key: "NoGrouping",
                        name: __("String_NoGrouping"),
                        onClick: e => {
                            e.preventDefault();
                            this.setState({ groupBy: null });
                        },
                    },
                    ...groupByColumns,
                ],
            });
        }

        farItems.push({
            key: "View",
            name: currentView.name,
            iconProps: { iconName: "List" },
            itemType: ContextualMenuItemType.Header,
            onClick: e => e.preventDefault(),
            items: viewConfig.map((qc, idx) => ({
                key: idx.toString(),
                name: qc.name,
                iconProps: { iconName: qc.iconName },
                onClick: e => {
                    e.preventDefault();
                    this._doSearch(qc);
                },
            })),
        });
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

        return <CommandBar
            items={items}
            farItems={farItems}
        />;
    }

    /**
     * Renders the Project Info modal
     */
    private renderProjectInfoModal = () => {
        const {
            modalHeaderClassName,
            projectInfoFilterField,
        } = this.props;

        const { showProjectInfo } = this.state;

        if (showProjectInfo) {
            return <ProjectInfo
                webUrl={showProjectInfo.Path}
                hideChrome={true}
                showEditLink={false}
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
                }} />;
        }
        return null;
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     */
    private getFilteredData = () => {
        const {
            selectedColumns,
            filteredItems,
            groupBy,
            searchTerm,
            currentSort,
        } = this.state;

        const { searchProperty } = this.props;

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
            const groupNames = groupItems.map(g => g[groupBy.fieldName] ? g[groupBy.fieldName] : __("String_NotSet"));
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
        let items = filteredItems ? filteredItems.filter(item => item[searchProperty].toLowerCase().indexOf(searchTerm) !== -1) : [];
        return {
            items: items,
            columns: selectedColumns,
            groups: groups,
        };
    }

    /**
     * Get selected filters with items. Based on refiner configuration retrieved from the config list,
     * the filters are checked against the against refiners retrieved by search.
     *
     * @param refinerConfig Refiner configuration from the SP configuration list
     * @param refiners Refiners retrieved by search
     * @param viewConfig View configuration
     */
    private getSelectedFiltersWithItems = (refinerConfig: Configuration.IRefinerConfig[], refiners: Array<{ Name: string, Entries: { results: any[] } }>, viewConfig: Configuration.IViewConfig): any => {
        return refinerConfig
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
     * @param filter The filter that was changed
     */
    private _onFilterChange = (filter: IFilter): void => {
        const {
            columns,
            items,
            currentFilters,
            filters,
        } = this.state;

        let updatedFilterState: Partial<IDynamicPortfolioState> = {};

        switch (filter.key) {
            case "Fields": {
                updatedFilterState = {
                    fieldNames: filter.selected,
                    selectedColumns: columns.filter(field => Array.contains(filter.selected, field.fieldName)),
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
                    temp = [];
                if (filterKeys.length > 0) {
                    items.forEach(item => {
                        let shouldInclude = true;
                        filterKeys.forEach(filterKey => {
                            if (!Array.contains(currentFilters[filterKey], item[filterKey])) {
                                shouldInclude = false;
                            }
                        });
                        if (shouldInclude) {
                            temp.push(item);
                        }
                    });
                } else {
                    temp = items;
                }
                updatedFilterState = {
                    currentFilters: currentFilters,
                    filteredItems: temp,
                    filters: filters.map(f => (f.key === filter.key) ? filter : f),
                };
            }
        }

        console.log(updatedFilterState);

        this.setState(updatedFilterState);
    }

    /**
     * On column sort
     *
     * @param event Event
     * @param column The column config
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
     * Does a new search using Search.query
     *
     * @param viewConfig View configuration
     */
    private _doSearch(viewConfig: Configuration.IViewConfig): void {
        const {
        fieldNames,
            refinerConfig,
            currentView,
    } = this.state;

        if (currentView.id === viewConfig.id) {
            return;
        }
        this.setState({
            isLoading: true,
        }, () => {
            Search.query(viewConfig, fieldNames, refinerConfig.map(ref => ref.key).join(",")).then(({ primarySearchResults, refiners }) => {
                let filters = [FieldSelector].concat(this.getSelectedFiltersWithItems(refinerConfig, refiners, viewConfig));
                this.setState({
                    isLoading: false,
                    items: primarySearchResults,
                    filteredItems: primarySearchResults,
                    filters: filters,
                    currentView: viewConfig,
                });
            });
        });
    }
};
