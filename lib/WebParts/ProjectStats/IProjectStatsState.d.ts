import { IBaseWebPartState } from "../@BaseWebPart";
import IDynamicPortfolioViewConfig from "../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import { ProjectStatsChartData } from "./ProjectStatsChart";
import ChartConfiguration from "./ChartConfiguration";
import { IContentType } from "../../Model";
export default interface IProjectStatsState extends IBaseWebPartState {
    showChartSettings?: boolean;
    charts?: ChartConfiguration[];
    data?: ProjectStatsChartData;
    contentTypes?: IContentType[];
    views?: IDynamicPortfolioViewConfig[];
    currentView?: IDynamicPortfolioViewConfig;
    selection?: ProjectStatsChartData;
    chartsConfigListProperties?: {
        RootFolder: {
            ServerRelativeUrl: string;
        };
    };
    errorMessage?: any;
    showDataSelectionModal?: boolean;
}
