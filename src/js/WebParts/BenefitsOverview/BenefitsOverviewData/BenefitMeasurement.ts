import { BenefitBase } from "./BenefitBase";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
import { BenefitMeasurementIndicator } from "./BenefitMeasurementIndicator";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { formatDate } from "../../../Util";

export class BenefitMeasurement extends BenefitBase {
    public date: Date;
    public dateDisplay: string;
    public value: number;
    public valueDisplay: string;
    public achievement: number;
    public achievementDisplay: string;
    public trendIconProps: IIconProps;
    public indicatorId: number;
    private indicator: BenefitMeasurementIndicator;

    /**
     * Creates a new instance of BenefitMeasurement
     *
     * @param {IBenefitsSearchResult} result Search result
     * @param {number} fractionDigits Fraction digits for valueDisplay
     */
    constructor(result: IBenefitsSearchResult, fractionDigits: number = 2) {
        super(result);
        this.date = new Date(result.GtMeasurementDateOWSDATE);
        this.dateDisplay = formatDate(result.GtMeasurementDateOWSDATE, "LL");
        this.value = !isNaN(parseFloat(result.GtMeasurementValueOWSNMBR)) ? parseFloat(result.GtMeasurementValueOWSNMBR) : null;
        if (this.value !== null) {
            this.valueDisplay = this.value.toFixed(fractionDigits);
        }
        this.indicatorId = parseInt(result.GtMeasureIndicatorLookupId || result.RefinableString59, 10);
    }

    /**
     * Calculate achievement
     *
     * @param {BenefitMeasurementIndicator} indicator Indicator
     * @param {number} fractionDigits Fraction digits used for achievementDisplay
     */
    public calculcateAchievement(indicator: BenefitMeasurementIndicator, fractionDigits: number = 2): BenefitMeasurement {
        this.indicator = indicator;
        let achievement = (((this.value - this.indicator.startValue) / (this.indicator.desiredValue - this.indicator.startValue)) * 100);
        this.achievement = achievement;
        this.achievementDisplay = `${achievement.toFixed(fractionDigits)}%`;
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
