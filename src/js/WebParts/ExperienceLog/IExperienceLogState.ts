import { IBaseWebPartState } from "../@BaseWebPart";
import LogElement from "./LogElement";

export default interface IExperienceLogState extends IBaseWebPartState {
    logItems?: LogElement[];
    searchTerm?: string;
}
