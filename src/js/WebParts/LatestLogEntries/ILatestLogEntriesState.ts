import { ISecuredWebPartState } from "../@SecuredWebPart";
import { ILogEntry } from "../../Util/SpListLogger";

export default interface ILatestLogEntriesState extends ISecuredWebPartState {
    entries?: ILogEntry[];
    forms?: Array<{ FormType: number, ServerRelativeUrl: string }>;
    elementToToggle?: HTMLDivElement;
}
