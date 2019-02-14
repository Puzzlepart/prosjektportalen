import { IBaseWebPartState } from "../@BaseWebPart";
import { ProjectPropertyModel } from "./ProjectProperty";

export default interface IProjectInfoState extends IBaseWebPartState {
    hasPropertiesItem?: boolean;
    propertiesList?: { Id: string };
    properties?: ProjectPropertyModel[];
    elementToToggle?: HTMLDivElement;
}
