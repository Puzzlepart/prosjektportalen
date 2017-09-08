import IToggleElement from "./IToggleElement";

export default interface IChromeTitleProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    toggleElement?: IToggleElement;
    width?: string | number;
}
