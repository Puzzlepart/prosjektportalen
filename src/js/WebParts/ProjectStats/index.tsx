import * as React from "react";
import __ from "../../Resources";
import { SortAlphabetically } from "../../Util";
import * as DynamicPortfolioConfiguration from "../DynamicPortfolio/DynamicPortfolioConfiguration";
import IDynamicPortfolioViewConfig from "../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import { sp } from "@pnp/sp";
import { LogLevel, Logger } from "@pnp/logging";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import IProjectStatsProps, { ProjectStatsDefaultProps } from "./IProjectStatsProps";
import IProjectStatsState from "./IProjectStatsState";
import Project from "./Project";
import ChartConfiguration from "./ChartConfiguration";
import StatsFieldConfiguration from "./StatsFieldConfiguration";
import { IContentType } from "../../Model";
import ProjectStatsChart, { ProjectStatsChartData } from "./ProjectStatsChart";
import ProjectStatsDataSelection from "./ProjectStatsDataSelection";
import ProjectStatsConfiguration from "./ProjectStatsConfiguration";
import BaseWebPart from "../@BaseWebPart";
import Preferences from "../../Preferences";

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
            const config = await this._fetchData();
            Logger.log({
                message: String.format(LOG_TEMPLATE, "componentDidMount", `Successfully fetched chart config for ${config.charts.length} charts.`),
                level: LogLevel.Info,
            });
            this.setState({
                ...config,
                isLoading: false,
            });
        } catch (err) {
            console.log(err);
            Logger.log({
                message: String.format(LOG_TEMPLATE, "componentDidMount", "Failed to fetch data."),
                data: err,
                level: LogLevel.Error,
            });
            this.setState({ errorMessage: err, isLoading: false });
        }
    }

    /**
     * Renders the <ProjectStats /> component
     */
    public render(): React.ReactElement<IProjectStatsProps> {
        const { isLoading, errorMessage, data } = this.state;
        if (isLoading) {
            return <Spinner label={__.getResource("String_Projectstats_Loading_Text")} type={SpinnerType.large} />;
        }
        if (errorMessage) {
            return <MessageBar messageBarType={MessageBarType.error}>{__.getResource("String_Projectstats_Error_Text")}</MessageBar>;
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
                    <ProjectStatsConfiguration contentTypes={this.state.contentTypes} />
                </div>
                <div className="ms-Grid-row">
                    {this._renderInner()}
                </div>
            </div>
        );
    }

    /**
     * Render inner
     */
    private _renderInner() {
        const { charts, data } = this.state;
        if (charts.length === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{__.getResource("String_Projectstats_No_Charts_Text")}</MessageBar>;
        }
        if (data.getCount() === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{__.getResource("String_Projectstats_No_Data_Text")}</MessageBar>;
        }
        return charts
            .sort((a, b) => a.order - b.order)
            .map((c, i) => <ProjectStatsChart key={i} chart={c} />);
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
            charts: this.state.charts.map(c => c.initOrUpdate(data)),
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
                const { data } = await this._fetchData(view);
                this.setState({
                    isLoading: false,
                    selectedView: view,
                    data,
                    charts: this.state.charts.map(c => c.initOrUpdate(data)),
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
     * Fetch data
     *
     * @param {IDynamicPortfolioViewConfig} view View
     */
    private async _fetchData(view?: IDynamicPortfolioViewConfig): Promise<Partial<IProjectStatsState>> {
        const fieldPrefix = Preferences.getParameter("ProjectStatsFieldPrefix");
        const statsFieldsList = sp.web.lists.getByTitle(__.getResource("Lists_StatsFieldsConfig_Title"));
        const chartsConfigList = sp.web.lists.getByTitle(__.getResource("Lists_ChartsConfig_Title"));
        try {
            const [{ views }, fieldsSpItems, chartsSpItems, chartsConfigListContentTypes, statsFieldsListContenTypes] = await Promise.all([
                DynamicPortfolioConfiguration.getConfig(),
                statsFieldsList.items.select("ID", "Title", `${fieldPrefix}ManagedPropertyName`, `${fieldPrefix}DataType`).usingCaching().get(),
                chartsConfigList.items.usingCaching().get(),
                chartsConfigList.contentTypes.usingCaching().get(),
                statsFieldsList.contentTypes.usingCaching().get(),
            ]);
            const contentTypes: IContentType[] = [...chartsConfigListContentTypes, ...statsFieldsListContenTypes];
            if (!view) {
                [view] = views.filter(v => v.default);
                if (!view) {
                    view = views[0];
                    Logger.log({
                        message: String.format(LOG_TEMPLATE, "_fetchData", `No default view found. Using ${view.name}.`),
                        level: LogLevel.Info,
                    });
                }
            }
            Logger.log({
                message: String.format(LOG_TEMPLATE, "_fetchData", `Fetching view ${view.name}.`),
                data: { queryTemplate: view.queryTemplate },
                level: LogLevel.Info,
            });

            const fields = fieldsSpItems.map(i => new StatsFieldConfiguration(i.ID, i.Title, i[`${fieldPrefix}ManagedPropertyName`], i[`${fieldPrefix}DataType`]));
            const response = await sp.search({
                Querytext: "*",
                QueryTemplate: view.queryTemplate,
                RowLimit: 500,
                TrimDuplicates: false,
                SelectProperties: ["Title", "Path", ...fields.map(f => f.managedPropertyName)],
            });
            const items = response.PrimarySearchResults
                .map(searchRes => new Project(searchRes))
                .sort((a, b) => SortAlphabetically(a, b, "name"));
            const data = new ProjectStatsChartData(items);
            const charts = chartsSpItems.map(spItem => {
                let chartFields = fields.filter(f => spItem[`${fieldPrefix}FieldsId`].results.indexOf(f.id) !== -1);
                return new ChartConfiguration(spItem, chartsConfigList, chartsConfigListContentTypes).initOrUpdate(data, chartFields);
            });
            const config: Partial<IProjectStatsState> = {
                charts,
                data,
                views,
                contentTypes,
                selectedView: view,
            };
            return config;
        } catch (err) {
            throw err;
        }
    }
}

export { IProjectStatsProps, IProjectStatsState };
