import { IBaseWebPartState } from "../@BaseWebPart";
export default interface ISecuredWebPartState extends IBaseWebPartState {
    shouldRender?: boolean;
}
