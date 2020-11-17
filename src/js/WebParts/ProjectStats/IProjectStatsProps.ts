import { IBaseWebPartProps } from '../@BaseWebPart'
import __ from '../../Resources'

export default interface IProjectStatsProps extends IBaseWebPartProps {
    newFormUrl?: string;
    viewSelectorEnabled: boolean;
    statsFieldsListName?: string;
    chartsConfigListName?: string;
    showChartSettings?: boolean;
    queryTemplate?: string;
    renderCommandBar?: boolean;
}

export const ProjectStatsDefaultProps: Partial<IProjectStatsProps> = {
    newFormUrl: `${_spPageContextInfo.siteAbsoluteUrl}/Lists/ChartsConfig/NewForm.aspx`,
    showChartSettings: true,
    renderCommandBar: true,
    statsFieldsListName: __.getResource('Lists_StatsFieldsConfig_Title'),
    chartsConfigListName: __.getResource('Lists_ChartsConfig_Title'),
}

