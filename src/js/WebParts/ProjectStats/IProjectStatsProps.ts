import { IBaseWebPartProps } from "../@BaseWebPart";
import __ from "../../Resources";
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

export const ProjectStatsDefaultProps: Partial<IProjectStatsProps> = {
    showChartSettings: true,
    statsFieldsListName: __.getResource("Lists_StatsFieldsConfig_Title"),
    chartsConfigListName: __.getResource("Lists_ChartsConfig_Title"),
};

