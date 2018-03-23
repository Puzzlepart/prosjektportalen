import { ProjectStatsChartDataItem } from "../ProjectStatsChart";

export default interface IProjectStatsDataSelectionState {
    isExpanded: boolean;
    selection: ProjectStatsChartDataItem[];
}
