/// <reference types="react" />
import NewProjectFormRenderMode from "./NewProjectFormRenderMode";
interface INewProjectFormProps {
    className?: string;
    style?: React.CSSProperties;
    settingsClassName?: string;
    titleMinLength?: number;
    titleMaxLength?: number;
    maxUrlLength?: number;
    doesWebExistDelayMs?: number;
    renderMode?: NewProjectFormRenderMode;
    onDialogDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
    headerText?: string;
    subHeaderText?: string;
    creationModalTitle?: string;
    inputContainerStyle?: React.CSSProperties;
    showSettings?: boolean;
}
export declare const NewProjectFormDefaultProps: Partial<INewProjectFormProps>;
export default INewProjectFormProps;
