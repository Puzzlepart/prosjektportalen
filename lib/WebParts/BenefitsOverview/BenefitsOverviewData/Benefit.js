"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenefitBase_1 = require("./BenefitBase");
class Benefit extends BenefitBase_1.BenefitBase {
    /**
     *
     */
    constructor(result) {
        super(result);
        this.type = result.GtGainsTypeOWSCHCS;
        this.turnover = result.GtGainsTurnoverOWSMTXT;
        this.responsible = result.GtGainsResponsible;
        this.realizationTime = new Date(result.GtRealizationTimeOWSDATE);
    }
}
exports.Benefit = Benefit;
