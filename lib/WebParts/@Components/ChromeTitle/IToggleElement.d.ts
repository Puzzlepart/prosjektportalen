import IToggleElementStorage from "./IToggleElementStorage";
export default interface IToggleElement {
    element: HTMLElement;
    storage?: IToggleElementStorage;
    defaultCollapsed?: boolean;
}
