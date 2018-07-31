import { IBaseWebPartState } from "../@BaseWebPart";
import ProjectResource from "./ProjectResource";

export default interface IProjectResourcesState extends IBaseWebPartState {
    items?: ProjectResource[];
}
