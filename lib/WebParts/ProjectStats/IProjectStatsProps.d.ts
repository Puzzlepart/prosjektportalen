import { IBaseWebPartProps } from "../@BaseWebPart";
import DataSource from "../DataSource";
import { Web } from "@pnp/sp";
export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName?: string;
    chartsConfigListName?: string;
    showChartSettings?: boolean;
    useProgramEditForm?: boolean;
    dataSource?: DataSource;
    rootWeb?: Web;
    renderCommandBar?: boolean;
}
export declare const ProjectStatsDefaultProps: Partial<IProjectStatsProps>;
