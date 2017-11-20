import { IBaseWebPartState } from "../@BaseWebPart";

export default interface ILatestProjectsState extends IBaseWebPartState {
    subwebs?: any[];
    elementToToggle?: HTMLDivElement;
}
