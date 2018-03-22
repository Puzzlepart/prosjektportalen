import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectStatsProps extends IBaseWebPartProps {
    statsFieldsListName: string;
    chartsConfigListName: string;
    fieldsPrefix?: string;
    chartConfigurationBaseContentTypeId?: string;
    statsFieldsContentTypeId?: string;
}

export const ProjectStatsDefaultProps: Partial<IProjectStatsProps> = {
    fieldsPrefix: "GtChr",
    chartConfigurationBaseContentTypeId: "0x0100FAC6DE5CA35FAB46ABCF3CD575663D9D",
    statsFieldsContentTypeId: "0x0100A26931086AEA154693049BC467AA08F3",
};
