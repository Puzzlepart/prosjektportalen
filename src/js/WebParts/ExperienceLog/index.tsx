import * as React from "react";
import __ from "../../Resources";
import pnp, { Site } from "sp-pnp-js";
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
     * Renders the <ProjectResources /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
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
        const [dataSource] = await dataSourcesList.items.filter(`Title eq '${this.props.dataSource}'`).get();
        if (dataSource) {
            try {
                const { PrimarySearchResults } = await pnp.sp.search({
                    Querytext: "*",
                    QueryTemplate: dataSource.GtDpSearchQuery,
                    RowLimit: 500,
                    TrimDuplicates: false,
                    SelectProperties: ["Path", "SPWebUrl", ...this.props.columns.map(col => col.key)],
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
