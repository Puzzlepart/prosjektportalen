import { Logger, LogLevel } from "@pnp/logging";
import { List, Web } from "@pnp/sp";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType, IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { IContentType } from "../../Model";
import __ from "../../Resources";
import SearchService from "../../Services/SearchService";
import { getUrlHash, setUrlHash, SortAlphabetically } from "../../Util";
import BaseWebPart from "../@BaseWebPart";
import * as DynamicPortfolioConfiguration from "../DynamicPortfolio/DynamicPortfolioConfiguration";
import IDynamicPortfolioViewConfig from "../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import ChartConfiguration from "./ChartConfiguration";
import IProjectStatsProps, { ProjectStatsDefaultProps } from "./IProjectStatsProps";
import IProjectStatsState from "./IProjectStatsState";
import Project from "./Project";
import ProjectStatsChart, { ProjectStatsChartData } from "./ProjectStatsChart";
import ProjectStatsDataSelection from "./ProjectStatsDataSelection";
import StatsFieldConfiguration from "./StatsFieldConfiguration";

const LOG_TEMPLATE = "(ProjectStats) {0}: {1}";

/**
 * ProjectStats
 */
export default class ProjectStats extends BaseWebPart<IProjectStatsProps, IProjectStatsState> {
    public static displayName = "ProjectStats";
    public static defaultProps = ProjectStatsDefaultProps;
    private statsFieldsList: List;
    private chartsConfigList: List;

    /**
     * Constructor
     *
     * @param {IProjectStatsProps} props Props
     */
    constructor(props: IProjectStatsProps) {
        super(props, { isLoading: true, showChartSettings: props.showChartSettings });
        const web = new Web(_spPageContextInfo.siteAbsoluteUrl);
        this.statsFieldsList = web.lists.getByTitle(this.props.statsFieldsListName);
        this.chartsConfigList = web.lists.getByTitle(this.props.chartsConfigListName);
    }

    public async componentDidMount() {
        try {
            const config = await this.fetchData();
            Logger.log({ message: String.format(LOG_TEMPLATE, "componentDidMount", `Successfully fetched chart config for ${config.charts.length} charts.`), level: LogLevel.Info });
            this.setState({ ...config, isLoading: false });
            if (this.props.viewSelectorEnabled) {
                setUrlHash({ viewId: this.state.currentView.id.toString() });
            }
        } catch (err) {
            console.log(err);
            Logger.log({ message: String.format(LOG_TEMPLATE, "componentDidMount", "Failed to fetch data."), level: LogLevel.Error });
            this.setState({ errorMessage: err, isLoading: false });
        }
    }

