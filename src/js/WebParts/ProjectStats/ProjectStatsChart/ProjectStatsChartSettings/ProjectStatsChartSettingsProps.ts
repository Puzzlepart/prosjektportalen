import ProjectStatsChartDataItem from "../ProjectStatsChartDataItem";
import Chart from "../../Chart";

export default interface ProjectStatsChartSettingsProps {
    chart: Chart;
    onItemChanged: (item: ProjectStatsChartDataItem) => void;
    onWidthChanged: (event: React.MouseEvent<any>) => void;
};
