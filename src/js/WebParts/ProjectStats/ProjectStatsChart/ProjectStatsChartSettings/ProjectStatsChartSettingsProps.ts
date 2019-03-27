import ProjectStatsChartDataItem from "../ProjectStatsChartDataItem";
import ChartConfiguration from "../../ChartConfiguration";

export default interface ProjectStatsChartSettingsProps extends React.HTMLProps<HTMLDivElement> {
    chart: ChartConfiguration;
    listServerRelativeUrl: string;
    renderCommandBar?: boolean;
    onItemChanged: (item: ProjectStatsChartDataItem) => void;
    onWidthChanged: (event: React.MouseEvent<any>) => void;
}
