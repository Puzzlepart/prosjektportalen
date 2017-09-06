import { IBaseWebPartProps } from "../@BaseWebPart";
import IProjectStatusSectionConfig from "./IProjectStatusSectionConfig";

export default interface IProjectStatusProps extends IBaseWebPartProps {
    sectionConfig?: IProjectStatusSectionConfig;
}

export const ProjectStatusDefaultProps: Partial<IProjectStatusProps> = {
    sectionConfig: {
        listTitle: __("Lists_StatusSections_Title"),
        orderBy: "GtStSecOrder",
    },
};
