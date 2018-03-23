import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectStatsProps extends IBaseWebPartProps {
    statsFieldsListName: string;
    chartsConfigListName: string;
}

export const ProjectStatsDefaultProps: Partial<IProjectStatsProps> = {};
