"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenefitBase_1 = require("./BenefitBase");
class BenefitMeasurementIndicator extends BenefitBase_1.BenefitBase {
    /**
     *
     */
    constructor(result) {
        super(result);
        this.indicator = result.GtMeasureIndicatorOWSTEXT;
        this.startValue = parseInt(result.GtStartValueOWSNMBR, 10);
        this.desiredValue = parseInt(result.GtDesiredValueOWSNMBR, 10);
        this.unit = result.GtMeasurementUnitOWSCHCS;
        this.benefitId = parseInt(result.GtGainLookupId, 10);
    }
    setMeasurements(measurements) {
        let _measurements = measurements.filter(m => m.indicatorId === this.id && m.webId === this.webId);
        _measurements = _measurements.map((m, i) => m.calculcateAchievement(this));
        _measurements = _measurements.map((m, i) => m.setTrendIconProps(_measurements[i + 1]));
        this.measurements = _measurements;
        return this;
    }
    setBenefit(benefits) {
        this.benefit = benefits.filter(b => b.id === this.benefitId && b.webId === this.webId)[0];
        return this;
    }
}
exports.BenefitMeasurementIndicator = BenefitMeasurementIndicator;
