import { IBaseWebPartProps } from "../@BaseWebPart";
import DataSource from "../DataSource";
export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName: string;
    chartsConfigListName: string;
    showChartSettings?: boolean;
    dataSource?: DataSource;
}
export declare const ProjectStatsDefaultProps: Partial<IProjectStatsProps>;
