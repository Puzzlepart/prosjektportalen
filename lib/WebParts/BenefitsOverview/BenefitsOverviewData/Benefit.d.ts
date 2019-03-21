import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
import { BenefitBase } from "./BenefitBase";
export declare class Benefit extends BenefitBase {
    type: string;
    turnover: string;
    responsible: string;
    realizationTime: Date;
    /**
     *
     */
    constructor(result: IBenefitsSearchResult);
}
