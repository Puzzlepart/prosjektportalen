
import * as Util from "../Util";

export default class PhaseModel {
    public Index: number;
    public Id: string;
    public Name: string;
    public WssId?: number;
    public PhaseLevel?: string;
    public ShowOnFrontpage?: boolean;
    public IsIncremental?: boolean;
    public Type: string;
    public SubText: string;
    public PhaseLetter: string;

    /**
     * Constructor
     *
     * @param {number} index Index
     * @param {SP.Taxonomy.Term} term Taxonomy term
     */
    constructor(index?: number, term?: SP.Taxonomy.Term) {
        this.Index = index;
        if (term) {
            const properties = term.get_localCustomProperties();
            this.Id = term.get_id().toString();
            this.Name = term.get_name();
            this.PhaseLevel = properties.PhaseLevel || "Default";
            this.ShowOnFrontpage = properties.ShowOnFrontpage !== "false";
            this.IsIncremental = properties.IsIncremental === "true";
            this.Type = properties.PhaseType || "Default";
            this.SubText = properties.PhaseSubText;
            this.PhaseLetter = properties.PhaseLetter || this.Name[0];
        }
    }

    /**
    * Initialize safe using utility function getSafeTerm
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
}
