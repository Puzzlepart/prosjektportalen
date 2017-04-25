import * as React from "react";
import { sp } from "sp-pnp-js";
import { SelectionMode, DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";

export interface IProductsListProps {
    viewName: string;
}

export interface IProductsListState {
    items: any[];
    columns: IColumn[];
}

export class ProductsList extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            items: null,
            columns: null,
        };
    }

    public componentDidMount(): void {
        const { viewName } = this.props;
        let list = sp.web.lists.getByTitle("Prosjektprodukter");
        let batch = sp.createBatch();
        Promise.all([
            list.items.expand("FieldValuesAsHtml").inBatch(batch).get(),
            list.fields.inBatch(batch).get(),
            list.views.getByTitle(viewName).expand("ViewFields").inBatch(batch).get(),
        ]).then(([items, fields, view]) => {
            let columns: IColumn[] = view.ViewFields.Items.results.map(viewField => {
                let [field] = fields.filter(f => f.InternalName === viewField.replace("Link", ""));
                return ({
                    key: field ? field.InternalName : "",
                    fieldName: field ? field.InternalName : "",
                    name: field ? field.Title : "",
                    minWidth: 100,
                });
            });
            this.setState({
                items: items.map(i => i.FieldValuesAsHtml),
                columns: columns,
            });
        });
        batch.execute();
    }

    public render(): JSX.Element {
        let { items, columns } = this.state;
        if (items && columns) {
            return (
                <div className="ms-Grid">
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

    /**
     * Render item column
     */
    private renderItemColumn = (item: any, index: number, column: IColumn): JSX.Element => {
        console.log(item);
        const fieldValue = (typeof item[column.fieldName] === "string" ? item[column.fieldName] : "");
        console.log(fieldValue);
        console.log(column.fieldName);
        return (<span dangerouslySetInnerHTML={{ __html: fieldValue }}></span>);
    }

    /**
     * On column click
     *
     * @param column Column
     */
    private onColumnClick(column: IColumn): void {
        let { items, columns } = this.state;
        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        items = items.sort((a, b) => {
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

export default ProductsList;

