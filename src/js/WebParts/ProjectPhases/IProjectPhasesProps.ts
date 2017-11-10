import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectPhasesProps extends IBaseWebPartProps {
    forcedOrder?: boolean;
}

export const ProjectPhasesDefaultProps: Partial<IProjectPhasesProps> = {
    forcedOrder: true,
};
