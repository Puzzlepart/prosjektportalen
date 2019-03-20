import { BenefitBase } from "./BenefitBase";
import { BenefitMeasurement } from "./BenefitMeasurement";
import { Benefit } from "./Benefit";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";

export class BenefitMeasurementIndicator extends BenefitBase {
    public indicator: string;
    public startValue: number;
    public desiredValue: number;
    public unit: string;
    public benefitId: number;
    public measurements: BenefitMeasurement[];
    public benefit: Benefit;

    /**
     *
     */
    constructor(result: IBenefitsSearchResult) {
        super(result);
        this.indicator = result.GtMeasureIndicatorOWSTEXT;
        this.startValue = parseInt(result.GtStartValueOWSNMBR, 10) || null;
        this.desiredValue = parseInt(result.GtDesiredValueOWSNMBR, 10) || null;
        this.unit = result.GtMeasurementUnitOWSCHCS;
        this.benefitId = parseInt(result.GtGainLookupId, 10);
    }

    public setMeasurements(measurements: BenefitMeasurement[]): BenefitMeasurementIndicator {
        let _measurements = measurements.filter(m => m.indicatorId === this.id && m.webId === this.webId);
        _measurements = _measurements.map((m, i) => m.calculcateAchievement(this));
        _measurements = _measurements.map((m, i) => m.setTrendIconProps(_measurements[i + 1]));
        this.measurements = _measurements;
        return this;
    }

    public setBenefit(benefits: Benefit[]): BenefitMeasurementIndicator {
        this.benefit = benefits.filter(b => b.id === this.benefitId && b.webId === this.webId)[0];
        return this;
    }
}
