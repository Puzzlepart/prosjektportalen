import { IBaseWebPartProps } from "../@BaseWebPart";
import __ from "../../Resources";
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

export const ProjectStatsDefaultProps: Partial<IProjectStatsProps> = {
    showChartSettings: true,
    renderCommandBar: true,
    statsFieldsListName: __.getResource("Lists_StatsFieldsConfig_Title"),
    chartsConfigListName: __.getResource("Lists_ChartsConfig_Title"),
};

