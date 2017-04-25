import * as React from "react";
import { SelectionMode, DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { MatrixStyle } from "../../Config";

export interface IRiskListProps {
    items: any[];
    columns: IColumn[];
}

export interface IRiskListState {
    items: any[];
    columns: IColumn[];
}

export class RiskList extends React.Component<IRiskListProps, IRiskListState> {
    constructor() {
        super();
        this.state = {
            items: null,
            columns: null,
        };
    }

    public componentDidMount(): void {
        let { items, columns } = this.props;
        this.setState({
            items: items.map(i => i.FieldValuesAsHtml),
            columns: columns.filter(c => c),
        });
    }

    public render(): JSX.Element {
        let { items, columns } = this.props;
        if (items && columns) {
            return (
                <div className="risk-list ms-Grid">
                    <DetailsList
                        items={items}
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
        const borderColor = MatrixStyle[item.GtRiskProbability][item.GtRiskConsequence].borderColor;
        switch (column.fieldName) {
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
        let { items, columns } = this.state;
        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        items = [].concat(items).sort((a, b) => {
            let firstValue = parseFloat(a[column.fieldName]);
            let secondValue = parseFloat(b[column.fieldName]);
            return isSortedDescending ? secondValue - firstValue : firstValue - secondValue;
        });
        this.setState({
            columns: columns.map(col => {
                col.isSorted = (col.key === column.key);
                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }
                return col;
            }),
            items: items,
        });
    }
}
export default RiskList;

