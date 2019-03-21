import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
export declare class BenefitBase {
    path: string;
    webUrl: string;
    title: string;
    siteTitle: string;
    id: number;
    webId: string;
    constructor(result: IBenefitsSearchResult);
}
