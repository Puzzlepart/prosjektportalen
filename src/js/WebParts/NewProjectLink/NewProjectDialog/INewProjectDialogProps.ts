import { IDialogProps } from "office-ui-fabric-react/lib/Dialog";

export default interface INewProjectDialogProps {
    dialogProps?: IDialogProps;
    advancedSectionClassName?: string;
    titleMinLength?: number;
    titleMaxLength?: number;
    maxUrlLength?: number;
}

export const NewProjectDialogDefaultProps: Partial<INewProjectDialogProps> = {
    titleMinLength: 4,
    advancedSectionClassName: "advanced",
    maxUrlLength: 18,
};
