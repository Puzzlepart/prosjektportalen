import * as React from "react";
import { SelectionMode, DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as Config from "../Config";

export class RiskList extends React.Component<any, any> {
    public static defaultProps = {
        items: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            sortedItems: null,
            columns: null,
        };
    }

    public componentDidMount(): void {
        this.setState({
            sortedItems: this
                .props
                .items
                .sort((a, b) => parseFloat(b.GtRiskFactor) - parseFloat(a.GtRiskFactor)),
            columns: Config.RiskList.Columns,
        });
    }

    public render(): JSX.Element {
        let { sortedItems, columns } = this.state;
        if (sortedItems && columns) {
            return (
                <div className="risk-list ms-Grid">
                    <DetailsList
                        items={sortedItems}
                        columns={columns}
                        onRenderItemColumn={this.renderItemColumn}
                        onColumnHeaderClick={(ev, col) => {
                            ev.preventDefault();
                            this.onColumnClick(col);
                        }}
                        selectionMode={SelectionMode.none} />
                </div>
            );
        }
        return null;
    }

    private renderItemColumn = (item: any, index: number, column: IColumn): JSX.Element => {
        const fieldValue = item[column.fieldName];
        const borderColor = Config.MatrixStyle[item.GtRiskProbability][item.GtRiskConsequence].borderColor;
        switch (column.key) {
            case "ID":
                return <div style={{ "borderColor": borderColor }} className={`risk-element-id`}><span>{fieldValue}</span></div >;
            case "GtRiskFactor":
                return <div><span>{Math.round(+ fieldValue)}</span></div>;
            case "Title":
                return <div><h3>{fieldValue}</h3></div>;
            default:
                return <span>{fieldValue}</span>;
        }
    }

    private onColumnClick(column: IColumn): void {
        let { sortedItems } = this.state;
        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        sortedItems = sortedItems.sort((a, b) => {
            let firstValue = parseFloat(a[column.fieldName]);
            let secondValue = parseFloat(b[column.fieldName]);
            return isSortedDescending ? secondValue - firstValue : firstValue - secondValue;
        });
        this.setState({
            columns: Config.RiskList.Columns.map(col => {
                col.isSorted = (col.key === column.key);
                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }
                return col;
            }),
            sortedItems: sortedItems,
        });
    }
}
export default RiskList;

