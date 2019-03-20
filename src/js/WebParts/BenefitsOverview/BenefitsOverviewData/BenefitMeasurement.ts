import { BenefitBase } from "./BenefitBase";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
import { BenefitMeasurementIndicator } from "./BenefitMeasurementIndicator";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";

export class BenefitMeasurement extends BenefitBase {
    public date: Date;
    public dateStr: string;
    public value: number;
    public achievement: number;
    public achievementStr: string;
    public trendIconProps: IIconProps;
    public indicatorId: number;
    private indicator: BenefitMeasurementIndicator;

    /**
     *
     */
    constructor(result: IBenefitsSearchResult) {
        super(result);
        this.date = new Date(result.GtMeasurementDateOWSDATE);
        this.dateStr = this.date.toLocaleDateString();
        this.value = parseInt(result.GtMeasurementValueOWSNMBR, 10) || null;
        this.indicatorId = parseInt(result.GtMeasureIndicatorLookupId, 10);
    }

    /**
     * Calculate achievement
     *
     * @param {BenefitMeasurementIndicator} indicator Indicator
     * @param {number} fractionDigits Fraction digits
     */
    public calculcateAchievement(indicator: BenefitMeasurementIndicator, fractionDigits: number = 2): BenefitMeasurement {
        this.indicator = indicator;
        let achievement = (((this.value - this.indicator.startValue) / (this.indicator.desiredValue - this.indicator.startValue)) * 100);
        this.achievement = achievement;
        this.achievementStr = `${achievement.toFixed(fractionDigits)}%`;
        return this;
    }

    /**
     * Set trend icon props
     *
     * @param {BenefitMeasurement} prevMeasurement Previous measurement
     */
    public setTrendIconProps(prevMeasurement: BenefitMeasurement): BenefitMeasurement {
        let shouldIncrease = this.indicator.desiredValue > this.indicator.startValue;
        if (this.achievement >= 100) {
            this.trendIconProps = { iconName: "Trophy", style: { color: "gold" } };
            return this;
        }
        if (prevMeasurement && prevMeasurement.value !== this.value) {
            let hasIncreased = this.value > prevMeasurement.value;
            if (shouldIncrease && hasIncreased || !shouldIncrease && !hasIncreased) {
                this.trendIconProps = { iconName: "StockUp", style: { color: "green" } };
            } else {
                this.trendIconProps = { iconName: "StockDown", style: { color: "red" } };
            }
        }
        return this;
    }
}
