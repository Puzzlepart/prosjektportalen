import { IBaseWebPartState } from "../@BaseWebPart";

export default interface INewProjectLinkState extends IBaseWebPartState {
    showDialog?: boolean;
    percentComplete?: number;
    shouldRender?: boolean;
}
