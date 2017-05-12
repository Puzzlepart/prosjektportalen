interface IToggleElementStorage {
    key: string;
    type: "localStorage" | "sessionStorage";
}

interface IToggleElement {
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
}

export interface IChromeTitleState {
    isCollapsed: boolean;
}

export default IChromeTitleProps;
