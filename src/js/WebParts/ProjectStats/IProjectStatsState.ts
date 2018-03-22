import { IBaseWebPartState } from "../@BaseWebPart";
import IDynamicPortfolioViewConfig from "../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import { ProjectStatsChartData } from "./ProjectStatsChart";
import ChartConfiguration from "./ChartConfiguration";

export default interface IProjectStatsState extends IBaseWebPartState {
    charts?: ChartConfiguration[];
    data?: ProjectStatsChartData;
    contentTypes?: any[];
    views?: IDynamicPortfolioViewConfig[];
    selectedView?: IDynamicPortfolioViewConfig;
    selection?: ProjectStatsChartData;
    errorMessage?: any;
}
