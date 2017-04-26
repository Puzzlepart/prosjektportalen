import * as React from "react";
import * as unique from "array-unique";
import { DetailsList, IGroup, SelectionMode, TextField, Toggle, Spinner, SpinnerType } from "office-ui-fabric-react";
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
}

export interface IGainsOverviewState {
    data?: Data.IGainsOverviewData;
    isLoading: boolean;
    searchTerm: string;
    groupBy: string;
}

export default class GainsOverview extends React.PureComponent<IGainsOverviewProps, IGainsOverviewState> {
    public static defaultProps: Partial<IGainsOverviewProps> = {
        groupByOptions: [],
    };
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
            groupBy: null,
        };
    }

    public componentDidMount() {
        let { dataSource } = this.props;
        Data.retrieveFromSource(dataSource).then(data => this.setState({ data: data, isLoading: false }));
    }

    public render() {
        let { groupByOptions, showSearchBox } = this.props;
        let { isLoading, data } = this.state;
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        if (data) {
            let { items, columns, groups } = this.getFilteredData();
            return (<div style={{ width: "100%" }}>
                <TextField hidden={showSearchBox === false} onChanged={text => this.setState({ searchTerm: text })} disabled={isLoading} placeholder="Søk i alle gevinster" style={{ padding: 25, color: "#777" }} />
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
     * Get filtered data based on groupBy and searchTerm
     *
     * @param items Item collection
     * @param columns Column collection
     * @param groups Group collection
     */
    private getFilteredData = (): { items: any[], columns: any[], groups: IGroup[] } => {
        let { groupBy, data, searchTerm } = this.state;
        let columns = [].concat(data.columns);
        let groups: IGroup[] = null;
        if (groupBy) {
            let groupItems = data.items.sort((a, b) => {
                return a[groupBy] > b[groupBy] ? -1 : 1;
            });
            let groupNames = groupItems.map(g => g[groupBy]);
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
        return {
            items: data.items.filter(item => item.Title.toLowerCase().indexOf(searchTerm.toLowerCase())),
            columns: columns,
            groups: groups,
        };
    }

    /**
     * Sorting on column click
     */
    private _onColumnClick = (event, column): any => {
        let { data } = this.state;
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
