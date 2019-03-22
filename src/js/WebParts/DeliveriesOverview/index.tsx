import * as React from "react";
import { sp, Site } from "@pnp/sp";
import __ from "../../Resources";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import BaseWebPart from "../@BaseWebPart";
import IDeliveriesOverviewProps, { DeliveriesOverviewDefaultProps } from "./IDeliveriesOverviewProps";
import IDeliveriesOverviewState from "./IDeliveriesOverviewState";
import List from "../@Components/List";
import DeliveryElement from "./DeliveryElement";
import DataSource from "../DataSource";

/**
 * Deliveries Overview SPA
 */
export default class DeliveriesOverview extends BaseWebPart<IDeliveriesOverviewProps, IDeliveriesOverviewState> {
    public static displayName = "DeliveriesOverview";
    public static defaultProps = DeliveriesOverviewDefaultProps;

    /**
     * Constructor
     *
     * @param {IDeliveriesOverviewProps} props Props
     */
    constructor(props: IDeliveriesOverviewProps) {
        super(props, { isLoading: true });
    }



    public async componentDidMount(): Promise<void> {
        try {
            const items = await this._fetchItems();
            this.setState({ items, isLoading: false });
        } catch (err) {
            this.setState({ items: [], isLoading: false });
        }
    }

    /**
     * Renders the <ProjectResources /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return (
                <Spinner
                    type={SpinnerType.large}
                    label={__.getResource("DeliveriesOverview_LoadingText")} />
            );
        }

        return (
            <List
                items={this.state.items}
                columns={this.props.columns}
                showCommandBar={true}
                groupByOptions={this.props.groupByOptions}
                excelExportEnabled={this.props.excelExportEnabled}
                excelExportConfig={this.props.excelExportConfig} />
        );
    }

    /**
     * Fetch items
     */
    protected async _fetchItems() {
        const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
        const [dataSource] = await dataSourcesList.items.filter(`Title eq '${this.props.dataSourceName}'`).get();
        let queryTemplate = (this.props.dataSource === DataSource.SearchCustom && this.props.queryTemplate) ? this.props.queryTemplate : "";
        if (dataSource) {
            queryTemplate = dataSource.GtDpSearchQuery;
        }
        if (queryTemplate !== "") {
            return this._search(queryTemplate);
        } else {
            return [];
        }
    }

    private async _search(queryTemplate: string) {
        try {
            const { PrimarySearchResults } = await sp.search({
                Querytext: "*",
                QueryTemplate: queryTemplate,
                RowLimit: 500,
                TrimDuplicates: false,
                SelectProperties: ["Path", "SPWebUrl", ...this.props.columns.map(col => col.key)],
            });
            return PrimarySearchResults.map(r => new DeliveryElement(r));
        } catch (err) {
            throw err;
        }
    }
}

export {
    IDeliveriesOverviewProps,
    IDeliveriesOverviewState,
};
