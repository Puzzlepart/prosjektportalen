"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenefitBase_1 = require("./BenefitBase");
class BenefitMeasurement extends BenefitBase_1.BenefitBase {
    /**
     *
     */
    constructor(result) {
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
     */
    calculcateAchievement(indicator) {
        this.indicator = indicator;
        let achievement = Math.round(((this.value - this.indicator.startValue) / (this.indicator.desiredValue - this.indicator.startValue)) * 100);
        this.achievement = achievement;
        this.achievementStr = `${achievement}%`;
        return this;
    }
    /**
     * Set trend icon props
     *
     * @param {BenefitMeasurement} prevMeasurement Previous measurement
     */
    setTrendIconProps(prevMeasurement) {
        let shouldIncrease = this.indicator.desiredValue > this.indicator.startValue;
        if (this.achievement >= 100) {
            this.trendIconProps = { iconName: "Trophy", style: { color: "gold" } };
        }
        if (prevMeasurement && prevMeasurement.achievement !== this.achievement) {
            let hasIncreased = this.achievement > prevMeasurement.achievement;
            if (shouldIncrease && hasIncreased || !shouldIncrease && !hasIncreased) {
                this.trendIconProps = { iconName: "StockUp", style: { color: "green" } };
            }
            else {
                this.trendIconProps = { iconName: "StockDown", style: { color: "red" } };
            }
        }
        return this;
    }
}
exports.BenefitMeasurement = BenefitMeasurement;
