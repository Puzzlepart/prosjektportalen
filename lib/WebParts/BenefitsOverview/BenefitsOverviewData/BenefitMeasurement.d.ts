import { BenefitBase } from "./BenefitBase";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
import { BenefitMeasurementIndicator } from "./BenefitMeasurementIndicator";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
export declare class BenefitMeasurement extends BenefitBase {
    date: Date;
    dateStr: string;
    value: number;
    achievement: number;
    achievementStr: string;
    trendIconProps: IIconProps;
    indicatorId: number;
    private indicator;
    /**
     *
     */
    constructor(result: IBenefitsSearchResult);
    /**
     * Calculate achievement
     *
     * @param {BenefitMeasurementIndicator} indicator Indicator
     */
    calculcateAchievement(indicator: BenefitMeasurementIndicator): BenefitMeasurement;
    /**
     * Set trend icon props
     *
     * @param {BenefitMeasurement} prevMeasurement Previous measurement
     */
    setTrendIconProps(prevMeasurement: BenefitMeasurement): BenefitMeasurement;
}
