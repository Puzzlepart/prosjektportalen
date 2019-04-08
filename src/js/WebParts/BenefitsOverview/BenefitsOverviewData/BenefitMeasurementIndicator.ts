import { BenefitBase } from "./BenefitBase";
import { BenefitMeasurement } from "./BenefitMeasurement";
import { Benefit } from "./Benefit";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";

export class BenefitMeasurementIndicator extends BenefitBase {
    public indicator: string;
    public startValue: number;
    public desiredValue: number;
    public startValueDisplay: string;
    public desiredValueDisplay: string;
    public unit: string;
    public measurements: BenefitMeasurement[];
    public benefit: Benefit;

    /**
     * Creates a new instance of BenefitMeasurementIndicator
     *
     * @param {IBenefitsSearchResult} result Search result
     * @param {number} fractionDigits Fraction digits for valueDisplay
     */
    constructor(result: IBenefitsSearchResult, fractionDigits: number = 2) {
        super(result);
        this.indicator = result.GtMeasureIndicatorOWSTEXT;
        this.startValue = !isNaN(parseFloat(result.GtStartValueOWSNMBR)) ? parseFloat(result.GtStartValueOWSNMBR) : null;
        if (this.startValue !== null) {
            this.startValueDisplay = this.startValue.toFixed(fractionDigits);
        }
        this.desiredValue = !isNaN(parseFloat(result.GtDesiredValueOWSNMBR)) ? parseFloat(result.GtDesiredValueOWSNMBR) : null;
        if (this.desiredValue !== null) {
            this.desiredValueDisplay = this.desiredValue.toFixed(fractionDigits);
        }
        this.unit = result.GtMeasurementUnitOWSCHCS;
    }

    /**
     * Set measurements
     *
     * @param {BenefitMeasurement[]} measurements Measurements
     */
    public setMeasurements(measurements: BenefitMeasurement[]): BenefitMeasurementIndicator {
        let _measurements = measurements.filter(m => m.indicatorId === this.id && m.webId === this.webId);
        _measurements = _measurements.map((m, i) => m.calculcateAchievement(this));
        _measurements = _measurements.map((m, i) => m.setTrendIconProps(_measurements[i + 1]));
        this.measurements = _measurements;
        return this;
    }

    /**
     * Set benefit
     *
     * @param {Benefit} benefit Benefit
     */
    public setBenefit(benefit: Benefit): BenefitMeasurementIndicator {
        this.benefit = benefit;
        return this;
    }
}
