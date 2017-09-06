import { IBaseWebPartState } from "../@BaseWebPart";
import IGroupByOption from "./IGroupByOption";
import { IBenefitsOverviewData } from "./Data";

export default interface IBenefitsOverviewState extends IBaseWebPartState {
    data?: IBenefitsOverviewData;
    isLoading: boolean;
    searchTerm: string;
    groupBy: IGroupByOption;
    showProjectInfo?: any;
}

