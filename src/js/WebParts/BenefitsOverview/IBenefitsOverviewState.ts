import { IBaseWebPartState } from "../@BaseWebPart";
import IGroupByOption from "./IGroupByOption";
import {
    IBenefitsOverviewData,
    BenefitEntry,
} from "./Data";

export default interface IBenefitsOverviewState extends IBaseWebPartState {
    data?: IBenefitsOverviewData;
    searchTerm: string;
    groupBy: IGroupByOption;
    showProjectInfo?: BenefitEntry;
    showMeasurements?: BenefitEntry;
}

