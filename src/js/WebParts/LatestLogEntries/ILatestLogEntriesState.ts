import { IBaseWebPartState } from "../@BaseWebPart";
import { ILogEntry } from "../../Util/SpListLogger";

export default interface ILatestLogEntriesState extends IBaseWebPartState {
    shouldRender?: boolean;
    entries?: ILogEntry[];
    forms?: Array<{ FormType: number, ServerRelativeUrl: string }>;
}
