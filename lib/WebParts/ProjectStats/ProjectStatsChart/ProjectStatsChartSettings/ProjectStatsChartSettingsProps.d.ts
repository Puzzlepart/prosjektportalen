/// <reference types="react" />
import ProjectStatsChartDataItem from "../ProjectStatsChartDataItem";
import ChartConfiguration from "../../ChartConfiguration";
export default interface ProjectStatsChartSettingsProps extends React.HTMLProps<HTMLDivElement> {
    chart: ChartConfiguration;
    listServerRelativeUrl: string;
    showCommandBar?: boolean;
    onItemChanged: (item: ProjectStatsChartDataItem) => void;
    onWidthChanged: (event: React.MouseEvent<any>) => void;
}
export declare const ProjectStatsChartSettingsDefaultProps: {
    showCommandBar: boolean;
};
