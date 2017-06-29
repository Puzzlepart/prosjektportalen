import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import * as Util from "../../../Util";
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
                    <label
                        id="pp-showPostActionLbl"
                        htmlFor="pp-showPostAction">{__("ProjectStatus_RiskShowPostActionLabel")}</label>
                </div>
                <RiskList items={items} columns={columns} />
            </div>
        );
    }

    /**
     * Fetch data using JSOM
     */
    private fetchData = () => new Promise<Partial<IRiskOverviewState>>((resolve, reject) => {
        Util.getClientContext(_spPageContextInfo.webAbsoluteUrl)
            .then(ctx => {
                const spList = ctx.get_web().get_lists().getByTitle(__("Lists_Uncertainties_Title"));
                const camlQuery = new SP.CamlQuery();
                camlQuery.set_viewXml(`<View>
                    <Query>
                        <Where>
                            <And>
                                <And>
                                    <Eq>
                                        <FieldRef Name="ContentType" />
                                        <Value Type="Computed">${__("ContentTypes_Risiko_Name")}</Value>
                                    </Eq>
                                    <Neq>
                                        <FieldRef Name="GtRiskStatus" />
                                        <Value Type="Text">${__("Choice_GtRiskStatus_ActionTaken")}</Value>
                                    </Neq>
                                </And>
                                <Neq>
                                    <FieldRef Name="GtRiskStatus" />
                                    <Value Type="Text">${__("Choice_GtRiskStatus_NoLongerRelevant")}</Value>
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
                    resolve({
                        items: spItemsData.map(i => i.get_fieldValuesAsHtml().get_fieldValues()),
                        columns: this.generateColumns(spViewFields, spFields).filter(c => c),
                    });
                }, reject);
            });
    })

    /**
     * Generate columns
     */
    private generateColumns = (viewFields: SP.ViewFieldCollection, spFields: SP.FieldCollection): IColumn[] => {
        let columns: IColumn[] = [];
        viewFields.get_data().forEach(viewField => {
            let [field] = spFields.get_data().filter(f => f.get_internalName() === viewField.replace("Link", ""));
            if (field) {
                let col: IColumn = {
                    key: viewField,
                    fieldName: field.get_internalName(),
                    name: field.get_title(),
                    isResizable: true,
                    minWidth: 100,
                };
                if (field.get_typeAsString() === "Note") {
                    col.minWidth = 300;
                }
                if (field.get_internalName() === "ID") {
                    col.minWidth = 30;
                    col.maxWidth = 30;
                }
                if (field.get_internalName() === "Title") {
                    col.minWidth = 250;
                }
                columns.push(col);
            }
        });
        return columns;
    }
}

export default RiskOverview;


