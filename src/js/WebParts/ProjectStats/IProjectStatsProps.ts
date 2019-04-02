import { IBaseWebPartProps } from "../@BaseWebPart";
import __ from "../../Resources";

export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName?: string;
    chartsConfigListName?: string;
    showChartSettings?: boolean;
    queryTemplate?: string;
    renderCommandBar?: boolean;
}

export const ProjectStatsDefaultProps: Partial<IProjectStatsProps> = {
    showChartSettings: true,
    renderCommandBar: true,
    statsFieldsListName: __.getResource("Lists_StatsFieldsConfig_Title"),
    chartsConfigListName: __.getResource("Lists_ChartsConfig_Title"),
};

