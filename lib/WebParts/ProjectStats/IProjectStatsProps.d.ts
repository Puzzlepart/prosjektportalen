import { IBaseWebPartProps } from "../@BaseWebPart";
import DataSource from "../DataSource";
import { Web } from "@pnp/sp";
export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName: string;
    chartsConfigListName: string;
    showChartSettings?: boolean;
    dataSource?: DataSource;
    rootWeb?: Web;
}
export declare const ProjectStatsDefaultProps: Partial<IProjectStatsProps>;
