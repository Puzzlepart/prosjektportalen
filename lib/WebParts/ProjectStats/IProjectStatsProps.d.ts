import { IBaseWebPartProps } from "../@BaseWebPart";
import { Web } from "@pnp/sp";
export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName?: string;
    chartsConfigListName?: string;
    showChartSettings?: boolean;
    queryTemplate?: string;
    rootWeb?: Web;
    renderCommandBar?: boolean;
}
export declare const ProjectStatsDefaultProps: Partial<IProjectStatsProps>;
