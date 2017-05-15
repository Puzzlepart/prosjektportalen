import { IDialogProps } from "office-ui-fabric-react";

interface INewProjectDialogProps {
    dialogProps?: IDialogProps;
    advancedSectionClassName?: string;
    titleMinLength?: number;
    titleMaxLength?: number;
}

export default INewProjectDialogProps;
