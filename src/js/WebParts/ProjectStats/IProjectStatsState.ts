import { IBaseWebPartState } from "../@BaseWebPart";
import IDynamicPortfolioViewConfig from "../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import { ProjectStatsChartData } from "./ProjectStatsChart";
import Chart from "./Chart";

export default interface IProjectStatsState extends IBaseWebPartState {
    charts?: Chart[];
    data?: ProjectStatsChartData;
    views?: IDynamicPortfolioViewConfig[];
    selectedView?: IDynamicPortfolioViewConfig;
    selection?: ProjectStatsChartData;
    errorMessage?: any;
}
