"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../Resources");
const Util = require("../../../Util");
class PhaseModel {
    /**
     * Constructor
     */
    constructor() {
        /** Empty constructor */
    }
    /**
     * Init from SP.Taxonomy.Term
     *
     * @param {SP.Taxonomy.Term} term Taxonomy term
     * @param {boolean} gatesEnabled Gates enabled
     */
    initFromSpTaxonomyTerm(term, gatesEnabled) {
        const properties = term.get_localCustomProperties();
        this.Id = term.get_id().toString();
        this.Name = term.get_name();
        this.Type = properties.PhaseType || "Default";
        this.PhaseLevel = properties.PhaseLevel || "Default";
        this.ShowOnFrontpage = properties.ShowOnFrontpage !== "false";
        this.ShowPhaseText = properties.ShowPhaseText !== "false";
        this.IsIncremental = properties.IsIncremental === "true" && gatesEnabled;
        this.SubText = properties.PhaseSubText;
        this.PhaseLetter = properties.PhaseLetter || this.Name[0];
        this.initChecklist();
        return this;
    }
    /**
    * Initialize safe using utility function getSafeTerm
    *
    * @param {any} termValue Term value
    */
    initSafe(termValue) {
        const safe = Util.getSafeTerm(termValue);
        this.Id = safe.get_termGuid();
        this.Name = safe.get_label();
        this.WssId = safe.get_wssId();
        return this;
    }
    /**
     * Initialize checklist property
     */
    initChecklist() {
        let stats = {};
        stats[Resources_1.default.getResource("ProjectPhases_Stats_Closed")] = 0;
        stats[Resources_1.default.getResource("ProjectPhases_Stats_NotRelevant")] = 0;
        stats[Resources_1.default.getResource("ProjectPhases_Stats_Open")] = 0;
        this.Checklist = {
            stats,
            items: [],
            defaultViewUrl: "",
        };
    }
}
exports.default = PhaseModel;
