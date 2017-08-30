import * as React from "react";
import {
    DetailsList,
    IColumn,
    SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
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

        if (!listData || listData.items.length === 0) {
            return null;
        }

        return (
            <div>
                <DetailsList { ...listData }
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={this._onRenderItemColumn} />
            </div >
        );
    }
    /**
     * On render item column
     */
    private _onRenderItemColumn = (item, index: number, col: IColumn) => {
        const colValue = item[col.fieldName];

        switch (col.fieldName) {
            case "Title": {
                let defaultDisplayFormUrl = `${this.props.listData.defaultDisplayFormUrl}?ID=${item.ID}`;
                return (
                    <a
                        href={defaultDisplayFormUrl}
                        onClick={e => {
                            e.preventDefault();
                            SP.UI.ModalDialog.ShowPopupDialog(defaultDisplayFormUrl);
                        }}>
                        <span>{colValue}</span>
                    </a>
                );
            }
        }

        return (
            <span dangerouslySetInnerHTML={{ __html: colValue }}></span>
        );
    }
}
