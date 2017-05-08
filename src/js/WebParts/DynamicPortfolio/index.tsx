import * as React from "react";
import {
    TextField,
    DetailsList,
    SelectionMode,
    Spinner,
    SpinnerType,
    Button,
} from "office-ui-fabric-react";
import {
    FilterSection,
    IFilter,
    FieldFilter,
} from "./Filter";
import * as Configuration from "./Configuration";
import * as Search from "./Search";
import { _onRenderItemColumn } from "./ItemColumn";

export interface IDynamicPortfolioState {
    isLoading: boolean;
    items?: any[];
    filteredItems?: any[];
    columns?: any[];
    selectedColumns?: any[];
    fieldNames?: string[];
    searchTerm: string;
    filters?: IFilter[];
    viewConfig?: Configuration.IViewConfig[];
    refinerConfig?: Configuration.IRefinerConfig[];
    currentFilters?: { [key: string]: string[] };
}

export default class DynamicPortfolio extends React.Component<any, IDynamicPortfolioState> {
    private searchProp: any = "Title";

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
                FieldFilter.items = columnConfig.map(col => ({
                    name: col.name,
                    value: col.fieldName,
                    defaultSelected: Array.contains(defaultViewConfig.fields, col.name),
                    readOnly: col.readOnly,
                }));
                let filters = [FieldFilter].concat(this.getSelectedFiltersWithItems(refinerConfig, refiners, defaultViewConfig));
                this.setState({
                    columns: columnConfig,
                    selectedColumns: columnConfig.filter(fc => Array.contains(defaultViewConfig.fields, fc.name)),
                    fieldNames: fieldNames,
                    isLoading: false,
                    items: primarySearchResults,
                    filteredItems: primarySearchResults,
                    filters: filters,
                    viewConfig: viewConfig,
                    refinerConfig: refinerConfig,
                });
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        let { filteredItems, searchTerm, filters, isLoading, selectedColumns, viewConfig } = this.state;
        let items = filteredItems ? filteredItems.filter(item => item[this.searchProp].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) : [];
        return (<div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl2 ms-u-xxxl1">
                    {
                        isLoading ?
                            <Spinner type={SpinnerType.large} />
                            :
                            <FilterSection filters={filters} onFilterChange={this._onFilterChange} />
                    }
                </div>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl10 ms-u-xxxl11">
                    <TextField onChanged={text => this.setState({ searchTerm: text })} disabled={isLoading} placeholder={__("DynamicPortfolio_SearchBox_Placeholder")} style={{ padding: 25, color: "#777" }} />
                    {viewConfig.map((qc, idx) => (
                        <Button
                            key={idx}
                            text={qc.name}
                            icon={qc.iconName}
                            onClick={e => {
                                e.preventDefault();
                                this.doSearch(qc);
                            }}
                        />))}
                    {
                        isLoading ?
                            <Spinner type={SpinnerType.large} />
                            :
                            <div>
                                <DetailsList
                                    items={items}
                                    columns={selectedColumns}
                                    selectionMode={SelectionMode.none}
                                    onRenderItemColumn={_onRenderItemColumn}
                                    onColumnHeaderClick={(col, evt) => this._onColumnClick(col, evt)}
                                />
                            </div>
                    }
                </div>
            </div>
        </div>);
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
        let { columns, items, currentFilters } = this.state;
        if (filter.key === "Fields") {
            this.setState({
                fieldNames: filter.selected,
                selectedColumns: columns.filter(field => Array.contains(filter.selected, field.fieldName)),
            });
        } else {
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
            });
        }
    }

    /**
     * On column click. Sorts the column on click.
     *
     * @param event Event
     * @param column The column config
     */
    private _onColumnClick = (event, column): void => {
        let { filteredItems, selectedColumns } = this.state;
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
     * @param viewConfig Query configuration
     */
    private doSearch(viewConfig: Configuration.IViewConfig): void {
        this.setState({
            isLoading: true,
        });
        const { fieldNames, refinerConfig } = this.state;
        Search.query(viewConfig, fieldNames, refinerConfig.map(ref => ref.key).join(",")).then(({ primarySearchResults, refiners }) => {
            let filters = [FieldFilter].concat(this.getSelectedFiltersWithItems(refinerConfig, refiners, viewConfig));
            this.setState({
                isLoading: false,
                items: primarySearchResults,
                filteredItems: primarySearchResults,
                filters: filters,
            });
        });
    }
};
