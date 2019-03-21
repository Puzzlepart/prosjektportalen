import { IBaseWebPartProps } from "../@BaseWebPart";
import IProjectStatusSectionConfig from "./IProjectStatusSectionConfig";
import IRiskMatrixProps from "../RiskMatrix/IRiskMatrixProps";
export default interface IProjectStatusProps extends IBaseWebPartProps {
    sectionConfig?: IProjectStatusSectionConfig;
    riskMatrix?: IRiskMatrixProps;
    propertiesLabel?: string;
}
export declare const ProjectStatusDefaultProps: Partial<IProjectStatusProps>;
