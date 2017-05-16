export interface IToggleElementStorage {
    key: string;
    type: "localStorage" | "sessionStorage";
}

export interface IToggleElement {
    selector: string;
    animationDelay: number;
    animation: "fadeToggle" | "slideToggle";
    storage?: IToggleElementStorage;
    defaultCollapsed?: boolean;
}

interface IChromeTitleProps {
    title: string;
    toggleElement?: IToggleElement;
    hidden?: boolean;
    width?: string | number;
}

export default IChromeTitleProps;
