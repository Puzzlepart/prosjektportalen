import * as React from "react";
import { sp } from "sp-pnp-js";
import RiskList from "./RiskList";
import RiskMatrix from "./RiskMatrix";
import IRiskOverviewProps from "./IRiskOverviewProps";
import IRiskOverviewState, { RiskOverviewInitialState } from "./IRiskOverviewState";

const RISK_CT: string = "0x010088578E7470CC4AA68D566346483107020101";

export class RiskOverview extends React.Component<IRiskOverviewProps, IRiskOverviewState> {
    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = RiskOverviewInitialState;
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        let list = sp.web.lists.getByTitle(__("Lists_Uncertainties_Title"));
        Promise.all([
            list.items.filter(`startswith(ContentTypeId,'${RISK_CT}')`).expand("FieldValuesAsHtml").get(),
            list.fields.get(),
            list.views.getByTitle(this.props.viewName).expand("ViewFields").get(),
        ]).then(([items, fields, view]) => {
            let columns: any[] = view.ViewFields.Items.results.map(viewField => {
                let [field] = fields.filter(f => f.InternalName === viewField.replace("Link", ""));
                if (field) {
                    return ({
                        key: viewField,
                        fieldName: field.InternalName,
                        name: field.Title,
                        minWidth: 100,
                    });
                }
                return null;
            });
            this.setState({
                items: items,
                itemsAsHtml: items.map(i => i.FieldValuesAsHtml),
                columns: columns.filter(c => c),
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const {
            items,
            itemsAsHtml,
            columns,
            showPostAction,
        } = this.state;

        if (items && columns) {
            return (
                <div>
                    <RiskMatrix items={items} postAction={showPostAction} />
                    <div>
                        <input
                            type="checkbox"
                            id="pp-showPostAction"
                            onClick={_ => this.setState({ showPostAction: !showPostAction })} />
                        <label htmlFor="pp-showPostAction">Vis før/etter tiltak</label>
                    </div>
                    <RiskList items={itemsAsHtml} columns={columns} />
                </div>
            );
        }
        return null;
    }
}

export default RiskOverview;


