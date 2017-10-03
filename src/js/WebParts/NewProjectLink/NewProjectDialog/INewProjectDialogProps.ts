import ListConfig from "../../../Provision/Data/Config/ListConfig";
import { IDialogProps } from "office-ui-fabric-react/lib/Dialog";

export default interface INewProjectDialogProps {
    dialogProps?: IDialogProps;
    className?: string;
    advancedSettingsClassName?: string;
    titleMinLength?: number;
    titleMaxLength?: number;
    maxUrlLength?: number;
    listDataConfig: { [key: string]: ListConfig };
}

export const NewProjectDialogDefaultProps: Partial<INewProjectDialogProps> = {
    titleMinLength: 4,
    className: "pp-newProjectDialog",
    advancedSettingsClassName: "advanced-settings",
    maxUrlLength: 18,
};
