import __ from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";
import IProjectStatusSectionConfig from "./IProjectStatusSectionConfig";
import IRiskMatrixProps from "../RiskMatrix/IRiskMatrixProps";

export default interface IProjectStatusProps extends IBaseWebPartProps {
    sectionConfig?: IProjectStatusSectionConfig;
    riskMatrix?: IRiskMatrixProps;
    propertiesLabel?: string;
    showActionLinks: boolean;
}

export const ProjectStatusDefaultProps: Partial<IProjectStatusProps> = {
    sectionConfig: {
        listTitle: __.getResource("Lists_StatusSections_Title"),
        orderBy: "GtStSecOrder",
    },
    showActionLinks: true,
};
