import { IBaseWebPartProps } from "../@BaseWebPart";
import __ from "../../Resources";
import { Web } from "@pnp/sp";

export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName?: string;
    chartsConfigListName?: string;
    showChartSettings?: boolean;
    useProgramEditForm?: boolean;
    queryTemplate?: string;
    rootWeb?: Web;
    renderCommandBar?: boolean;
}

export const ProjectStatsDefaultProps: Partial<IProjectStatsProps> = {
    showChartSettings: true,
    renderCommandBar: true,
    useProgramEditForm: false,
    statsFieldsListName: __.getResource("Lists_StatsFieldsConfig_Title"),
    chartsConfigListName: __.getResource("Lists_ChartsConfig_Title"),
};

