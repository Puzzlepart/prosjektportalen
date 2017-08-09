import * as React from "react";
import { sp } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { DetailsList } from "office-ui-fabric-react/lib/DetailsList";
import ISectionListProps from "./ISectionListProps";
import ISectionListState from "./ISectionListState";

export default class SectionList extends React.Component<ISectionListProps, ISectionListState> {
    /**
     * Constructor
     */
    constructor(props: ISectionListProps) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchData(this.props).then(data => {
            this.setState({
                ...data,
                isLoading: false,
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const {
            isLoading,
            items,
            columns,
        } = this.state;

        console.log(columns);

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {
            return (
                <div>
                    <DetailsList
                        items={items}
                        columns={columns} />
                </div >
            );
        }
    }

    /**
     * Fetches required data
     */
    private fetchData = ({ listTitle, viewQuery, viewFields }: ISectionListProps) => new Promise<any>((resolve, reject) => {
        const ctx = SP.ClientContext.get_current();
        const list = ctx.get_web().get_lists().getByTitle(listTitle);
        const camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(`<View>${viewQuery}</View>`);
        const items = list.getItems(camlQuery);
        const fields = list.get_fields();
        ctx.load(items);
        ctx.load(fields);
        ctx.executeQueryAsync(() => {
            let itemFieldValues = items.get_data().map(i => i.get_fieldValues());
            let validViewFields = viewFields.filter(vf => fields.get_data().filter(lf => lf.get_internalName() === vf).length > 0);
            let columns = validViewFields.map(vf => {
                const [field] = fields.get_data().filter(lf => lf.get_internalName() === vf);
                return {
                    key: field.get_internalName(),
                    fieldName: field.get_internalName(),
                    name: field.get_title(),
                    minWidth: 100,
                }
            });
            resolve({
                items: itemFieldValues,
                columns: columns,
            })
        }, reject);
    })
}
