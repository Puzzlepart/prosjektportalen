import { Site } from "@pnp/sp";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";
import SearchService from "../../Services/SearchService";
import __ from "../../Resources";
import BaseWebPart from "../@BaseWebPart";
import List from "../@Components/List";
import DeliveryElement from "./DeliveryElement";
import IDeliveriesOverviewProps, { DeliveriesOverviewDefaultProps } from "./IDeliveriesOverviewProps";
import IDeliveriesOverviewState from "./IDeliveriesOverviewState";

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
        let queryTemplate;
        if (this.props.queryTemplate) {
            queryTemplate = this.props.queryTemplate;
        } else {
            const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
            const [dataSource] = await dataSourcesList.items.filter(`Title eq '${this.props.dataSourceName}'`).get();
            queryTemplate = dataSource.GtDpSearchQuery;
        }
        if (queryTemplate) {
            return this._search(queryTemplate);
        } else {
            return [];
        }
    }

    private async _search(queryTemplate: string) {
        try {
            const { items } = await SearchService.search<any[]>({
                Querytext: "*",
                QueryTemplate: queryTemplate,
                RowLimit: 500,
                TrimDuplicates: false,
                SelectProperties: ["Path", "SPWebUrl", ...this.props.columns.map(col => col.key)],
            });
            return items.map(r => new DeliveryElement(r));
        } catch (err) {
            throw err;
        }
    }
}

export { IDeliveriesOverviewProps, IDeliveriesOverviewState };

