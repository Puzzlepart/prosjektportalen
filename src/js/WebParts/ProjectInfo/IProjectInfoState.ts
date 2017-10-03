import { IBaseWebPartState } from "../@BaseWebPart";
import { ProjectPropertyModel } from "./ProjectProperty";

export default interface IProjectInfoState extends IBaseWebPartState {
    properties?: ProjectPropertyModel[];
    elementToToggle?: HTMLDivElement;
}
