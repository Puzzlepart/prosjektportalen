import IDynamicPortfolioViewConfig from "../../DynamicPortfolio/DynamicPortfolioConfiguration/IDynamicPortfolioViewConfig";
import { ProjectStatsChartData } from "../ProjectStatsChart";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export default interface IProjectStatsDataSelectionProps {
    data: ProjectStatsChartData;
    views: IDynamicPortfolioViewConfig[];
    selectedView: IDynamicPortfolioViewConfig;
    columns?: IColumn[];
    onUpdateSelection: (data: ProjectStatsChartData) => Promise<void>;
    onViewChanged: (view: IDynamicPortfolioViewConfig) => Promise<void>;
}