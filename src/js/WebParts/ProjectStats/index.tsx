import * as React from "react";
import { SortAlphabetically } from "../../Util";
import * as DynamicPortfolioConfiguration from "../DynamicPortfolio/DynamicPortfolioConfiguration";
import IDynamicPortfolioViewConfig from "../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import { sp, LogLevel, Logger } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import IProjectStatsProps, { ProjectStatsDefaultProps } from "./IProjectStatsProps";
import IProjectStatsState from "./IProjectStatsState";
import Project from "./Project";
import Chart from "./Chart";
import StatsField from "./StatsField";
import ProjectStatsChart, { ProjectStatsChartData } from "./ProjectStatsChart";
import ProjectStatsDataSelection from "./ProjectStatsDataSelection";
import BaseWebPart from "../@BaseWebPart";
import * as strings from "./strings";

const LOG_TEMPLATE = "(ProjectStats) {0}: {1}";

/**
 * ProjectStats
 */
export default class ProjectStats extends BaseWebPart<IProjectStatsProps, IProjectStatsState> {
    public static displayName = "ProjectStats";
    public static defaultProps = ProjectStatsDefaultProps;

    /**
     * Constructor
     *
     * @param {IProjectStatsProps} props Props
     */
    constructor(props: IProjectStatsProps) {
        super(props, { isLoading: true });
        this._onDataSelectionUpdated = this._onDataSelectionUpdated.bind(this);
        this._onViewChanged = this._onViewChanged.bind(this);
    }

    public async componentDidMount() {
        try {
            const config = await this.fetchChartConfig();

            Logger.log({
                message: String.format(LOG_TEMPLATE, "componentDidMount", `Successfully fetched chart config for ${config.charts.length} charts.`),
                level: LogLevel.Info,
            });
            this.setState({
                ...config,
                isLoading: false,
            });
        } catch (errorMessage) {
            Logger.log({
                message: String.format(LOG_TEMPLATE, "componentDidMount", "Failed to fetch data."),
                data: errorMessage,
                level: LogLevel.Error,
            });
            this.setState({ errorMessage, isLoading: false });
        }
    }

    /**
     * Renders the <ProjectStats /> component
     */
    public render(): JSX.Element {
        const { isLoading, errorMessage, charts, data } = this.state;
        if (isLoading) {
            return <Spinner label={strings.PROJECTSTATS_LOADING_TEXT} type={SpinnerType.large} />;
        }
        if (errorMessage) {
            return <MessageBar messageBarType={MessageBarType.error}>{strings.PROJECTSTATS_ERROR_TEXT}</MessageBar>;
        }
        if (charts.length === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{strings.PROJECTSTATS_NO_CHARTS_TEXT}</MessageBar>;
        }
        Logger.log({
            message: String.format(LOG_TEMPLATE, "render", "Rendering component <ProjectStats />."),
            level: LogLevel.Info,
        });
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row" style={{ marginBottom: 25 }}>
                    <ProjectStatsDataSelection
                        data={data}
                        views={this.state.views}
                        selectedView={this.state.selectedView}
                        onUpdateSelection={this._onDataSelectionUpdated}
                        onViewChanged={this._onViewChanged} />
                </div>
                <div className="ms-Grid-row">
                    {data.getCount() === 0
                        ? <MessageBar messageBarType={MessageBarType.info}>{strings.PROJECTSTATS_NO_DATA_TEXT}</MessageBar>
                        : charts
                            .sort((a, b) => a.order - b.order)
                            .map((c, i) => <ProjectStatsChart key={i} chart={c} />)}
                </div>
            </div>
        );
    }

    /**
     * On data selection updated
     */
    private async _onDataSelectionUpdated(data: ProjectStatsChartData): Promise<void> {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "_onDataSelectionUpdated", "Selection was updated."),
            level: LogLevel.Info,
        });
        this.setState({
            charts: this.state.charts.map(c => c.set(data)),
        });
    }

    /**
     * On view changed
     */
    private async _onViewChanged(view: IDynamicPortfolioViewConfig): Promise<void> {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "_onViewChanged", "View was updated."),
            data: { view },
            level: LogLevel.Info,
        });
        this.setState({ isLoading: true }, async () => {
            try {
                const { data } = await this.fetchChartConfig(view);
                this.setState({
                    isLoading: false,
                    selectedView: view,
                    data,
                    charts: this.state.charts.map(c => c.set(data)),
                });
            } catch (errorMessage) {
                Logger.log({
                    message: String.format(LOG_TEMPLATE, "_onViewChanged", "Failed to fetch data."),
                    data: errorMessage,
                    level: LogLevel.Error,
                });
                this.setState({ errorMessage, isLoading: false });
            }
        });
    }

    /**
     * Fetch chart config
     */
    private async fetchChartConfig(view?: IDynamicPortfolioViewConfig): Promise<Partial<IProjectStatsState>> {
        try {
            const statsFieldsList = sp.web.lists.getByTitle(this.props.statsFieldsListName);
            const chartsConfigList = sp.web.lists.getByTitle(this.props.chartsConfigListName);
            const [{ views }, fieldsSpItems, chartsSpItems] = await Promise.all([
                DynamicPortfolioConfiguration.getConfig(),
                statsFieldsList.items.select("ID", "Title", "PzlChManagedPropertyName", "PzlChDataType").get(),
                chartsConfigList.items.get(),
            ]);
            if (!view) {
                [view] = views.filter(v => v.default);
                if (!view) {
                    Logger.log({
                        message: String.format(LOG_TEMPLATE, "fetchChartConfig", `No default view found. Using ${views[0].name}.`),
                        level: LogLevel.Info,
                    });
                    view = views[0];
                }
            }
            Logger.log({
                message: String.format(LOG_TEMPLATE, "fetchChartConfig", `Fetching view ${view.name}.`),
                data: { queryTemplate: view.queryTemplate },
                level: LogLevel.Info,
            });

            const fields = fieldsSpItems.map(i => new StatsField(i.ID, i.Title, i.PzlChManagedPropertyName, i.PzlChDataType));
            const response = await sp.search({
                Querytext: "*",
                QueryTemplate: view.queryTemplate,
                RowLimit: 500,
                TrimDuplicates: false,
                SelectProperties: fields.map(f => f.managedPropertyName),
            });
            const items = response.PrimarySearchResults
                .map(searchRes => new Project(searchRes))
                .sort((a, b) => SortAlphabetically(a, b, "name"));
            const data = new ProjectStatsChartData(items);
            const charts = chartsSpItems.map(spItem => {
                return new Chart(spItem, chartsConfigList).set(data, fields.filter(f => spItem.PzlChFieldsId.results.indexOf(f.id) !== -1));
            });
            return {
                charts,
                data,
                views,
                selectedView: view,
            };
        } catch (err) {
            throw err;
        }
    }
}

export { IProjectStatsProps, IProjectStatsState };
