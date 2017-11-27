import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectPhasesProps extends IBaseWebPartProps {
    gatesEnabled?: boolean;
}

export const ProjectPhasesDefaultProps: Partial<IProjectPhasesProps> = {
    gatesEnabled: true,
};
