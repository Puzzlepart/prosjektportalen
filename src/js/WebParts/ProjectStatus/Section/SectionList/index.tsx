import * as React from "react";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import ISectionListProps from "./ISectionListProps";
import ISectionListState from "./ISectionListState";

export default class SectionList extends React.Component<ISectionListProps, ISectionListState> {
    /**
     * Constructor
     */
    constructor(props: ISectionListProps) {
        super(props);
        this.state = {};
    }
    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const { listData } = this.props;

        if (!listData) {
            return null;
        }

        return (
            <div>
                <DetailsList { ...listData } onRenderItemColumn={this._onRenderItemColumn} />
            </div >
        );
    }

    /**
     * On render item column
     */
    private _onRenderItemColumn = (item: any, index: number, col: IColumn) => {
        const colValue = item[col.fieldName];
        if (typeof colValue === "string") {
            return colValue;
        } else if (typeof colValue === "number") {
            return colValue;
        } else if (typeof colValue === "object") {
            if (colValue.hasOwnProperty("Label")) {
                return colValue.Label;
            }
        }
        return null;
    }
}
