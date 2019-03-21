import { IBaseWebPartProps } from "../@BaseWebPart";
export default interface IProjectStatsProps extends IBaseWebPartProps {
    viewSelectorEnabled: boolean;
    statsFieldsListName: string;
    chartsConfigListName: string;
    showChartSettings?: boolean;
}
export declare const ProjectStatsDefaultProps: Partial<IProjectStatsProps>;
