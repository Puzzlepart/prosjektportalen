import { IBaseWebPartState } from "../@BaseWebPart";
import IDynamicPortfolioViewConfig from "../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import { ProjectStatsChartData } from "./ProjectStatsChart";
import ChartConfiguration from "./ChartConfiguration";
import { IContentType } from "../../Model";

export default interface IProjectStatsState extends IBaseWebPartState {
    charts?: ChartConfiguration[];
    data?: ProjectStatsChartData;
    contentTypes?: IContentType[];
    views?: IDynamicPortfolioViewConfig[];
    selectedView?: IDynamicPortfolioViewConfig;
    selection?: ProjectStatsChartData;
    errorMessage?: any;
}
