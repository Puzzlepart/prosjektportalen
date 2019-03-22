import { IBaseWebPartProps } from "../@BaseWebPart";
export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName: string;
    chartsConfigListName: string;
    showChartSettings?: boolean;
    projectRoot?: string;
}
export declare const ProjectStatsDefaultProps: Partial<IProjectStatsProps>;
