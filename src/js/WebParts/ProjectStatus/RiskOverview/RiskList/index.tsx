import * as React from "react";
import {
    SelectionMode,
    DetailsList,
    IColumn,
} from "office-ui-fabric-react/lib/DetailsList";
import IRiskListProps from "./IRiskListProps";
import IRiskListState from "./IRiskListState";

export class RiskList extends React.Component<IRiskListProps, IRiskListState> {
    /**
     * Constructor
     */
    constructor(props: IRiskListProps) {
        super(props);
        this.state = {};
    }

    /**
     * Render the component
     */
    public render(): JSX.Element {
        let { items, columns } = this.props;
        return (
            <div className="risk-list ms-Grid">
                <DetailsList
                    items={items}
                    columns={columns}
                    onRenderItemColumn={this._onRenderItemColumn}
                    selectionMode={SelectionMode.none} />
            </div>
        );
    }

    /**
     * Render item column
     */
    private _onRenderItemColumn = (item: any, index: number, column: IColumn): JSX.Element => {
        const fieldValue = item[column.fieldName];
        switch (column.fieldName) {
            case "GtRiskFactor":
                return <span>{Math.round(+ fieldValue)}</span>;
            default:
                return <span>{fieldValue}</span>;
        }
    }
}
export default RiskList;

