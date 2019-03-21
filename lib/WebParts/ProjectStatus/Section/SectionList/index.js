"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const array_sort = require("array-sort");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
/**
 * Section List
 */
class SectionList extends React.Component {
    /**
     * Constructor
     *
     * @param {ISectionListProps} props Props
     */
    constructor(props) {
        super(props);
        /**
         * On render item column
         *
         * @param {any} item Item
         * @param {number} index Index
         * @param {IColumn} col Column
         * @param {ISectionListProps} param3 Props
         * @param {ISectionListState} param4 State
         */
        this._onRenderItemColumn = (item, index, column, {}, { listData }) => {
            const colValue = item[column.fieldName];
            switch (column.fieldName) {
                case "Title": {
                    let defaultDisplayFormUrl = `${listData.defaultDisplayFormUrl}?ID=${item.ID}`;
                    column.isMultiline = true;
                    return (React.createElement("a", { href: defaultDisplayFormUrl, onClick: e => {
                            e.preventDefault();
                            SP.UI.ModalDialog.ShowPopupDialog(defaultDisplayFormUrl);
                        } },
                        React.createElement("span", null, colValue)));
                }
            }
            return (React.createElement("span", { dangerouslySetInnerHTML: { __html: colValue } }));
        };
        /**
         * On render item column
         *
         * @param {any} event Event
         * @param {IColumn} column Column
         * @param {ISectionListProps} param2 Props
         * @param {ISectionListState} param3 State
         */
        this._onColumnSort = (event, column, {}, { listData }) => {
            if (column.data.type === "datetime") {
                return;
            }
            let isSortedDescending = column.isSortedDescending;
            if (column.isSorted) {
                isSortedDescending = !isSortedDescending;
            }
            const items = array_sort(listData.items, [column.fieldName], { reverse: !isSortedDescending });
            this.setState({
                listData: Object.assign({}, listData, { items, columns: listData.columns.map(col => {
                        col.isSorted = (col.key === column.key);
                        if (col.isSorted) {
                            col.isSortedDescending = isSortedDescending;
                        }
                        return col;
                    }) }),
            });
        };
        this.state = {
            listData: props.listData,
        };
    }
    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    render() {
        return this._render(this.props, this.state);
    }
    /**
     * Renders the component
     *
     * @param {ISectionListProps} param0 Props
     * @param {ISectionListState} param1 State
     */
    _render({ id }, { listData }) {
        if (!listData || listData.items.length === 0) {
            return null;
        }
        return (React.createElement("div", { id: id },
            React.createElement(DetailsList_1.DetailsList, Object.assign({}, listData, { selectionMode: DetailsList_1.SelectionMode.none, onRenderItemColumn: (item, index, col) => this._onRenderItemColumn(item, index, col, this.props, this.state), onColumnHeaderClick: (e, col) => this._onColumnSort(e, col, this.props, this.state) }))));
    }
}
exports.default = SectionList;
