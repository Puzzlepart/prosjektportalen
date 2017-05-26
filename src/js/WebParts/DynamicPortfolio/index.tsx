import * as React from "react";
import * as array_unique from "array-unique";
import * as array_sort from "array-sort";
import {
    IGroup,
    DetailsList,
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import {
    MessageBar,
    MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import { IFilter } from "./Filter";
import FieldSelector from "./FieldSelector";
import FilterPanel from "./FilterPanel";
import * as Configuration from "./Configuration";
import * as Search from "./Search";
import _onRenderItemColumn from "./ItemColumn";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import IDynamicPortfolioProps from "./IDynamicPortfolioProps";
import IDynamicPortfolioState from "./IDynamicPortfolioState";

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
        selectionMode: SelectionMode.none,
    };
    private configuration: Configuration.IConfiguration = null;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
            currentFilters: {},
            showFilterPanel: false,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchInitialData()
            .then(initialState => this.setState({
                ...initialState,
                isLoading: false,
            }, this.setHash))
            .catch(_ => this.setState({ isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return (
            <div>
                <div>
                    {this.renderCommandBar(this.state)}
                    <div style={{ height: 10 }}></div>
                    <SearchBox
                        onChange={st => this.setState({ searchTerm: st.toLowerCase() })}
                        labelText={__("DynamicPortfolio_SearchBox_Placeholder")} />
                    {this.renderItems(this.props, this.state)}
                </div>
                {this.renderFilterPanel(this.state)}
                {this.renderProjectInfoModal(this.state)}
            </div>
        );
    }

    /**
     * Fetch initial data
     */
    private fetchInitialData = () => new Promise<Partial<IDynamicPortfolioState>>((resolve, reject) => {
        let hashState = this.getHash();
        Configuration.getConfig()
            .then(config => {
                this.configuration = config;
                let initialView;
                if (hashState.viewId) {
                    [initialView] = this.configuration.views.filter(qc => qc.id === parseInt(hashState.viewId, 10));
                    if (!initialView) {
                        resolve({
                            errorMessage: {
                                message: __("DynamicPortfolio_ViewNotFound"),
                                type: MessageBarType.error,
                            },
                        });
                    }
                } else {
                    [initialView] = this.configuration.views.filter(qc => qc.default);
                    if (!initialView) {
                        resolve({
                            errorMessage: {
                                message: __("DynamicPortfolio_NoDefaultView"),
                                type: MessageBarType.error,
                            },
                        });
                    }
                }
                if (initialView) {
                    const fieldNames = this.configuration.columns.map(f => f.fieldName);
                    Search.query(initialView, this.configuration)
                        .then(response => {
                            FieldSelector.items = this.configuration.columns.map(col => ({
                                name: col.name,
                                value: col.fieldName,
                                defaultSelected: Array.contains(initialView.fields, col.name),
                                readOnly: col.readOnly,
                            }));
                            let filters = [FieldSelector].concat(this.getSelectedFiltersWithItems(response.refiners, initialView));
                            resolve({
                                selectedColumns: this.configuration.columns.filter(fc => Array.contains(initialView.fields, fc.name)),
                                fieldNames: fieldNames,
                                items: response.primarySearchResults,
                                filteredItems: response.primarySearchResults,
                                filters: filters,
                                currentView: initialView,
                            });
                        })
                        .catch(reject);
                }
            }).catch(reject);
    })

    /**
     * Render items
     */
    private renderItems = ({ constrainMode, layoutMode, selectionMode }: IDynamicPortfolioProps, { isLoading, errorMessage }: IDynamicPortfolioState) => {
        if (isLoading) {
            return (
                <Spinner type={SpinnerType.large} />
            );
        }

        if (errorMessage) {
            return (
                <MessageBar messageBarType={this.state.errorMessage.type}>{this.state.errorMessage.message}</MessageBar>
            );
        }

        const data = this.getFilteredData(this.state);

        if (data.items.length === 0) {
            return (
                <MessageBar>{__("DynamicPortfolio_NoResults")}</MessageBar>
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
     */
    private renderFilterPanel = ({ filters, showFilterPanel }: IDynamicPortfolioState) => {
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
    private renderCommandBar = ({ currentView, selectedColumns, groupBy }: IDynamicPortfolioState) => {
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
            items: this.configuration.views.map((qc, idx) => ({
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

        return (
            <CommandBar
                items={items}
                farItems={farItems}
            />
        );
    }

    /**
     * Renders the Project Info modal
     */
    private renderProjectInfoModal = ({ showProjectInfo }: IDynamicPortfolioState) => {
        const {
            modalHeaderClassName,
            projectInfoFilterField,
        } = this.props;

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
     */
    private getFilteredData = ({ selectedColumns, filteredItems, groupBy, searchTerm, currentSort }: IDynamicPortfolioState) => {
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
        let items = filteredItems ? filteredItems.filter(item => item[this.props.searchProperty].toLowerCase().indexOf(searchTerm) !== -1) : [];
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
     * @param refiners Refiners retrieved by search
     * @param viewConfig View configuration
     */
    private getSelectedFiltersWithItems = (refiners: Array<{ Name: string, Entries: { results: any[] } }>, viewConfig: Configuration.IViewConfig): any => {
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
     * @param filter The filter that was changed
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
        const { currentView } = this.state;

        if (currentView.id === viewConfig.id) {
            return;
        }

        this.setState({
            isLoading: true,
        }, () => {
            Search.query(viewConfig, this.configuration)
                .then(response => {
                    FieldSelector.items = this.configuration.columns.map(col => ({
                        name: col.name,
                        value: col.fieldName,
                        defaultSelected: Array.contains(viewConfig.fields, col.name),
                        readOnly: col.readOnly,
                    }));
                    let filters = [FieldSelector].concat(this.getSelectedFiltersWithItems(response.refiners, viewConfig));
                    this.setState({
                        isLoading: false,
                        items: response.primarySearchResults,
                        filteredItems: response.primarySearchResults,
                        filters: filters,
                        currentView: viewConfig,
                        selectedColumns: this.configuration.columns.filter(fc => Array.contains(viewConfig.fields, fc.name)),
                    }, this.setHash);
                })
                .catch(_ => this.setState({ isLoading: false }));
        });
    }

    /**
     * Set hash
     */
    private setHash(): void {
        document.location.href = `#viewId=${this.state.currentView.id}`;
    }


    /**
     * Get hash
     */
    private getHash(): { [key: string]: string } {
        const hash = document.location.hash.substring(1);
        let hashObject: { [key: string]: string } = {};
        hash.split("&").map(str => {
            const [key, value] = str.split("=");
            hashObject[key] = value;
        });
        return hashObject;
    }
}
