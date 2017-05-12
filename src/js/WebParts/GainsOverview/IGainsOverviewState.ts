import IGroupByOption from "./IGroupByOption";
import { IGainsOverviewData } from "./Data";

interface IGainsOverviewState {
    data?: IGainsOverviewData;
    isLoading: boolean;
    searchTerm: string;
    groupBy: IGroupByOption;
}

export default IGainsOverviewState;
