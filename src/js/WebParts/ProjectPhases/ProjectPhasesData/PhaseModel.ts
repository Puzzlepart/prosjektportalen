import RESOURCE_MANAGER from "../../../@localization";
import IChecklistItem from "./IChecklistItem";
import * as Util from "../../../Util";

export default class PhaseModel {
    public Index: number;
    public Id: string;
    public Name: string;
    public WssId?: number;
    public PhaseLevel?: string;
    public ShowOnFrontpage?: boolean;
    public ShowPhaseText?: boolean;
    public IsIncremental?: boolean;
    public Type: string;
    public SubText: string;
    public PhaseLetter: string;
    public Checklist: { stats: { [key: string]: number }, items: IChecklistItem[], defaultViewUrl: string };

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
            this.Type = properties.PhaseType || "Default";
            this.PhaseLevel = properties.PhaseLevel || "Default";
            this.ShowOnFrontpage = properties.ShowOnFrontpage !== "false";
            this.ShowPhaseText = properties.ShowPhaseText !== "false";
            this.IsIncremental = properties.IsIncremental === "true" && this.Type === "Gate";
            this.SubText = properties.PhaseSubText;
            this.PhaseLetter = properties.PhaseLetter || this.Name[0];
            this.initChecklist();
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

    /**
     * Initialize checklist property
     */
    private initChecklist() {
        let stats = {};
        stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Closed")] = 0;
        stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_NotRelevant")] = 0;
        stats[RESOURCE_MANAGER.getResource("ProjectPhases_Stats_Open")] = 0;
        this.Checklist = {
            stats,
            items: [],
            defaultViewUrl: "",
        };
    }
}
