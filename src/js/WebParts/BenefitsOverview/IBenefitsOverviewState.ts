import IGroupByOption from "./IGroupByOption";
import { IBenefitsOverviewData } from "./Data";

interface IBenefitsOverviewState {
    data?: IBenefitsOverviewData;
    isLoading: boolean;
    searchTerm: string;
    groupBy: IGroupByOption;
    showProjectInfo?: any;
}

export default IBenefitsOverviewState;
