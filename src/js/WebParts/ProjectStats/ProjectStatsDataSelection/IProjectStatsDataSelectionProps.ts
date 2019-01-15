import { ProjectStatsChartData } from "../ProjectStatsChart";
import { IModalProps } from "office-ui-fabric-react/lib/Modal";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export default interface IProjectStatsDataSelectionProps extends IModalProps {
    data: ProjectStatsChartData;
    columns?: IColumn[];
    onUpdateSelection: (data: ProjectStatsChartData) => Promise<void>;
}