    /**
     * Renders the <ProjectStats /> component
     */
    public render(): React.ReactElement<IProjectStatsProps> {
        const { isLoading, errorMessage, data } = this.state;
        if (isLoading) {
            return <Spinner label={__.getResource("String_ProjectStats_Loading_Text")} type={SpinnerType.large} />;
        }
        if (errorMessage) {
            return <MessageBar messageBarType={MessageBarType.error}>{__.getResource("String_ProjectStats_Error_Text")}</MessageBar>;
        }
        Logger.log({ message: String.format(LOG_TEMPLATE, "render", "Rendering component <ProjectStats />."), level: LogLevel.Info });
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    {this.props.renderCommandBar &&
                        this.renderCommandBar()}
                </div>
                <div className="ms-Grid-row">
                    {this.renderInner()}
                </div>
                {this.state.showDataSelectionModal && (
                    <ProjectStatsDataSelection
                        data={data}
                        onUpdateSelection={this.onDataSelectionUpdated}
                        onDismiss={_ => this.setState({ showDataSelectionModal: false })} />
                )}
            </div>
        );
    }

    /**
    * Renders the command bar from office-ui-fabric-react
    */
    private renderCommandBar() {
        const items: IContextualMenuItem[] = [];
        const farItems: IContextualMenuItem[] = [];

        items.push({
            key: "NewItem",
            name: __.getResource("String_New"),
            iconProps: { iconName: "Add" },
            itemType: ContextualMenuItemType.Header,
            onClick: e => e.preventDefault(),
            subMenuProps: {
                items: this.state.contentTypes.map(({ Name, StringId, NewFormUrl }) => ({
                    key: `ContentType_${StringId}`,
                    name: Name,
                    onClick: (e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        let contentTypeNewFormUrl = `${NewFormUrl}?ContentTypeId=${StringId}&Source=${encodeURIComponent(_spPageContextInfo.serverRequestPath)}`;
                        document.location.href = contentTypeNewFormUrl;
                    },
                })),
            },
        });

        farItems.push({
            key: "ShowChartSettings",
            name: __.getResource("String_ProjectStats_ShowChartSettings_Text"),
            iconProps: { iconName: "ContactCardSettings" },
            checked: this.state.showChartSettings,
            canCheck: true,
            onClick: (e: any) => {
                e.preventDefault();
                this.setState({ showChartSettings: !this.state.showChartSettings });
            },
        });

        farItems.push({
            key: "EditDataSelection",
            name: __.getResource("String_ProjectStats_EditDataSelection_Text"),
            iconProps: { iconName: "ExploreData" },
            onClick: (e: any) => {
                e.preventDefault();
                this.setState({ showDataSelectionModal: true });
            },
        });

        if (this.props.viewSelectorEnabled) {
            farItems.push({
                key: "View",
                name: this.state.currentView.name,
                iconProps: { iconName: "List" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: this.state.views.map((qc, idx) => ({
                        key: `View_${idx.toString()}`,
                        name: qc.name,
                        iconProps: { iconName: qc.iconName },
                        onClick: (e: any) => {
                            e.preventDefault();
                            this.onViewChanged(qc);
                        },
                    })),
                },
            });
        }

        return (
            <div className="ms-Grid-col ms-sm12">
                <CommandBar items={items} farItems={farItems} />
            </div>
        );
    }

    /**
     * Render inner
     */
    private renderInner() {
        const { charts, data } = this.state;
        if (charts.length === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{__.getResource("String_ProjectStats_No_Charts_Text")}</MessageBar>;
        }
        if (data.getCount() === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{__.getResource("String_ProjectStats_No_Data_Text")}</MessageBar>;
        }
        return charts
            .sort((a, b) => a.order - b.order)
            .map((chart, idx) => (
                <ProjectStatsChart
                    key={idx}
                    chart={chart}
                    showSettings={this.state.showChartSettings}
                    renderCommandBar={this.props.renderCommandBar}
                    listServerRelativeUrl={this.state.chartsConfigListProperties.RootFolder.ServerRelativeUrl} />
            ));
    }

    /**
     * On data selection updated
     *
     * @param {ProjectStatsChartData} data Data
     */
    @autobind
    private async onDataSelectionUpdated(data: ProjectStatsChartData): Promise<void> {
        Logger.log({ message: String.format(LOG_TEMPLATE, "_onDataSelectionUpdated", "Selection was updated."), level: LogLevel.Info });
        this.setState({ showDataSelectionModal: false, charts: this.state.charts.map(c => c.initOrUpdate(data)) });
    }

    /**
     * On view changed
     *
     * @param {IDynamicPortfolioViewConfig} view View
     */
    @autobind
    private async onViewChanged(view: IDynamicPortfolioViewConfig): Promise<void> {
        Logger.log({ message: String.format(LOG_TEMPLATE, "_onViewChanged", "View was updated."), data: { view }, level: LogLevel.Info });
        this.setState({ isLoading: true });
        try {
            const { data } = await this.fetchData(view);
            const charts = this.state.charts.map(c => c.initOrUpdate(data));
            this.setState({ isLoading: false, currentView: view, data, charts });
            setUrlHash({ viewId: view.id.toString() });
        } catch (errorMessage) {
            Logger.log({ message: String.format(LOG_TEMPLATE, "_onViewChanged", "Failed to fetch data."), data: errorMessage, level: LogLevel.Error });
            this.setState({ errorMessage, isLoading: false });
        }
    }

    /**
     * Fetch data
     *
     * @param {IDynamicPortfolioViewConfig} view View
     */
    private async fetchData(view?: IDynamicPortfolioViewConfig): Promise<Partial<IProjectStatsState>> {
        let hashState = getUrlHash();
        try {
            const [{ views }, fieldsSpItems, chartsSpItems, chartsConfigListProperties, chartsConfigListContentTypes, statsFieldsListContenTypes] = await Promise.all([
                DynamicPortfolioConfiguration.getConfig(),
                this.statsFieldsList.items.select("ID", "Title", "GtChrManagedPropertyName", "GtChrDataType").usingCaching().get(),
                this.chartsConfigList.items.usingCaching().get(),
                this.chartsConfigList.select("RootFolder/ServerRelativeUrl").expand("RootFolder").usingCaching().get(),
                this.chartsConfigList.contentTypes.usingCaching().get(),
                this.statsFieldsList.contentTypes.usingCaching().get(),
            ]);
            const contentTypes: IContentType[] = [...chartsConfigListContentTypes, ...statsFieldsListContenTypes];
            let currentView = view;
            if (!currentView) {
                let viewIdUrlParam = GetUrlKeyValue("viewId");
                if (viewIdUrlParam && viewIdUrlParam !== "") {
                    [currentView] = views.filter(qc => qc.id === parseInt(viewIdUrlParam, 10));
                } else if (hashState.viewId) {
                    [currentView] = views.filter(qc => qc.id === parseInt(hashState.viewId, 10));
                } else {
                    [currentView] = views.filter(v => v.default);
                    if (!currentView) {
                        currentView = views[0];
                        Logger.log({ message: String.format(LOG_TEMPLATE, "fetchData", `No default view found. Using ${currentView.name}.`), level: LogLevel.Info });
                    }
                }
            }
            Logger.log({ message: String.format(LOG_TEMPLATE, "fetchData", `Fetching view ${currentView.name}.`), data: { queryTemplate: currentView.queryTemplate }, level: LogLevel.Info });

            const fields = fieldsSpItems.map(i => new StatsFieldConfiguration(i.ID, i.Title, i[`GtChrManagedPropertyName`], i[`GtChrDataType`]));

            const queryTemplate = this.props.viewSelectorEnabled ? currentView.queryTemplate : this.props.queryTemplate;

            let { items } = await SearchService.search<any[]>({
                Querytext: "*",
                QueryTemplate: queryTemplate,
                RowLimit: 500,
                TrimDuplicates: false,
                SelectProperties: ["Title", "Path", "SiteTitle", ...fields.map(f => f.managedPropertyName)],
            });
            items = items
                .map(searchRes => new Project(searchRes))
                .sort((a, b) => SortAlphabetically(a, b, "name"));
            const data = new ProjectStatsChartData(items);
            const charts = chartsSpItems.map(spItem => {
                let chartFields = fields.filter(f => spItem[`GtChrFieldsId`].results.indexOf(f.id) !== -1);
                return new ChartConfiguration(spItem, this.chartsConfigList, chartsConfigListContentTypes).initOrUpdate(data, chartFields);
            });
            const config: Partial<IProjectStatsState> = { charts, data, views, contentTypes, currentView, chartsConfigListProperties };
            return config;
        } catch (err) {
            throw err;
        }
    }

}

export { IProjectStatsProps, IProjectStatsState };

