import LogElement from "./LogElement";

interface IExperienceLogState {
    isLoading?: boolean;
    logItems?: LogElement[];
    searchTerm?: string;
}

export const ExperienceLogInitialState: Partial<IExperienceLogState> = {
    isLoading: true,
    searchTerm: "",
};

export default IExperienceLogState;
