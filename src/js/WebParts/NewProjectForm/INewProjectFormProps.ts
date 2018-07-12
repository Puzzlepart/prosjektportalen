import __ from "../../Resources";
import NewProjectFormRenderMode from "./NewProjectFormRenderMode";

export default interface INewProjectFormProps {
    className?: string;
    style?: React.CSSProperties;
    settingsClassName?: string;
    titleMinLength?: number;
    titleMaxLength?: number;
    maxUrlLength?: number;
    renderMode?: NewProjectFormRenderMode;
    onDialogDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
    headerText?: string;
    subHeaderText?: string;
    creationModalTitle?: string;
    inputContainerStyle?: React.CSSProperties;
    showSettings?: boolean;
}

export const NewProjectFormDefaultProps: Partial<INewProjectFormProps> = {
    titleMinLength: 4,
    className: "pp-newProjectForm",
    settingsClassName: "advanced-settings",
    maxUrlLength: 18,
    renderMode: NewProjectFormRenderMode.Default,
    onDialogDismiss: () => {
        //
    },
    headerText: __.getResource("NewProjectForm_Title"),
    subHeaderText: __.getResource("NewProjectForm_SubText"),
    creationModalTitle: __.getResource("CreationModal_Title"),
    inputContainerStyle: { marginBottom: 5 },
    showSettings: true,
};
