
import * as Util from "../Util";

export default class PhaseModel {
    public Id: string;
    public Name: string;
    public WssId?: number;
    public PhaseLevel?: string;
    public ShowOnFrontpage?: boolean;

    /**
     * Constructor
     *
     * @param {SP.Taxonomy.Term} term Term
     */
    constructor(term?: SP.Taxonomy.Term) {
        if (term) {
            this.Id = term.get_id().toString();
            this.Name = term.get_name();
            this.PhaseLevel = term.get_localCustomProperties().PhaseLevel;
            this.ShowOnFrontpage = term.get_localCustomProperties().ShowOnFrontpage !== "false";
        }
    }

    /**
    * Initialize safe
    *
    * @param {any} termValue Term value
    */
    public initSafe(termValue): PhaseModel {
        const safe = Util.getSafeTerm(termValue);
        this.Id = safe.get_termGuid();
        this.Name = safe.get_label();
        this.WssId = safe.get_wssId();
        return this;
    }

    /**
     * Get phase level class name
     *
     * @param {string} defaultClassName Default class name (if no phase level is specified)
     */
    public getPhasLevelClassName(defaultClassName = "unknown-phaselevel") {
        return this.PhaseLevel ? this.PhaseLevel.trim().toLowerCase() : defaultClassName;
    }

    /**
     * Get phase letter
     */
    public getPhaseLetter(): string {
        return this.Name[0];
    }
}
