import IToggleElement from "./IToggleElement";

export default interface IChromeTitleProps {
    title: string;
    toggleElement?: IToggleElement;
    hidden?: boolean;
    width?: string | number;
}
