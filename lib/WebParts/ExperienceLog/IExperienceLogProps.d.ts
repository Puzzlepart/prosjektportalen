import { IBaseWebPartProps } from "../@BaseWebPart";
import { IListProps } from "../@Components/List";
export default interface IExperienceLogProps extends IBaseWebPartProps, IListProps {
    queryTemplate?: string;
    dataSource?: string;
}
export declare const ExperienceLogDefaultProps: Partial<IExperienceLogProps>;
