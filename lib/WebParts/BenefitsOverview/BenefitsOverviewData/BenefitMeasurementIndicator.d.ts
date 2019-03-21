import { BenefitBase } from "./BenefitBase";
import { BenefitMeasurement } from "./BenefitMeasurement";
import { Benefit } from "./Benefit";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
export declare class BenefitMeasurementIndicator extends BenefitBase {
    indicator: string;
    startValue: number;
    desiredValue: number;
    unit: string;
    benefitId: number;
    measurements: BenefitMeasurement[];
    benefit: Benefit;
    /**
     *
     */
    constructor(result: IBenefitsSearchResult);
    setMeasurements(measurements: BenefitMeasurement[]): BenefitMeasurementIndicator;
    setBenefit(benefits: Benefit[]): BenefitMeasurementIndicator;
}
