import ISecuredWebPartProps from "./ISecuredWebPartProps";
import ISecuredWebPartState from "./ISecuredWebPartState";
import BaseWebPart from "../@BaseWebPart";
export default class SecuredWebPart<P extends ISecuredWebPartProps, S extends ISecuredWebPartState> extends BaseWebPart<P, S> {
    /**
    * Constructor
    *
    * @param {P} props Props
    * @param {S} initialState State
    */
    constructor(props: P, initialState: S);
    /**
     * On init
     */
    onInit(): Promise<void>;
}
export { ISecuredWebPartProps, ISecuredWebPartState, };
