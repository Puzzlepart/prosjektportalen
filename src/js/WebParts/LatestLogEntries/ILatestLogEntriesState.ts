import { IAudienceTargetedComponentState } from "../@Components/AudienceTargetedComponent";
import { ILogEntry } from "../../Util/SpListLogger";

export default interface ILatestLogEntriesState extends IAudienceTargetedComponentState {
    isLoading?: boolean;
    entries?: ILogEntry[];
    forms?: Array<{ FormType: number, ServerRelativeUrl: string }>;
    elementToToggle?: HTMLDivElement;
}
