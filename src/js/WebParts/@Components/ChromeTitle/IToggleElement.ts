import IToggleElementStorage from "./IToggleElementStorage";

export default interface IToggleElement {
    selector: string;
    animationDelay: number;
    animation: "fadeToggle" | "slideToggle";
    storage?: IToggleElementStorage;
    defaultCollapsed?: boolean;
}
