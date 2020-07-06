import __ from '../../../Resources'
import IChecklistItem from './IChecklistItem'
import * as Util from '../../../Util'

export default class PhaseModel {
    public Index: number;
    public Id: string;
    public TaxonomyHiddenListId: number;
    public Name: string;
    public WssId?: number;
    public PhaseLevel?: string;
    public ShowOnFrontpage?: boolean;
    public ShowPhaseText?: boolean;
    public IsIncremental?: boolean;
    public Type: string;
    public SubText: string;
    public PhaseLetter: string;
    public Checklist: { stats: { [key: string]: number }; items: IChecklistItem[]; defaultViewUrl: string };

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
    public initFromSpTaxonomyTerm(term: SP.Taxonomy.Term, gatesEnabled: boolean): PhaseModel {
        const properties = term.get_localCustomProperties()
        this.Id = term.get_id().toString()
        this.Name = term.get_name()
        this.Type = properties.PhaseType || 'Default'
        this.PhaseLevel = properties.PhaseLevel || 'Default'
        this.ShowOnFrontpage = properties.ShowOnFrontpage !== 'false'
        this.ShowPhaseText = properties.ShowPhaseText !== 'false'
        this.IsIncremental = properties.IsIncremental === 'true' && gatesEnabled
        this.SubText = properties.PhaseSubText
        this.PhaseLetter = properties.PhaseLetter || this.Name[0]
        this.initChecklist()
        return this
    }

    /**
    * Initialize safe using utility function getSafeTerm
    *
    * @param {any} termValue Term value
    */
    public initSafe(termValue): PhaseModel {
        const safe = Util.getSafeTerm(termValue)
        this.Id = safe.get_termGuid()
        this.Name = safe.get_label()
        this.WssId = safe.get_wssId()
        return this
    }

    /**
     * Initialize checklist property
     */
    private initChecklist() {
        const stats = {}
        stats[__.getResource('ProjectPhases_Stats_Closed')] = 0
        stats[__.getResource('ProjectPhases_Stats_NotRelevant')] = 0
        stats[__.getResource('ProjectPhases_Stats_Open')] = 0
        this.Checklist = {
            stats,
            items: [],
            defaultViewUrl: '',
        }
    }
}
