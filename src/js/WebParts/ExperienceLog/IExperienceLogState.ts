import { IBaseWebPartState } from "../@BaseWebPart";
import LogElement from "./LogElement";

export default interface IExperienceLogState extends IBaseWebPartState {
    isLoading?: boolean;
    logItems?: LogElement[];
    searchTerm?: string;
}

export const ExperienceLogInitialState: Partial<IExperienceLogState> = {
    isLoading: true,
    searchTerm: "",
};
