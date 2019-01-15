import * as React from "react";
import __ from "../../Resources";
import { sp, Site } from "@pnp/sp";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import IExperienceLogProps, { ExperienceLogDefaultProps } from "./IExperienceLogProps";
import IExperienceLogState from "./IExperienceLogState";
import BaseWebPart from "../@BaseWebPart";
import List from "../@Components/List";
import LogElement from "./LogElement";

/**
 * Experience Log
 */
export default class ExperienceLog extends BaseWebPart<IExperienceLogProps, IExperienceLogState> {
    public static displayName = "ExperienceLog";
    public static defaultProps = ExperienceLogDefaultProps;

    /**
     * Constructor
     *
     * @param {IExperienceLogProps} props Props
     */
    constructor(props: IExperienceLogProps) {
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
     * Renders the <ExperienceLog /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return (
                <Spinner
                    type={SpinnerType.large}
                    label={__.getResource("ExperienceLog_LoadingText")} />
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
        let queryTemplate: string;

        if (this.props.queryTemplate) {
            queryTemplate = this.props.queryTemplate;
        } else if (this.props.dataSource) {
            const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
            const [dataSource] = await dataSourcesList.items.filter(`Title eq '${this.props.dataSource}'`).get();
            queryTemplate = dataSource.GtDpSearchQuery;
        }

        if (queryTemplate) {
            try {
                const selectProperties = ["Path", "SPWebUrl", ...this.props.columns.map(col => col.key)];
                const { PrimarySearchResults } = await sp.search({
                    Querytext: "*",
                    QueryTemplate: queryTemplate,
                    RowLimit: 500,
                    TrimDuplicates: false,
                    SelectProperties: selectProperties,
                });
                return PrimarySearchResults.map(r => new LogElement(r));
            } catch (err) {
                throw err;
            }
        } else {
            return [];
        }
    }
}

export {
    IExperienceLogProps,
    IExperienceLogState,
};
