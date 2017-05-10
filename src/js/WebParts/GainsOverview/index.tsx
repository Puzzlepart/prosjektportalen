import * as React from "react";
import * as unique from "array-unique";
import {
    DetailsList,
    IGroup,
    SelectionMode,
    Toggle,
    Spinner,
    SpinnerType,
    SearchBox,
} from "office-ui-fabric-react";
import { DataSource } from "../DataSource";
import { _onRenderItemColumn } from "./Columns";
import * as Data from "./Data";

export interface IGroupByOption {
    label: string;
    property: string;
}

export interface IGainsOverviewProps {
    dataSource: DataSource;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    searchProperty?: string;
}

export interface IGainsOverviewState {
    data?: Data.IGainsOverviewData;
    isLoading: boolean;
    searchTerm: string;
    groupBy: string;
}

/**
 * Gains Overview
 */
export default class GainsOverview extends React.PureComponent<IGainsOverviewProps, IGainsOverviewState> {
    public static defaultProps: Partial<IGainsOverviewProps> = {
        groupByOptions: [],
        searchProperty: "Title",
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
            groupBy: null,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        let { dataSource } = this.props;
        Data.retrieveFromSource(dataSource).then(data => this.setState({ data: data, isLoading: false }));
    }

    /**
     * Render the component
     */
    public render(): JSX.Element {
        const {
            groupByOptions,
            showSearchBox,
        } = this.props;

        const {
            isLoading,
            data,
        } = this.state;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        if (data) {
            let { items, columns, groups } = this.getFilteredData();
            return (<div style={{ width: "100%" }}>
                {showSearchBox !== false &&
                    <SearchBox
                        onChange={st => this.setState({ searchTerm: st.toLowerCase() })}
                        labelText="Søk i alle gevinster" />
                }
                {groupByOptions.map((gp, idx) => <Toggle
                    key={idx}
                    onChanged={checked => this.setState({ groupBy: checked ? gp.property : null })}
                    defaultChecked={false}
                    label={gp.label}
                    onText={__("String_Yes")}
                    offText={__("String_No")} />)}
                <DetailsList
                    items={items}
                    columns={columns}
                    groups={groups}
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={_onRenderItemColumn}
                    onColumnHeaderClick={(col, evt) => this._onColumnClick(col, evt)}
                />
            </div>);
        }
        return null;
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param items Item collection
     * @param columns Column collection
     * @param groups Group collection
     */
    private getFilteredData = (): { items: any[], columns: any[], groups: IGroup[] } => {
        const {
            groupBy,
            data,
            searchTerm,
        } = this.state;

        const { searchProperty } = this.props;

        let columns = [].concat(data.columns);
        let groups: IGroup[] = null;
        if (groupBy) {
            const groupItems = data.items.sort((a, b) => {
                return a[groupBy] > b[groupBy] ? -1 : 1;
            });
            const groupNames = groupItems.map(g => g[groupBy]);
            groups = unique([].concat(groupNames)).map((name, idx) => ({
                key: idx,
                name: name,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));

            /**
             * Remove the column we're grouping by
             */
            let indexOfColumn = data.columns.map(({ fieldName }) => fieldName).indexOf(groupBy);
            columns.splice(indexOfColumn, 1);
        }
        const filteredItems = data.items.filter(item => item[searchProperty].toLowerCase().indexOf(searchTerm) !== -1);
        return {
            items: filteredItems,
            columns: columns,
            groups: groups,
        };
    }

    /**
     * Sorting on column click
     */
    private _onColumnClick = (event, column): any => {
        const { data } = this.state;

        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        let items = data.items.concat([]).sort((a, b) => {
            let firstValue = a[column.fieldName];
            let secondValue = b[column.fieldName];
            if (isSortedDescending) {
                return firstValue > secondValue ? -1 : 1;
            } else {
                return firstValue > secondValue ? 1 : -1;
            }
        });
        let columns = data.columns.map(col => {
            col.isSorted = (col.key === column.key);
            if (col.isSorted) {
                col.isSortedDescending = isSortedDescending;
            }
            return col;
        });
        this.setState({
            data: {
                items: items,
                columns: columns,
            },
        });
    }
};
