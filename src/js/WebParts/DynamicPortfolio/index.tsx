import * as React from "react";
import * as unique from "array-unique";
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
import { _onRenderItemColumn } from "./ItemColumn";

export interface IDynamicPortfolioProps {
    searchProperty?: string;
    showGroupBy?: boolean;
}

export interface IDynamicPortfolioState {
    isLoading: boolean;
    items?: any[];
    filteredItems?: any[];
    columns?: any[];
    selectedColumns?: any[];
    fieldNames?: string[];
    searchTerm: string;
    filters?: IFilter[];
    currentView?: Configuration.IViewConfig;
    viewConfig?: Configuration.IViewConfig[];
    refinerConfig?: Configuration.IRefinerConfig[];
    currentFilters?: { [key: string]: string[] };
    error?: string;
    showFilterPanel: boolean;
    groupBy?: Configuration.IColumnConfig;
}

/**
 * Dynamic Portfolio
 */
export default class DynamicPortfolio extends React.Component<IDynamicPortfolioProps, IDynamicPortfolioState> {
    public static defaultProps: IDynamicPortfolioProps = {
        searchProperty: "Title",
        showGroupBy: false,
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
            filters: [],
            showFilterPanel: false,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        Configuration.getConfig().then(({ columnConfig, refinerConfig, viewConfig }) => {
            const fieldNames = columnConfig.map(f => f.fieldName);
            const [defaultViewConfig] = viewConfig.filter(qc => qc.default);
            if (!defaultViewConfig) {
                return;
            }
            Search.query(defaultViewConfig, fieldNames, refinerConfig.map(ref => ref.key).join(",")).then(({ primarySearchResults, refiners }) => {
                FieldSelector.items = columnConfig.map(col => ({
                    name: col.name,
                    value: col.fieldName,
                    defaultSelected: Array.contains(defaultViewConfig.fields, col.name),
                    readOnly: col.readOnly,
                }));
                let filters = [FieldSelector].concat(this.getSelectedFiltersWithItems(refinerConfig, refiners, defaultViewConfig));
                this.setState({
                    columns: columnConfig,
                    selectedColumns: columnConfig.filter(fc => Array.contains(defaultViewConfig.fields, fc.name)),
                    fieldNames: fieldNames,
                    isLoading: false,
                    items: primarySearchResults,
                    filteredItems: primarySearchResults,
                    filters: filters,
                    viewConfig: viewConfig,
                    currentView: defaultViewConfig,
                    refinerConfig: refinerConfig,
                });
            });
        }).catch(_ => {
            this.setState({
                isLoading: false,
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const {
            filters,
            showFilterPanel,
            isLoading,
        } = this.state;

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
                        constrainMode={ConstrainMode.horizontalConstrained}
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        columns={columns}
                        groups={groups}
                        selectionMode={SelectionMode.none}
                        onRenderItemColumn={_onRenderItemColumn}
                        onColumnHeaderClick={(col, evt) => this._onColumnClick(col, evt)}
                    />
                }
            </div>
            <FilterPanel
                isOpen={showFilterPanel}
                onDismiss={() => this.setState({ showFilterPanel: false })}
                filters={filters}
                showIcons={false}
                onFilterChange={this._onFilterChange} />
        </div>);
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

        if (!currentView) {
            return null;
        }

        const items = [];
        const farItems = [];

        if (this.props.showGroupBy) {
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
    * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
    */
    private getFilteredData = () => {
        const {
            selectedColumns,
            filteredItems,
            groupBy,
            searchTerm,
        } = this.state;

        let groups: IGroup[] = null;
        if (groupBy) {
            const groupItems = filteredItems.sort((a, b) => a[groupBy.fieldName] > b[groupBy.fieldName] ? -1 : 1);
            const groupNames = groupItems.map(g => g[groupBy.fieldName] ? g[groupBy.fieldName] : __("String_NotSet"));
            groups = unique([].concat(groupNames)).sort((a, b) => a > b ? 1 : -1).map((name, idx) => ({
                key: idx,
                name: name,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));
        }
        let items = filteredItems ? filteredItems.filter(item => item.Title.toLowerCase().indexOf(searchTerm) !== -1) : [];
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

        switch (filter.key) {
            case "Fields": {
                this.setState({
                    fieldNames: filter.selected,
                    selectedColumns: columns.filter(field => Array.contains(filter.selected, field.fieldName)),
                });
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
                this.setState({
                    currentFilters: currentFilters,
                    filteredItems: temp,
                    filters: filters.map(f => (f.key === filter.key) ? filter : f),
                });
            }
        }
    }

    /**
     * On column click. Sorts the column on click.
     *
     * @param event Event
     * @param column The column config
     */
    private _onColumnClick = (event, column): void => {
        let {
            filteredItems,
            selectedColumns,
         } = this.state;
        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        filteredItems = filteredItems.concat([]).sort((a, b) => {
            let firstValue = a[column.fieldName];
            let secondValue = b[column.fieldName];
            return isSortedDescending ? (firstValue > secondValue ? -1 : 1) : (firstValue > secondValue ? 1 : -1);
        });
        this.setState({
            filteredItems: filteredItems,
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
