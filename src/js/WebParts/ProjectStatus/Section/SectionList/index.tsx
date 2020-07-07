import * as arraySort from 'array-sort'
import { DetailsList, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import * as React from 'react'
import ISectionListProps from './ISectionListProps'
import ISectionListState from './ISectionListState'

/**
 * Section List
 */
export default class SectionList extends React.Component<ISectionListProps, ISectionListState> {
    /**
     * Constructor
     *
     * @param {ISectionListProps} props Props
     */
    constructor(props: ISectionListProps) {
        super(props)
        this.state = {
            listData: props.listData,
        }
    }

    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state)
    }

    /**
     * Renders the component
     *
     * @param {ISectionListProps} param0 Props
     * @param {ISectionListState} param1 State
     */
    public _render({ id }: ISectionListProps, { listData }: ISectionListState): JSX.Element {
        if (!listData || listData.items.length === 0) {
            return null
        }

        return (
            <div id={id}>
                <DetailsList { ...listData }
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={(item, index, col) => this._onRenderItemColumn(item, index, col, this.props, this.state)}
                    onColumnHeaderClick={(e, col) => this._onColumnSort(e, col, this.props, this.state)} />
            </div >
        )
    }

    /**
     * On render item column
     *
     * @param {any} item Item
     * @param {number} index Index
     * @param {IColumn} col Column
     * @param {ISectionListProps} param3 Props
     * @param {ISectionListState} param4 State
     */
    private _onRenderItemColumn = (item, index: number, column: IColumn, { }: ISectionListProps, { listData }: ISectionListState): JSX.Element => {
        const colValue = item[column.fieldName]

        // eslint-disable-next-line default-case
        switch (column.fieldName) {
            case 'Title': {
                const defaultDisplayFormUrl = `${listData.defaultDisplayFormUrl}?ID=${item.ID}`
                column.isMultiline = true
                return (
                    <a
                        href={defaultDisplayFormUrl}
                        onClick={e => {
                            e.preventDefault()
                            SP.UI.ModalDialog.ShowPopupDialog(defaultDisplayFormUrl)
                        }}>
                        <span>{colValue}</span>
                    </a>
                )
            }
        }

        return (
            <span dangerouslySetInnerHTML={{ __html: colValue }}></span>
        )
    }

    /**
     * On render item column
     *
     * @param {any} event Event
     * @param {IColumn} column Column
     * @param {ISectionListProps} param2 Props
     * @param {ISectionListState} param3 State
     */
    private _onColumnSort = (event, column: IColumn, { }: ISectionListProps, { listData }: ISectionListState): void => {
        if (column.data.type === 'datetime') {
            return
        }
        let isSortedDescending = column.isSortedDescending
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending
        }
        const items = arraySort(listData.items, [column.fieldName], { reverse: !isSortedDescending })
        this.setState({
            listData: {
                ...listData,
                items,
                columns: listData.columns.map(col => {
                    col.isSorted = (col.key === column.key)
                    if (col.isSorted) {
                        col.isSortedDescending = isSortedDescending
                    }
                    return col
                }),
            },
        })
    }
}
