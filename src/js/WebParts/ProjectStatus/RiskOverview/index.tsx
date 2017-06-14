import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import RiskList from "./RiskList";
import RiskMatrix from "./RiskMatrix";
import IRiskOverviewProps from "./IRiskOverviewProps";
import IRiskOverviewState, { RiskOverviewInitialState } from "./IRiskOverviewState";

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
        this.fetchData()
            .then(updatedState => this.setState({
                isLoading: false,
                ...updatedState,
            }))
            .catch(_ => this.setState({ isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return this._render(this.state);
    }

    private _render({ isLoading, items, columns, showPostAction }: IRiskOverviewState): JSX.Element {
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        return (
            <div>
                <RiskMatrix items={items} postAction={showPostAction} />
                <div>
                    <input
                        type="checkbox"
                        id="pp-showPostAction"
                        onClick={_ => this.setState({ showPostAction: !showPostAction })} />
                    <label id="pp-showPostActionLbl" htmlFor="pp-showPostAction">{__("StatusPage_RiskShowPostActionLabel")}</label>
                </div>
                <RiskList items={items} columns={columns} />
            </div>
        );
    }

    /**
     * Fetch data using JSOM
     */
    private fetchData = () => new Promise<Partial<IRiskOverviewState>>((resolve, reject) => {
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
            const ctx = SP.ClientContext.get_current();
            const spList = ctx.get_web().get_lists().getByTitle(__("Lists_Uncertainties_Title"));
            const camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(`<View>
            <Query>
                <Where>
                    <And>
                        <And>
                            <Eq>
                                <FieldRef Name="ContentType" />
                                <Value Type="Computed">Risiko</Value>
                            </Eq>
                            <Neq>
                                <FieldRef Name="GtRiskStatus" />
                                <Value Type="Text">Tiltak gjennomført</Value>
                            </Neq>
                        </And>
                        <Neq>
                            <FieldRef Name="GtRiskStatus" />
                            <Value Type="Text">Ikke lenger aktuell</Value>
                        </Neq>
                    </And>
                </Where>
            </Query>
        </View>`);
            const spItems = spList.getItems(camlQuery);
            const spFields = spList.get_fields();
            const spViewFields = spList.get_views().getByTitle(this.props.viewName).get_viewFields();
            ctx.load(spItems, "Include(FieldValuesAsHtml)");
            ctx.load(spFields);
            ctx.load(spViewFields);
            ctx.executeQueryAsync(() => {
                const spItemsData = spItems.get_data();
                let columns: IColumn[] = spViewFields.get_data().map(viewField => {
                    let [field] = spFields.get_data().filter(f => f.get_internalName() === viewField.replace("Link", ""));
                    if (field) {
                        return ({
                            key: viewField,
                            fieldName: field.get_internalName(),
                            name: field.get_title(),
                            minWidth: field && field.get_typeAsString() === "Note" ? 300 : 100,
                            isResizable: true,
                        });
                    }
                    return null;
                });
                resolve({
                    items: spItemsData.map(i => i.get_fieldValuesAsHtml().get_fieldValues()),
                    columns: columns.filter(c => c),
                });
            }, reject);
        });
    })
}

export default RiskOverview;


