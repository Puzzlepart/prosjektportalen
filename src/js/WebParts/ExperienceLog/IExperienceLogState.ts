import LogElement from "./LogElement";

interface IExperienceLogState {
    isLoading: boolean;
    logItems?: LogElement[];
    searchTerm?: string;
}
export { LogElement };
export default IExperienceLogState;
